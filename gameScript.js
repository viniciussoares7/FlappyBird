console.log('Flappy Bird - Vinicius')

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const flappyBird = {
  sx: 0,
  sy: 0,
  sWidth: 34,
  sHeight: 24,
  dx: 10,
  dy: 50,
  dWidth: 34,
  dHeight: 24,
  falldownSpeed: 0,
  gravity: 0.25,

  refresh() {
    flappyBird.falldownSpeed = flappyBird.falldownSpeed + flappyBird.gravity
    flappyBird.dy = flappyBird.dy + flappyBird.falldownSpeed
    console.log(flappyBird.falldownSpeed)
  },

  print() {
    contexto.drawImage(
      sprites,
      flappyBird.sx,
      flappyBird.sy,
      flappyBird.sWidth,
      flappyBird.sHeight,
      flappyBird.dx,
      flappyBird.dy,
      flappyBird.dWidth,
      flappyBird.dHeight
    )
  }
}

// floor (chão)

const floor = {
  sx: 0,
  sy: 610,
  sWidth: 224,
  sHeight: 112,
  dx: 0,
  dy: canvas.height - 112,
  dWidth: 224,
  dHeight: 112,

  print() {
    contexto.drawImage(
      sprites,
      floor.sx,
      floor.sy,
      floor.sWidth,
      floor.sHeight,
      floor.dx,
      floor.dy,
      floor.dWidth,
      floor.dHeight
    )
    contexto.drawImage(
      sprites,
      floor.sx,
      floor.sy,
      floor.sWidth,
      floor.sHeight,
      floor.dx + floor.sWidth,
      floor.dy,
      floor.dWidth,
      floor.dHeight
    )
  }
}

// background (fundo)

const background = {
  sx: 390,
  sy: 0,
  sWidth: 275,
  sHeight: 204,
  dx: 0,
  dy: canvas.height - 204,
  dWidth: 275,
  dHeight: 204,

  print() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      background.sx,
      background.sy,
      background.sWidth,
      background.sHeight,
      background.dx,
      background.dy,
      background.dWidth,
      background.dHeight
    )
    contexto.drawImage(
      sprites,
      background.sx,
      background.sy,
      background.sWidth,
      background.sHeight,
      background.dx + background.sWidth,
      background.dy,
      background.dWidth,
      background.dHeight
    )
  }
}

function loop() {
  flappyBird.refresh()

  background.print()
  floor.print()
  flappyBird.print()

  requestAnimationFrame(loop)
}
loop()
