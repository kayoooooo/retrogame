const colors = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"]
const shapes = [[[0,0,0,0], [1,1,1,1], [0,0,0,0],[0,0,0,0]], 
[[2,0,0], [2,2,2], [0,0,0]], 
[[0,0,3], [3,3,3], [0,0,0]], 
[[0,4,4,0], [0,4,4,0], [0,0,0,0]],
[[0,5,5], [5,5,0], [0,0,0]],
[[0,6,0], [6,6,6], [0,0,0]],
[[7,7,0], [0,7,7], [0,0,0]]
]
export class Piece {
    constructor(ctx, q) {
        this.ctx = ctx
        this.color = colors[q]
        this.shape = shapes[q]
    }
    
    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            // this.x, this.y gives the left upper position of the shape
            // x, y gives the position of the block in the shape
            // this.x + x is then the position of the block on the board
            if (value > 0) {
              this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
            }
          });
        });
      }
}