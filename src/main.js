import {Board} from "./board.js" 
import {Piece} from "./pieces.js"

const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let board = new Board();


context.canvas.width = board.COLS * board.BLOCK_SIZE;
context.canvas.height = board.ROWS * board.BLOCK_SIZE;

context.scale(board.BLOCK_SIZE, board.BLOCK_SIZE);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}


var queue = []
queue = queue.concat(shuffle([1,2,3,4,5,6,7]))

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
}
Object.freeze(KEY);

const moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]:    p => ({ ...p, y: p.y + 1 })
};

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {  
      // Stop the event from bubbling.
      event.preventDefault();
      
      // Get new state of piece
      let p = moves[event.keyCode](board.piece);
      
      if (board.valid(p)) {    
        // If the move is valid, move the piece.
        board.piece.move(p);
        
        // Clear old position before drawing.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        
        board.piece.draw();
      }
    }
});

function play(){
    board.reset();
    let piece = new Piece(context, queue[0] - 1);
    piece.draw();
    console.log(piece.shape)
    board.piece = piece;
}

document.querySelector("#play").onclick = play;