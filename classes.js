const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

class Sobakai {
    constructor () {
        this.w = 120
        this.h = 140
        this.x = 0
        this.y = 0

        this.direction = 0

        this.bullets = []
        this.bullets_amount
        this.image = new Image()
        this.image.src = '/images/sobakai.png'
    }

    draw(ctx) {
        ctx.drawImage(this.image, (width - this.w) / 2 + this.x, height - this.h, this.w, this.h)
    }

    setMove(x) {
        this.direction = x
    }

    move() {
        this.x += this.direction * 3
    }

    shoot() {
        // this.bullets.push(new Bullet(this.x, this.y, 20, 40, -4, '#0ff00'))
        console.log('fire')
    }
}

class Bullet {
    constructor (x, y, w, h, dy, color) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.direction = dy
    }

    move() {
        console.log(this.y + this.direction)
        this.y += this.direction
    }

    draw(ctx) {
        ctx.fillstyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.y)
    }
}