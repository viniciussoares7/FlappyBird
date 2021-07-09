console.log('Flappy Bird - Vinicius')

const sound_hit = new Audio()
sound_hit.src = './assets/sound_efects/hit.wav'

const sprites = new Image()
sprites.src = './assets/images/sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

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

//start msg

const mensageGetReady = {
  sx: 134,
  sy: 0,
  sWidth: 174,
  sHeight: 152,
  dx: canvas.width / 2 - 174 / 2,
  dy: 50,
  dWidth: 174,
  dHeight: 152,

  print() {
    contexto.drawImage(
      sprites,
      mensageGetReady.sx,
      mensageGetReady.sy,
      mensageGetReady.sWidth,
      mensageGetReady.sHeight,
      mensageGetReady.dx,
      mensageGetReady.dy,
      mensageGetReady.dWidth,
      mensageGetReady.dHeight
    )
  }
}

// bird
function createFlappyBird() {
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
    jump: 4.6,
    action() {
      flappyBird.falldownSpeed = -flappyBird.jump
    },

    refresh() {
      if (doCollision(flappyBird, floor)) {
        console.log('hit')
        sound_hit.play()

        setTimeout(() => {
          screenChange(screens.startScreen)
        }, 300)
        return
      }

      flappyBird.falldownSpeed = flappyBird.falldownSpeed + flappyBird.gravity
      flappyBird.dy = flappyBird.dy + flappyBird.falldownSpeed
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
  return flappyBird
}

function doCollision(flappyBird, floor) {
  const flappyHeight = flappyBird.dy + flappyBird.sHeight
  const floorHeight = floor.dy

  if (flappyHeight >= floorHeight) {
    return true
  }
  return false
}

//screens
const global = {}

let activeScreen = {}

function screenChange(newScreen) {
  activeScreen = newScreen

  if (activeScreen.ini) {
    activeScreen.ini()
  }
}

const screens = {
  startScreen: {
    ini() {
      global.flappyBird = createFlappyBird()
    },
    print() {
      background.print()
      floor.print()
      global.flappyBird.print()
      mensageGetReady.print()
    },
    click() {
      screenChange(screens.game)
    },
    refresh() {}
  }
}
screens.game = {
  print() {
    background.print()
    floor.print()
    global.flappyBird.print()
  },
  click() {
    global.flappyBird.action()
  },
  refresh() {
    global.flappyBird.refresh()
  }
}

function loop() {
  activeScreen.print()
  activeScreen.refresh()
  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (activeScreen.click) {
    activeScreen.click()
  }
})

screenChange(screens.startScreen)
loop()
