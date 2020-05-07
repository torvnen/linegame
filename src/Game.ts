import Dot from "./Dot";
import Line, { LineDirection } from "./Line";

class Game {
  static boardW = 600;
  static boardH = 600;
  static dotsPerSide = 20;
  static context: CanvasRenderingContext2D;
  private board = Array<Array<Dot>>();
  private lines = Array<Line>();
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

  flattenBoard(): Array<Dot> {
    const flat = Array<Dot>();
    this.board.forEach((dArr) => dArr.forEach((d) => flat.push(d)));
    return flat;
  }

  isDotActivateable(dot: Dot): boolean {
    const { xIndex, yIndex } = dot;
    const neighborIndices = [
      [xIndex - 1, yIndex + 1], // bottom-left
      [xIndex - 1, yIndex], // left
      [xIndex - 1, yIndex - 1], // top-left
      [xIndex, yIndex - 1], // top
      [xIndex + 1, yIndex - 1], // top-right
      [xIndex + 1, yIndex], // right
      [xIndex + 1, yIndex + 1], // bottom-right
      [xIndex, yIndex + 1], // bottom
    ];
    for (const [x, y] of neighborIndices) {
      if (this.board[x] && this.board[x][y] && this.board[x][y].isLocked)
        return true;
    }
    return false;
  }
  completeOrDestroyLine(line?: Line) {
    // if (!!line && line.isLegitimate) {
    //   this.lines.push(line.finish());
    // } else line.destroy();
  }
  getDotAt(x: number, y: number): Dot | undefined {
    const dots = this.flattenBoard();
    return dots.find((d) => {
      const [x1, x2] = [d.startX(), d.endX()];
      if (x1 > x || x2 < x) return false;
      const [y1, y2] = [d.startY(), d.endY()];
      if (y1 > y || y2 < y) return false;
      return true;
    });
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

  getDotsBetween(d1: Dot, d2: Dot): Array<Dot> | null {
    const hDirection: LineDirection =
      d1.xIndex === d2.xIndex
        ? LineDirection.None
        : d1.xIndex < d2.xIndex
        ? LineDirection.LeftToRight
        : LineDirection.RightToLeft;
    const vDirection: LineDirection =
      d1.yIndex === d2.yIndex
        ? LineDirection.None
        : d1.yIndex < d2.yIndex
        ? LineDirection.UpToDown
        : LineDirection.DownToUp;
    const dots = Array<Dot>();
    while (true) {
      const nextX =
        hDirection === LineDirection.None
          ? d1.xIndex
          : hDirection === LineDirection.LeftToRight
          ? d1.xIndex + 1
          : d1.xIndex - 1;
      const nextY =
        vDirection === LineDirection.None
          ? d1.yIndex
          : vDirection === LineDirection.UpToDown
          ? d1.yIndex + 1
          : d1.yIndex - 1;
      // Check if we went further than d2
      // * that would mean that a line from d1 to d2 is not legitimate
      const xTooFar =
        Math.abs(d1.xIndex - d2.xIndex) < Math.abs(d1.xIndex - nextX);
      const yTooFar =
        Math.abs(d1.yIndex - d2.yIndex) < Math.abs(d1.yIndex - nextY);
      if (xTooFar || yTooFar) {
        return null;
      }
      dots.push(this.board[nextX][nextY]);
      if (d2.xIndex === nextX && d2.yIndex === nextY) break;
    }
    return dots;
  }

  addToBoard(dot: Dot) {
    if (!Array.isArray(this.board[dot.xIndex]))
      this.board[dot.xIndex] = Array<Dot>();
    this.board[dot.xIndex][dot.yIndex] = dot;
  }

  async createBoard() {
    // Amount of padding:
    const padding = Math.floor((Game.dotsPerSide - 10) / 2);
    // Start position is initial padding per side,
    // * plus 5 for x and 1 for y
    let [xIndex, yIndex] = [padding + 5, padding + 1];

    const drawWithDelay = async (
      xIndex: number,
      yIndex: number,
      activated: boolean = false,
      locked: boolean = false,
      delayMs: number = 20
    ) => {
      this.addToBoard(new Dot(xIndex, yIndex, locked).draw(activated));
      await new Promise((r: any) => setTimeout(r, delayMs));
    };

    const draw3Dots = async (
      direction: "up" | "down" | "right" | "left",
      delayMs: number = 20
    ) => {
      for (let i = 0; i < 3; i++) {
        switch (direction) {
          case "up":
            yIndex--;
            break;
          case "down":
            yIndex++;
            break;
          case "right":
            xIndex++;
            break;
          case "left":
            xIndex--;
            break;
        }
        await drawWithDelay(xIndex, yIndex, true, true, delayMs);
      }
      return new Promise((r: any) => r());
    };
    // Draw 3 dots in multiple directions to create a hollow cross
    // Use async/await in order to use animation
    await draw3Dots("right");
    await draw3Dots("down");
    await draw3Dots("right");
    await draw3Dots("down");
    await draw3Dots("left");
    await draw3Dots("down");
    await draw3Dots("left");
    await draw3Dots("up");
    await draw3Dots("left");
    await draw3Dots("up");
    await draw3Dots("right");
    await draw3Dots("up");

    const coordsWithFilledDots = this.flattenBoard()
      .filter((d) => d.isActivated)
      .map((dot) => [dot.xIndex, dot.yIndex]);

    for (let y = 0; y < Game.dotsPerSide; y++) {
      for (let x = 0; x < Game.dotsPerSide; x++) {
        if (coordsWithFilledDots.some((c) => c[0] === x && c[1] === y))
          continue;
        else await drawWithDelay(x, y, false, false, 6);
      }
    }
  }

  toggleDotActivated(xIndex: number, yIndex: number, activated: boolean) {
    if (!Array.isArray(this.board[xIndex])) return;
    if (!this.board[xIndex][yIndex]) return;
    this.board[xIndex][yIndex].draw(activated);
  }

  lockDot(dot: Dot): boolean {
    const lockable = dot.isLockable(this.flattenBoard());
    if (lockable) dot.lock().draw(true);
    return lockable;
  }
}

export default Game;
