const game = document.querySelector('#game'),
      main_menu = document.querySelector('#menu'),
      finish_menu = document.querySelector('#result'),
      start_game = document.querySelector('#start-game'),
      restart_game = document.querySelector('#restart-game'),
      back_to_menu = document.querySelector('#to-menu')

game.height = document.clientHeight
game.width = document.clientWidth

function openMainMenu() {  
  main_menu.hidden = false
  finish_menu.hidden = true
  game.hidden = true
}
function openFinishMenu() {  
  main_menu.hidden = true
  finish_menu.hidden = false
  game.hidden = true
}
function openGame() {  
  main_menu.hidden = true
  finish_menu.hidden = true
  game.hidden = false
}

window.addEventListener('keydown', function(e) {
  switch (e.key) {
    case "Escape":
      if (!game.hidden) openMainMenu()
      break
  }
})

start_game.addEventListener('click', function() {
  openGame()
})

restart_game.addEventListener('click', function() {
  openGame()
})