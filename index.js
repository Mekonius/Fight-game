const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 578

ctx.fillRect(0, 0, canvas.width, canvas.height);


const grav = 0.7
class Sprite {
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

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0,

    },
    offSet: {
        x: 0,
        y: 0,
    },
    color: 'blue'
})

const enemy = new Sprite({
    position: {
        x: 500,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0,

    },
    offSet: {
        x: -50,
        y: 0
    },
    color: 'red'
})


const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }


}

// Collision detection
function rectangularCollision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}




function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    }
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    //enemy movement

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    // Detect for collision
    if (
        rectangularCollision({
            rect1: player,
            rect2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        console.log('player hit');
    }

    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isAttacking
    ) {
        player.isAttacking = false
        console.log('Enemy hit');
    }
}

animate()


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -20
            break
        case ' ':
            player.attack()
            break

            //Enemy keys

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowUp':
            enemy.velocity.y = -20
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case ' ':
            player.isAttacking = false

            //Enemy keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowDown':
            enemy.isAttacking = false
    }

})