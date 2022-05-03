const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 578

ctx.fillRect(0, 0, canvas.width, canvas.height);


let gameover = '<H1>Game Over</H1>' + '<button onclick="location.reload()">Restart</button>'

const grav = 0.7

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

// Collision detection
function rectangularCollision({ rect1, rect2 }) {
    return (
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height
    )
}

// end game based on health or timer
function determineWinner({ player, enemy }) {
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = '<h1>Tie</h1>'
    } else if (player.health >= enemy.health || enemy.health === 0) {
        document.querySelector('#displayText').innerHTML = '<h1>player 1 Wins</h1>'
    } else if (player.health <= enemy.health || player.health === 0) {
        document.querySelector('#displayText').innerHTML = '<h1>player 2 Wins</h1>'
    }

}


let timer = 10

function decreaseTimer() {
    if (timer > 0) {
        setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer === 0 || player.health <= 0 || enemy.health <= 0) {
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({ player, enemy })
    }


}

decreaseTimer()

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
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        console.log('player hit');
    }

    if (
        rectangularCollision({
            rect1: enemy,
            rect2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log('Enemy hit');
    }

    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy })
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