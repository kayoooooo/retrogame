class Board {
    reset() {
        this.grid = createEmptyBoard();
    }

    createEmptyBoard() {
        return Array.from({length: ROWS}, () => Array(COLS).fill(0));
    }


}