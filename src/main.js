const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

context.canvas.width = COLS * BLOCK_SIZE;
context.canvas.height = ROWS * BLOCK_SIZE;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

/*
let board = new Board()

function play() {
    
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

queue = []
queue.append(shuffle([1,2,3,4,5,6,7]))*/