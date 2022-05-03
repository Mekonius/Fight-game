class Sprite {
    constructor({ position }) {
        this.position = position
        this.width = 50
        this.height = 150
    }

    draw() {}

    update() {
        this.draw()
    }
}

class Fighter {
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

        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += grav
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}