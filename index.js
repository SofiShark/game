const main_menu = $('#menu'),
      finish_menu = $('#result'),
      start_game = $$('#start-game'),
      back_to_menu = $('#to-menu'),
      canvas = $('#canvas')

function openMainMenu() {  
  main_menu.hidden = false
  finish_menu.hidden = true
}
function openFinishMenu() {  
  main_menu.hidden = true
  finish_menu.hidden = false
}
function openGame() {  
  main_menu.hidden = true
  finish_menu.hidden = true
}

window.addEventListener('keydown', function(e) {
  switch (e.code) {
    case "Escape":
      if (!canvas.hidden) openMainMenu()
      break
  }
})

start_game.forEach(el => {
  el.addEventListener('click', function() {
    openGame()
    startGame()
  })
})