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
    background.update()
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