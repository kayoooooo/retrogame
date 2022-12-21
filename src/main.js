import {Board} from "./board.js" 

const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

let board = new Board(context);

var time;
let requestId;

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function animate(now = 0) {
    // Update elapsed time.  
    time.elapsed = now - time.start;
    
    // If elapsed time has passed time for current level  
    if (time.elapsed > time.level) {
    
      // Restart counting from now
      time.start = now;   
      
      if (!board.drop()) {
        gameOver();
        return;
      }  
    }
    
    // Clear board before drawing new state.
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
    board.drawBoard();  
    requestId = requestAnimationFrame(animate);
  }

function gameOver() {
    cancelAnimationFrame(requestId);
    context.fillStyle = 'black';
    context.fillRect(1, 3, 8, 1.2);
    context.font = '1px Arial';
    context.fillStyle = 'red';
    context.fillText('GAME OVER', 1.8, 4);
}

export const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    UP: 38
}
Object.freeze(KEY);

export const moves = {
    [KEY.LEFT]:  p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: p => board.rotate(p)
}

document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {  
      // Stop the event from bubbling.
      event.preventDefault();
      
      // Get new state of piece
      let p = moves[event.keyCode](board.piece);
      
      if (board.valid(p)) {   
        
        // If the move is valid, move the piece.
        board.piece.move(p);
        if (event.keyCode === KEY.SPACE) {
            // Hard drop
            while (board.valid(p)) {
              board.piece.move(p);   
              p = moves[KEY.DOWN](board.piece);
            }
        } 
        // Clear old position before drawing.
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
        
        board.piece.draw();
      }
    }
});

function play(){
    time = { start: 0, elapsed: 0, level: 1000 };
    board.reset();
    time.start = performance.now();
    board.drawBoard();
    animate();
}

document.querySelector("#play").onclick = play;