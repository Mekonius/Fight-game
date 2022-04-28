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
    }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.color = color
        this.lastKey
        this.isAttacking
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        }
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        ctx.fillStyle = 'green'
        ctx.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height)
    }

    update() {
        this.draw()
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
        }, 500);
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


    // detect for collision
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.attackBox.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.attackBox.height &&
        player.isAttacking) {
        console.log('collision');
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
    }
})

function attack() {

}

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

            //Enemy keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

    }

})