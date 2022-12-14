class Board {

    // reset the board when a new game is started
    reset() {
        this.grid = createEmptyBoard();
    } 

    // create matrix filled with zeros 
    createEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }
}