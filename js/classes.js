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
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
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
      offSet: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.framesElapsed = 0;
    this.framesCurrent = 0;
    this.framesHold = 5;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

    console.log(this.sprites);
  }

  update() {
    this.draw();
    this.animateFrames();

    this.attackBox.position.x = this.position.x + this.attackBox.offSet.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offSet.y;

    // ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 348.5999999999999;
    } else {
      this.velocity.y += gravity;
    }

    // jump sealing

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
    this.switchSprites("attack");
    this.isAttacking = true;
  }

  takeHit() {
    this.switchSprites("takeHit");
    this.health -= 10;
  }

  switchSprites(sprite) {
    //overriding all other animations with the attack animation
	if (
		this.image === this.sprites.attack.image &&
		this.framesCurrent < this.sprites.attack.framesMax - 1
	  )
		return
  
	  // override when fighter gets hit
	  if (
		this.image === this.sprites.takeHit.image &&
		this.framesCurrent < this.sprites.takeHit.framesMax - 1
	  )
		return
	

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.freamsCurrent;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
          break;
        }
        break;
      case "falling":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
        }
        break;
      case "attack":
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
