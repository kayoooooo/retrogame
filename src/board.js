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
}