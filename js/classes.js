class Sprite {
  constructor({
    position,
    width,
    height,
    imageScr,
    scale = 1,
    framesMax = 1,
    offSet = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageScr;
    this.scale = scale;
    this.height = 150;
    this.width = 50;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.offSet = offSet;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offSet.x,
      this.position.y - this.offSet.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    imageScr,
    scale = 1,
    framesMax = 1,
    offSet = { x: 0, y: 0 },
    sprites
  }) {
    super({
      position,
      imageScr,
      scale,
      framesMax,
      offSet,
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.color = color;
    this.lastKey;
    this.health = 100;
    this.isAttacking;
    this.isJumping = false;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offSet: offSet,
      width: 100,
      height: 50,
    };
    this.framesElapsed = 0;
    this.framesCurrent = 0;
    this.framesHold = 15;
    this.sprites = sprites

    for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].imageSrc
      }

      console.log(this.sprites)

  }

  update() {
    this.draw();
    this.animateFrames();
    
    this.image.height = 75;
    this.attackBox.position.x = this.position.x + this.attackBox.offSet.x;
    this.attackBox.position.y = this.position.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += grav;
    }

    if (this.position.x + this.width >= canvas.width) {
      this.position.x = canvas.width - this.width;
    } else if (this.position.x <= 0) {
      this.position.x = 0;
    }

    if (this.position.y + this.height >= canvas.height) {
      this.position.y = canvas.height - this.height;
    } else if (this.position.y <= 0) {
      this.position.y = 0;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprites(sprite) {
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
        }        
        break;
      case "walk":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.freamsCurrent
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          break
        }
      case "attack":
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
        }
        break
      case "falling":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
        }
        break
    
    }
  }
}
