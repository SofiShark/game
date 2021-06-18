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

setInterval(update, 5)

window.addEventListener('keydown', e => {
  console.log(e)
  keys[e.code] = 1
})

window.addEventListener('keyup', e => {
  keys[e.code] = 0
})


function clear() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
}

function drawBg() {
  bg.height = height
  ctx.drawImage(bg, 0, 0);
}

function update() {
  clear()
  drawBg()

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

  me.move()
  me.draw(ctx)
  // if (me.bullets.length)
  //   console.log(me.bullets)
  // me.bullets.forEach(el => {
  //   el.move()
  //   el.draw(ctx)
  // })
}