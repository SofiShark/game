const start = document.querySelectorAll('start-game')
const control_type = document.querySelector('#control-type')
const keys = {}

const cnv = $('#canvas')
const ctx = cnv.getContext('2d')
const bg = new Image()
bg.src = '/images/fon.jpg'


let width = document.body.clientWidth
let height = document.body.clientHeight
cnv.width = width
cnv.height = height
window.addEventListener('resize', e => {
  width = document.body.clientWidth
  height = document.body.clientHeight
  cnv.width = width
  cnv.height = height
})


const me = new Sobakai()
const enemies = []
let wave = 3

setInterval(update, 10)

window.addEventListener('keydown', e => {
  keys[e.code] = 1
})

window.addEventListener('keyup', e => {
  keys[e.code] = 0
})

function startGame() {
  newWave()
}

function newWave() {
  wave++

  if (wave > 4) {
    return enemies.push(new Enemy((width - 160) / 2, 0, 160, 160, 0.4, 0, 30, '/images/enemy3.png', true))
  }

  for (let i = 0; i < wave; i++) {
    const enemy = (Math.random() <= 0.5)
      ? new Enemy(Math.random() * (width - 80), -90, 80, 80, 2, 0.4, 2, '/images/enemy1.png', true)
      : new Enemy(Math.random() * (width - 95), -100, 95, 95, 4, 1, 3, '/images/enemy2.png', false)

    enemies.push(enemy)
  }
}

function update() {
  clear(ctx)
  drawBg(ctx)

  if (keys.KeyD && keys.KeyA) {
    me.setMove(0)
  } else if (keys.KeyD) {
    me.setMove(1)
  } else if (keys.KeyA) {
    me.setMove(-1)
  } else {
    me.setMove(0)
  }

  if (keys.Space) {
    me.shoot()
  }

  me.update(ctx)
  enemies.forEach(el => {
    el.update(ctx)
  })
}