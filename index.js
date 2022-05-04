const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 578

ctx.fillRect(0, 0, canvas.width, canvas.height);


let gameover = '<H1>Game Over</H1>' + '<button onclick="location.reload()">Restart</button>'

const grav = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageScr: './assets/background/background.png',
})

const shop = new Sprite({
    position: {
        x: 650,
        y: 175,
    },
    imageScr: './assets/decorations/shop_anim.png',
    scale: 2.4,
    framesMax: 6,

})

const player = new Fighter({
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

const enemy = new Fighter({
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

animate()


const cd = new Set()

const cdTimer = 1000


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
            break

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