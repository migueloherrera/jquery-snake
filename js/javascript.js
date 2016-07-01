var snake = ["20_20", "20_19", "20_18"];
var dir = 4;
var food = "";
var speed = 200;
var score = 0;
var level = 0;

$(document).ready(function(){
  
  render_grid();
  $('#play').click(function(){
    $("#play").hide();
    start_game();
  });
  
  $(document).keypress(function(event){

    event.preventDefault();
    switch(event.key){
    case  "ArrowLeft": dir = 2; break;
    case    "ArrowUp": dir = 3; break;
    case "ArrowRight": dir = 4; break;
    case  "ArrowDown": dir = 1; break;
    }

  });
});

function start_game() {
  render_grid();
  drawsnake();
  generatefood();
}

function render_grid() {
  $('#container').html("");
  $('#score').text(0);
  $('#level').text(0);
  for (var r = 0; r < 40; r++) {
    for (var c = 0; c < 40; c++){
	    $('#container').append('<div class=cells id=c_'+r+'_'+c+'></div>');
    }
  }
}

function generatefood(){
  var x = Math.floor(Math.random() * 39);
  var y = Math.floor(Math.random() * 39);
  $('#c_' + x + '_' + y).addClass('food');
  food = x + '_' + y;
} 

function drawsnake() {
  tail = snake.pop();
  $('#c_'+tail).removeClass('snake');
  var head = snake[0].split("_");
  var row = parseInt(head[0]);
  var col = parseInt(head[1]);
  $('#c_' + row + '_' + col).addClass('snake');
  switch(dir){
    case 1: row += 1; break; 
    case 2: col -= 1; break; 
    case 3: row -= 1; break; 
    case 4: col += 1; break; 
  }
  var location = row + "_" +col;

  if (location == food) {
    snake.push(tail);
    var points = score += 10;
    if (points % 100 == 0) {
      $('#level').text(level += 1);
      if (level == 5) {
        $('.cells').css('outline','none')
      }
      if (speed > 0) { speed -= 20; }
    }
    $('#score').text(points);
    $('#c_'+tail).addClass('snake');
    $('#c_'+food).removeClass('food');
    generatefood();
  }
  snake.unshift(location);
  
  if (col < 0 || row < 0 || col > 39 || row > 39 || $('#c_'+location).hasClass('snake')){
    alert('You lost !');
    //// reset the values to default ////
    snake = ["20_20", "20_19", "20_18"];
    dir = 4;
    food = "";
    speed = 200;
    score = 0;
    level = 0;
    ////////////////////////////////////
    $('#play').show();
  } else {
    $('#c_' + location).addClass('snake');  
    setTimeout(function(){drawsnake()}, speed);
  }
}
