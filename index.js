const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 578

ctx.fillRect(0, 0, canvas.width, canvas.height);


const grav = 0.2
class Sprite {
    constructor({position, velocity, color}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, 50, this.height);
}

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    
        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0
        } else{
            this.velocity.y += grav
        }
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
    position : {
    x: 500,
    y: 100
},
    velocity: {
    x: 0,
    y: 0,

    },
    color: 'red'
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}


let lastKey

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    } 
    if(keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
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
    }

})


