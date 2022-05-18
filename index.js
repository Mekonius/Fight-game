const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 578;

ctx.fillRect(0, 0, canvas.width, canvas.height);

let gameover =
  "<H1>Game Over</H1>" + '<button onclick="location.reload()">Restart</button>';

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageScr: "./assets/background/background.png",
});

const shop = new Sprite({
  position: {
    x: 650,
    y: 175,
  },
  imageScr: "./assets/decorations/shop_anim.png",
  scale: 2.4,
  framesMax: 6,
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offSet: {
    x: 0,
    y: 0,
  },
  color: "blue",
  imageScr: "./assets/character/mac/Idle.png",
  scale: 2.5,
  framesMax: 6,
  offSet: {
    x: 215,
    y: 175,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/character/mac/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/character/mac/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./assets/character/mac/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./assets/character/mac/Fall.png",
      framesMax: 2,
    },
    attack: {
      imageSrc: "./assets/character/mac/attack1.png",
      framesMax: 6,
    },
    takeHit: {
        imageSrc: "./assets/character/mac/Take hit - white silhouette.png",
        framesMax: 4,
      },
  },
  attackBox: {
    offset: {
      x: 150,
      y: 25,
    },
    width: 100,
    height: 50,
  },
});

const enemy = new Fighter({
  position: {
    x: 635,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offSet: {
    x: 215,
    y: 175,
  },
  color: "blue",
  imageScr: "./assets/character/kenji/Idle.png",
  scale: 2.4,
  framesMax: 4,
  sprites: {
    idle: {
      imageSrc: "./assets/character/kenji/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./assets/character/kenji/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./assets/character/kenji/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./assets/character/kenji/Fall.png",
      framesMax: 2,
    },
    attack: {
      imageSrc: "./assets/character/kenji/attack2.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./assets/character/kenji/Take hit.png",
      framesMax: 3,
    },
  },
  attackBox: {
    offset: {
      x: -175,
      y: 25,
    },
    width: 100,
    height: 50,
  },
});

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
  space: {
    pressed: false,
  },

  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

animate();

const cd = new Set();

const cdTimer = 1000;

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -20;
      player.lastKey = "w";
      break;
    case " ":
      keys.space.pressed = true;
      player.attack();
      break;

    //Enemy keys

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case " ":
      player.isAttacking = false;
      break;

    //Enemy keys
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowDown":
      enemy.isAttacking = false;
  }
});
