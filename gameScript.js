console.log('Flappy Bird - Vinicius')

let frames = 0
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

function createPipes() {
  const pipes = {
    sWidth: 52,
    sHeight: 400,

    floor: {
      sx: 0,
      sy: 169
    },
    sky: {
      sx: 52,
      sy: 169
    },
    space: 80,

    print() {
      pipes.even.forEach(function (even) {
        const yRandom = even.y
        const spacePipes = 90

        const pipesSkyX = even.x
        const pipesSkyY = yRandom
        // Sky's pipe
        contexto.drawImage(
          sprites,
          pipes.sky.sx,
          pipes.sky.sy,
          pipes.sWidth,
          pipes.sHeight,
          pipesSkyX,
          pipesSkyY,
          pipes.sWidth,
          pipes.sHeight
        )

        // Floor's pipe
        const pipesFloorX = even.x
        const pipesFloorY = pipes.sHeight + spacePipes + yRandom
        contexto.drawImage(
          sprites,
          pipes.floor.sx,
          pipes.floor.sy,
          pipes.sWidth,
          pipes.sHeight,
          pipesFloorX,
          pipesFloorY,
          pipes.sWidth,
          pipes.sHeight
        )
        even.pipesSky = {
          x: pipesSkyX,
          y: pipes.sHeight + pipesSkyY
        }
        even.pipesFloor = {
          x: pipesFloorX,
          y: pipesFloorY
        }
      })
    },
    collisionFlappyBird(even) {
      const headFlappyBird = global.flappyBird.dy
      const footFlappyBird = global.flappyBird.dy + global.flappyBird.sHeight
      if (global.flappyBird.dx >= even.x) {
        if (headFlappyBird <= even.pipesSky.y) {
          return true
        }
        if (footFlappyBird >= even.pipesFloor.y) {
          return true
        }
      }
      return false
    },
    even: [{}],
    refresh() {
      const passed100frames = frames % 100 === 0
      if (passed100frames) {
        pipes.even.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        })
      }

      pipes.even.forEach(function (even) {
        even.x = even.x - 2

        if (pipes.collisionFlappyBird(even)) {
          console.log('You lose!')
          screenChange(screens.startScreen)
        }

        if (even.x + pipes.sWidth <= 0) {
          pipes.even.shift()
        }
      })
    }
  }
  return pipes
}

// floor (chão)
function createFloor() {
  const floor = {
    sx: 0,
    sy: 610,
    sWidth: 224,
    sHeight: 112,
    dx: 0,
    dy: canvas.height - 112,
    dWidth: 224,
    dHeight: 112,
    refresh() {
      const floorMove = 1
      const repeatAt = floor.sWidth / 2
      const floorMovement = floor.dx - floorMove

      floor.dx = floorMovement % repeatAt
    },
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
  return floor
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
      if (doCollision(flappyBird, global.floor)) {
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
    movements: [
      { spriteX: 0, spriteY: 0 }, // first image
      { spriteX: 0, spriteY: 26 }, // second image
      { spriteX: 0, spriteY: 52 }, // third image
      { spriteX: 0, spriteY: 26 } // second image
    ],
    actualFrame: 0,
    refreshActualFrame() {
      const framesInterval = 10
      if (frames % framesInterval === 0) {
        const baseIncrement = 1
        const increment = baseIncrement + flappyBird.actualFrame
        const baseRepeat = flappyBird.movements.length
        flappyBird.actualFrame = increment % baseRepeat
      }
    },
    print() {
      flappyBird.refreshActualFrame()
      const { spriteX, spriteY } = flappyBird.movements[flappyBird.actualFrame]
      contexto.drawImage(
        sprites,
        spriteX,
        spriteY,
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
      global.floor = createFloor()
      global.pipes = createPipes()
    },
    print() {
      background.print()
      global.pipes.print()
      global.floor.print()
      global.flappyBird.print()

      mensageGetReady.print()
    },
    click() {
      screenChange(screens.game)
    },

    refresh() {
      global.floor.refresh()
    }
  }
}
screens.game = {
  print() {
    background.print()
    global.pipes.print()
    global.floor.print()
    global.flappyBird.print()
  },
  click() {
    global.flappyBird.action()
  },
  refresh() {
    global.pipes.refresh()
    global.flappyBird.refresh()
    global.floor.refresh()
  }
}

function loop() {
  activeScreen.print()
  activeScreen.refresh()

  frames = frames + 1
  requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
  if (activeScreen.click) {
    activeScreen.click()
  }
})

screenChange(screens.startScreen)
loop()
