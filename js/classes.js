class Sprite {
    constructor({ position, imageScr, width, height, scale = 1, framesMax = 1 }) {
        this.position = position
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = imageScr
        this.scale = scale
        this.height = 150
        this.width = 50
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.framesMax * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
        this.framesElapsed++

            if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMax - 1) {
                    this.framesCurrent++
                } else {
                    this.framesCurrent = 0
                }
            }
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        color = 'red',
        offSet

    }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.color = color
        this.lastKey
        this.width
        this.health = 100
        this.isAttacking
        this.isJumping = false
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offSet: offSet,
            width: 100,
            height: 50,
        }
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isAttacking) {
            //attack box
            ctx.fillStyle = 'green'
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
    }

    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offSet.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height >= canvas.height - 96) {
            this.velocity.y = 0
        } else {
            this.velocity.y += grav
        }

        if (this.position.x + this.width >= canvas.width) {
            this.position.x = canvas.width - this.width
        } else if (this.position.x <= 0) {
            this.position.x = 0
        }

        if (this.position.y + this.height >= canvas.height) {
            this.position.y = canvas.height - this.height
        } else if (this.position.y <= 0) {
            this.position.y = 0


        }


    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}