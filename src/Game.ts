import Dot from "./Dot";
import Line, { LineDirection } from "./Line";
import Board from "./Board";

class Game {
  static boardW = 600;
  static boardH = 600;
  static dotsPerSide = 20;
  static context: CanvasRenderingContext2D;
  // private board = Array<Array<Dot>>();
  private board: Board;
  private lines = Array<Line>();
  private renderIntervalId: any;
  canvas: HTMLCanvasElement;

  constructor(private container: HTMLElement | null) {
    if (!container) throw new Error("No main found");
    this.canvas = document.createElement("canvas");
    this.canvas.width = Game.boardW;
    this.canvas.height = Game.boardH;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Context could not be created");
    Game.context = ctx;
    Game.context.strokeStyle = "#000";
    container.innerHTML = "";
    container.appendChild(this.canvas);
  }

  async start() {
    this.board = new Board();
    await this.board.create();
    this.renderIntervalId = setInterval(() => {
      for (const column of this.board.state) {
        for (const dot of column.filter((d) => d.requiresRerender)) dot.draw();
      }
    }, 33);
    return Promise.resolve();
  }

  // isDotActivateable(dot: Dot): boolean {
  //   const { xIndex, yIndex } = dot;
  //   const neighborIndices = [
  //     [xIndex - 1, yIndex + 1], // bottom-left
  //     [xIndex - 1, yIndex], // left
  //     [xIndex - 1, yIndex - 1], // top-left
  //     [xIndex, yIndex - 1], // top
  //     [xIndex + 1, yIndex - 1], // top-right
  //     [xIndex + 1, yIndex], // right
  //     [xIndex + 1, yIndex + 1], // bottom-right
  //     [xIndex, yIndex + 1], // bottom
  //   ];
  //   for (const [x, y] of neighborIndices) {
  //     if (this.board[x] && this.board[x][y] && this.board[x][y].isLocked)
  //       return true;
  //   }
  //   return false;
  // }
  completeOrDestroyLine(line?: Line) {
    // if (!!line && line.isLegitimate) {
    //   this.lines.push(line.finish());
    // } else line.destroy();
  }
  getDotAtOrNull(x: number, y: number): Dot | null {
    const dots = this.board.flatten();
    return (
      dots.find((d) => {
        const [x1, x2] = [d.startX(), d.endX()];
        if (x1 > x || x2 < x) return false;
        const [y1, y2] = [d.startY(), d.endY()];
        if (y1 > y || y2 < y) return false;
        return true;
      }) || null
    );
  }

  // getPossibleLines(dot: Dot) {
  //   const [xI, yI] = [dot.xIndex, dot.yIndex];
  //   const possibilities = Array<Array<Dot>>();
  //   for (const d in LineDirection) {
  //     for (let i = -4; i < 4; i++) {
  //       let possible = false;
  //       switch (d) {
  //       }
  //     }
  //   }
  // }

  // toggleDotActivated(xIndex: number, yIndex: number, activated: boolean) {
  //   if (!Array.isArray(this.board[xIndex])) return;
  //   if (!this.board[xIndex][yIndex]) return;
  //   this.board[xIndex][yIndex].draw(activated);
  // }

  // lockDot(dot: Dot): boolean {
  //   const lockable = dot.isLockable(this.flattenBoard());
  //   if (lockable) dot.lock().draw(true);
  //   return lockable;
  // }
}

export default Game;
