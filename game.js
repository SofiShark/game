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
  enemies.push(new Enemy(10, 10, 80, 80, 2, 0.5, 3, '/images/enemy1.png'))
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