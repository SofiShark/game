const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

class Sobakai {
  constructor () {
    this.w = 90
    this.h = 120
    this.dx = 0
    this.x = (width - this.w) / 2 + this.dx
    this.y = height - this.h
    this.hp = 3

    this.direction = 0

    this.can_shoot = true
    this.bullets = []
    this.bullets_amount
    this.image = new Image()
    this.image.src = '/images/sobakai.png'
  }

  update(ctx, enemies) {
    this.move()
    this.draw(ctx)

    if (this.bullets[0]?.y < -this.bullets[0]?.h)
      delete this.bullets.shift()
    this.bullets.forEach((bullet, idx) => {
      bullet.update(ctx)

      enemies.some(enemy => {
        if (bullet.collision(enemy.getCollision())) {
          this.bullets = this.bullets.slice(0, idx).concat(this.bullets.slice(idx + 1))
          enemy.damage()
          return true
        }
        return false
      })
    })

    enemies.forEach(enemy => {
      if (this.collision(enemy.getCollision()))
        return this.damage(enemies)

      enemy.bullets.forEach(bullet => {
        if (this.collision(bullet.getCollision()))
          return this.damage(enemies)
      })
    })
  }

  draw(ctx) {
    ctx.shadowBlur = 0
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }

  setMove(x) {
    this.direction = x
  }

  move() {
    if (this.x < -this.w / 2 && this.direction == -1) return 
    if (this.x > width - this.w / 2 - 10 && this.direction == 1) return
    this.dx += this.direction * 3
    this.x = (width - this.w) / 2 + this.dx
  }

  shoot() {
    if (!this.can_shoot) return

    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, -3, '#4af531'))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 300)
  }

  getCollision() {
    return [
      [this.x,                    this.y], 
      [this.x + this.w,           this.y + this.h],
      [this.x + this.h,           this.y + this.w],
      [this.x + this.w + this.h,  this.y + this.w + this.h]
    ]
  }

  collision(pairs) {
    const [x1, y1] = pairs[0]
    const [x2, y2] = pairs[1]
    const [x3, y3] = pairs[2]
    const [x4, y4] = pairs[3]
    for (let [x0, y0] of this.getCollision())
      if ((x0 >= x1 && y0 >= y1) && (x0 >= x3 && y0 <= y3) && (x0 <= x2 && y0 >= y2) && (x0 <= x4 && y0 <= y4))
        return true

    return false
  }

  damage() {
    console.log('sobakai damaged')
  }
}

class Bullet {
  constructor (x, y, w, h, dy, color) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.direction = dy
    this.color = color
  }

  update(ctx) {
    this.move(ctx)
    this.draw(ctx)
  }

  move() {
    this.y += this.direction
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.shadowColor = "#fce862"
    ctx.shadowBlur = 6
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }

  getCollision() {
    return [
      [this.x,                    this.y], 
      [this.x + this.w,           this.y + this.h],
      [this.x + this.h,           this.y + this.w],
      [this.x + this.w + this.h,  this.y + this.w + this.h]
    ]
  }

  collision(pairs) {
    const [x1, y1] = pairs[0]
    const [x2, y2] = pairs[1]
    const [x3, y3] = pairs[2]
    const [x4, y4] = pairs[3]
    for (let [x0, y0] of this.getCollision())
      if ((x0 >= x1 && y0 >= y1) && (x0 >= x3 && y0 <= y3) && (x0 <= x2 && y0 >= y2) && (x0 <= x4 && y0 <= y4))
        return true

    return false
  }
}

class Enemy {
  constructor (x, y, w, h, dx, dy, hp, image, can_shoot) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.dx = dx
    this.dy = dy
    this.hp = hp
    this.image = new Image()
    this.image.src = image
    this.direction = 1

    this.can_shoot = can_shoot
    this.bullets = []
  }

  update(ctx) {
    this.setMove()
    this.move()
    this.draw(ctx)
    this.shoot()

    if (this.bullets.length && this.bullets[0].y > height) 
      delete this.bullets.shift()
    this.bullets.forEach(bullet => {
      bullet.update(ctx)
    })
  }

  setMove() {
    if (this.x < 0 || this.x > width - this.w) 
      return this.direction = -this.direction

    if (Math.random() < 0.01)
      return this.direction = -this.direction
  }

  move() {
    this.x += this.direction * this.dx
    this.y += this.dy
  }

  shoot() {
    if (!this.can_shoot) return

    const rand = Math.random()
    if (rand > 0.1) return

    const color = '#8a2bd6'

    if (rand == 0) {
      this.bullets.push(new Bullet(this.x + 30 + this.w / 2, this.y + 25, 10, 15, 3, color))
    }
    this.bullets.push(new Bullet(this.x + this.w / 2, this.y + 25, 10, 15, 3, color))
    this.can_shoot = false
    setTimeout(() => this.can_shoot = true, 1000)
  }

  draw(ctx) {
    ctx.shadowColor = "#eb7bf3"
    ctx.shadowBlur = 10
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }

  getCollision() {
    return [
      [this.x,                    this.y], 
      [this.x + this.w,           this.y + this.h],
      [this.x + this.h,           this.y + this.w],
      [this.x + this.w + this.h,  this.y + this.w + this.h]
    ]
  }

  damage() {
    console.log('enemy damaged')
  }
}