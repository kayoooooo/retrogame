export class Board {

    ROWS = 20;
    COLS = 10;
    BLOCK_SIZE = 30;

    // reset the board when a new game is started
    reset() {
        this.grid = this.createEmptyBoard();
    } 

    // create matrix filled with zeros 
    createEmptyBoard() {
        return Array.from({length: this.ROWS}, () => Array(this.COLS).fill(0));
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
            this.ctx.fillStyle = COLORS[value];
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
            ))
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
        console.log(p);
        return p;
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
}