const doNTimes = (f: () => any, n: Number): void => {
  for (let i = 0; i < n; i++) f();
};

class Game {
  static boardW = 600;
  static boardH = 600;
  private state = Array<Dot>();
  board: HTMLCanvasElement;
  boardContext: CanvasRenderingContext2D;

  constructor(private container: HTMLElement | null) {
    if (!container) throw new Error("No main found");
    this.board = document.createElement("canvas");
    this.board.width = Game.boardW;
    this.board.height = Game.boardH;
    const ctx = this.board.getContext("2d");
    if (!ctx) throw new Error("Context could not be created");
    this.boardContext = ctx;
    this.boardContext.strokeStyle = "#000";
    container.innerHTML = "";
    container.appendChild(this.board);
  }

  async createBoard() {
    let [xIndex, yIndex] = [5, 2];

    const drawWithDelay = async (
      xIndex: number,
      yIndex: number,
      activated: Boolean = false,
      delayMs: number = 20
    ) => {
      this.state.push(
        new Dot(xIndex, yIndex).draw(this.boardContext, activated)
      );
      await new Promise((r: any) => setTimeout(r, delayMs));
    };

    const draw3OrNDots = async (
      direction: "up" | "down" | "right" | "left",
      n: number = 3,
      delayMs: number = 20
    ) => {
      for (let i = 0; i < n; i++) {
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
        await drawWithDelay(xIndex, yIndex, true);
      }
      return new Promise((r: any) => r());
    };
    // Draw 3 dots in multiple directions to create a hollow cross
    // Use async/await in order to use animation
    await draw3OrNDots("right");
    await draw3OrNDots("down");
    await draw3OrNDots("right");
    await draw3OrNDots("down");
    await draw3OrNDots("left");
    await draw3OrNDots("down");
    await draw3OrNDots("left");
    await draw3OrNDots("up");
    await draw3OrNDots("left");
    await draw3OrNDots("up");
    await draw3OrNDots("right");
    await draw3OrNDots("up");

    const coordsWithFilledDots = this.state.map((dot) => [
      dot.xIndex,
      dot.yIndex,
    ]);

    for (let y = 0; y < 14; y++) {
      for (let x = 0; x < 14; x++) {
        if (coordsWithFilledDots.some((c) => c[0] === x && c[1] === y))
          continue;
        else await drawWithDelay(x, y, false, 6);
      }
    }
  }
}

class Dot {
  static diameter: number = 14;
  static radius = (): number => Dot.diameter / 2;
  static padding = (): number => 0.4 * Dot.diameter;
  static squareSideLength = (): number => Dot.diameter + Dot.padding() * 2;
  xIndex: number;
  yIndex: number;

  constructor(xIndex: number, yIndex: number) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
  }

  startX = (withPadding: Boolean = true): number =>
    this.xIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  startY = (withPadding: Boolean = true): number =>
    this.yIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  centerX = (): number => this.startX() + Dot.padding() + Dot.radius();
  centerY = (): number => this.startY() + Dot.padding() + Dot.radius();

  clear(boardContext: CanvasRenderingContext2D): void {
    boardContext.clearRect(
      this.startX(),
      this.startY(),
      Dot.squareSideLength(),
      Dot.squareSideLength()
    );
  }

  draw(boardContext: CanvasRenderingContext2D, activated: Boolean = true): Dot {
    this.clear(boardContext);
    const path = new Path2D();
    console.debug(`Drawing at (${this.centerX()}, ${this.centerY()})`);
    console.count("drawn dots");
    if (!activated) {
      boardContext.fillStyle = "#000";
    } else boardContext.fillStyle = "#fff";
    path.arc(
      this.centerX(),
      this.centerY(),
      activated ? Dot.radius() : (Dot.radius() / 3.3),
      0,
      360
    );
    boardContext.stroke(path);
    return this;
  }
}

const game = new Game(document.querySelector("main"));

game.createBoard();
