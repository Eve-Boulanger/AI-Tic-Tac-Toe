let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

let w; // = width / 3;
let h; // = height / 3'

let ai = 'O';
let human = 'X';
let playerTurn = human;

function setup() {
  createCanvas(400, 400);
  w = width/3;
  h = height/3;
  // COMMENT THIS OUT SO THAT YOU GO FIRST!
  //bestMove();
}

function equals3 (a,b,c) {
  return (a==b && b==c && a!='');
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (playerTurn == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      playerTurn = ai;
      bestMove();
    }
  }
}

function draw(){
  background(255);
  stroke(255,105,180);
  strokeWeight(2);
  let w = width / 3;
  let h = height / 3;
 
  line(w, 0, w, height);
  line(w*2, 0, w*2, height);
  line(0, h, width, h);
  line(0, h*2, width, h*2);
  
  for (let j = 0; j < 3; j++){
    for (let i = 0; i < 3; i++){
      let x = w  * i + w/3;
      let y = h * j + h/1.5;
      let spot = board[i][j];
      let iconP = createP('');
     // iconP.style('font-size', '70pt');
      textSize(70);
      if(spot == human) {
        text('X', x, y);
       // iconP.html('X').style('color', 'blue').style('margin-left', y);
      } else if(spot == ai) {
        text ('O', x, y);
      }
    }
  }

  let result = checkWinner();
  if(result != null){
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('It is a tie!').style('color', '#FE7D6A');
    } else if (result == 'X') {
      resultP.html(`Congratulations! You are the winner!`).style('color', '#FC46AA');
    } else {
      resultP.html(`Oops! The computer is the winner...`).style('color', '#800000');
    }
  }
}
