const start = document.querySelectorAll('start-game')
const control_type = document.querySelector('#control-type')
const finish_title = document.querySelector('#result-title')
const finish_score = document.querySelector('#result-score span')
const keys = {}

const cnv = $('#canvas')
const ctx = cnv.getContext('2d')
const bg = new Image()
bg.src = '/images/fon.jpg'


Array.prototype.delete = function(idx) {
  return this.slice(0, idx).concat(this.slice(idx + 1))
}


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
let enemies = []
let wave = 0
let score = 0
let is_wave_active = false

setInterval(update, 15)

window.addEventListener('keydown', e => {
  keys[e.code] = 1
})

window.addEventListener('keyup', e => {
  keys[e.code] = 0
})

window.addEventListener('mousemove', function(e) {
  if (control_type.value == 'mouse') {
    me.x = e.clientX
  }
})

function startGame() {
  score = 0
  wave = 0
  me.hp = 3
  newWave()
}

function resetGame() {
  is_wave_active = false
  enemies = []
  me.bullets = []
}

function finishGame(msg) {
  finish_title.textContent = msg
  finish_score.textContent = score
  resetGame()
  openFinishMenu()
}

function newWave() {
  me.bullets = []
  is_wave_active = true
  wave++

  if (wave > 4) {
    return enemies.push(new Enemy((width - 160) / 2, 0, 200, 160, 0.7, 0, 30, '/images/enemy3.png', true))
  }

  for (let i = 0; i < wave; i++) {
    const enemy = (Math.random() <= 0.5)
      ? new Enemy(Math.random() * (width - 80), -90, 100, 80, 3, 0.6, 2, '/images/enemy1.png', true)
      : new Enemy(Math.random() * (width - 95), -100, 120, 95, 5, 1.2, 3, '/images/enemy2.png', false)

    enemies.push(enemy)
  }
}

function clear(ctx) {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
}

function drawBg(ctx) {
  ctx.drawImage(bg, 0, 0);
}

function sobakaDamaged() {
  if (--me.hp <= 0)
    return finishGame('Defeat')

  me.impregnable = true
  setTimeout(() => me.impregnable = false, 1000)
  me.bullets = []
  enemies.forEach(enemy => {
    enemy.bullets = []
  })
}

function update() {
  clear(ctx)
  drawBg(ctx)

  ctx.font = "30px Arial"
  ctx.fillStyle = "#00ff00"
  ctx.fillText(`HP: ${me.hp}`, 10, height - 10)
  ctx.fillText(`Score: ${score}`, 10, 35)

  if (control_type.value == 'keyboard') {
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
  } else {
    me.shoot()
  }

  me.update(ctx, enemies) // Обновление гг

  me.bullets.forEach(bullet => {
    bullet.update(ctx) // Обновление каждой пули гг
  })
  if (me.bullets[0]?.y < -me.bullets[0]?.h) { // Проверка первой пули на выход за экран
    delete me.bullets.shift()                 // Можно проверять только первую пулю, тк она будет лететь впереди других
  }

  enemies.forEach(enemy => {
    enemy.update(ctx) // Обновление каждого врага
    if (enemy.bullets.length && enemy.bullets[0].y > height)  // Проверка первой пули каждого врага на выход за экран
      delete enemy.bullets.shift()                            // Можно проверять только первую пулю, тк она будет лететь впереди других

    me.bullets.forEach((bullet, idx) => {
      if (bullet.collision(enemy)) {
        score += 10
        me.bullets.splice(idx, 1)
        enemy.hp--
      }
    })

    if (me.impregnable) return

    if (me.collision(enemy)) {
      enemy.hp--
      return sobakaDamaged()
    }

    enemy.bullets.forEach(bullet => {
      bullet.update(ctx)

      if (!me.impregnable && me.collision(bullet))
        return sobakaDamaged()
    })
  })
  enemies = enemies.filter(enemy => enemy.y < height && enemy.hp > 0) // Удаление врагов, если вышли за экран

  if (enemies.length <= 0 && is_wave_active) {
    if (wave >= 5) return finishGame('Victory')
    is_wave_active = false
    setTimeout(newWave, 3000)
  }

  me.bullets = me.bullets.filter(bullet => !bullet.damaged)
}