const COLS = 10;
const ROWS = 20;

let board = new Board()

function play() {
    
}
const height = 20
const width = 10

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

queue = []
queue.append(shuffle([1,2,3,4,5,6,7]))