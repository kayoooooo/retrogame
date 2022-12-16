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
}