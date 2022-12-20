import {moves, KEY, shuffle} from "./main.js"
import {Piece} from "./pieces.js"

export class Board {

    ROWS = 20;
    COLS = 10;
    BLOCK_SIZE = 30;
    queue = [].concat(shuffle([1,2,3,4,5,6,7]))

    constructor(ctx) {
        this.ctx = ctx;
        this.init();
    }

    init() {
        this.ctx.canvas.width = this.COLS * this.BLOCK_SIZE;
        this.ctx.canvas.height = this.ROWS * this.BLOCK_SIZE;
        this.ctx.scale(this.BLOCK_SIZE, this.BLOCK_SIZE);
    }

    reset() {
        this.grid = this.createEmptyBoard();
        this.queue = [].concat(shuffle([1,2,3,4,5,6,7]))
        this.piece = new Piece(this.ctx, this.queue[0] - 1);
    } 
    getNewPiece() {
        this.piece = new Piece(this.ctx, this.queue[0] - 1);
    }

    createEmptyBoard() {
        return Array.from({length: this.ROWS}, () => Array(this.COLS).fill(0));
    }

    drawBoard() {
        this.piece.draw()
        this.grid.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
            this.ctx.fillStyle = this.piece.color;
            this.ctx.fillRect(x, y, 1, 1);
            }
        });
        });
    }

    valid(p) {
        return p.shape.every((row, dy) => {
          return row.every((value, dx) => {
            let x = p.x + dx;
            let y = p.y + dy;
            return (
              value == 0 ||
             (0 <= x && this.COLS - 1 >= x && 
              0 <= y && this.ROWS - 1 >= y
            && (this.grid[y] && this.grid[y][x] === 0)))
          });
        });
    }

    rotate(piece) {
        // Clone with JSON for immutability.
        let p = JSON.parse(JSON.stringify(piece));
    
        // Transpose matrix
        for (let y = 0; y < p.shape.length; ++y) {
          for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
          }
        }
    
        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
        return p;
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
          this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                return false;
            }
            this.queue.shift();
            this.piece.ctx = this.ctx;
            this.getNewPiece();
            if (this.queue.length <= 6) {
                this.queue = this.queue.concat(shuffle([1,2,3,4,5,6,7]))
            }
        }
        return true;
      }
    
    freeze() {
        this.piece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value > 0) {
              this.grid[y + this.piece.y][x + this.piece.x] = value;
            }
          });
        });
    }

    clearLines() {
      let lines = 0;
  
      this.grid.forEach((row, y) => {
  
        // If every value is greater than 0.
        if (row.every(value => value > 0)) {
          lines++;
  
          // Remove the row.
          this.grid.splice(y, 1);
  
          // Add zero filled row at the top.
          this.grid.unshift(Array(COLS).fill(0));
        }
      });
      
      if (lines > 0) {
        // Calculate points from cleared lines and level.
  
        account.score += this.getLinesClearedPoints(lines);
        account.lines += lines;
  
        // If we have reached the lines for next level
        if (account.lines >= LINES_PER_LEVEL) {
          // Goto next level
          account.level++;  
          
          // Remove lines so we start working for the next level
          account.lines -= LINES_PER_LEVEL;
  
          // Increase speed of game
          time.level = LEVEL[account.level];
        }
      }
    }
}