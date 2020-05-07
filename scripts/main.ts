const doNTimes = (f: () => any, n: Number): void => {
  for (let i = 0; i < n; i++) f();
};

class Game {
  static boardW = 600;
  static boardH = 600;
  private board = Array<Array<Dot>>();
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(private container: HTMLElement | null) {
    if (!container) throw new Error("No main found");
    this.canvas = document.createElement("canvas");
    this.canvas.width = Game.boardW;
    this.canvas.height = Game.boardH;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Context could not be created");
    this.context = ctx;
    this.context.strokeStyle = "#000";
    container.innerHTML = "";
    container.appendChild(this.canvas);
  }

  flattenBoard(): Array<Dot> {
    const flat = Array<Dot>();
    this.board.forEach((dArr) => dArr.forEach((d) => flat.push(d)));
    return flat;
  }

  isDotActivateable(dot: Dot): Boolean {
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

  getDotAt(x: number, y: number): Dot | null {
    const dots = this.flattenBoard();
    return dots.find((d) => {
      const [x1, x2] = [d.startX(), d.endX()];
      if (x1 > x || x2 < x) return false;
      const [y1, y2] = [d.startY(), d.endY()];
      if (y1 > y || y2 < y) return false;
      return true;
    });
  }

  getPossibleLines(dot: Dot) {
    const [xI, yI] = [dot.xIndex, dot.yIndex];
    const possibilities = Array<Array<Dot>>();
    for (const d in LineDirection) {
      for (let i = -4; i < 4; i++) {
        let possible = false;
        switch (d) {
        }
      }
    }
  }

  addToBoard(dot: Dot) {
    if (!Array.isArray(this.board[dot.xIndex]))
      this.board[dot.xIndex] = Array<Dot>();
    this.board[dot.xIndex][dot.yIndex] = dot;
  }

  async createBoard() {
    let [xIndex, yIndex] = [5, 2];

    const drawWithDelay = async (
      xIndex: number,
      yIndex: number,
      activated: Boolean = false,
      locked: Boolean = false,
      delayMs: number = 20
    ) => {
      this.addToBoard(
        new Dot(xIndex, yIndex, locked).draw(this.context, activated)
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
        await drawWithDelay(xIndex, yIndex, true, true);
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

    const coordsWithFilledDots = this.flattenBoard().map((dot) => [
      dot.xIndex,
      dot.yIndex,
    ]);

    for (let y = 0; y < 14; y++) {
      for (let x = 0; x < 14; x++) {
        if (coordsWithFilledDots.some((c) => c[0] === x && c[1] === y))
          continue;
        else await drawWithDelay(x, y, false, false, 6);
      }
    }
  }

  toggleDotActivated(xIndex: number, yIndex: number, activated: Boolean) {
    if (!Array.isArray(this.board[xIndex])) return;
    if (!this.board[xIndex][yIndex]) return;
    this.board[xIndex][yIndex].draw(this.context, activated);
  }

  lockDot(dot: Dot): Boolean {
    const lockable = dot.isLockable(this.flattenBoard());
    if (lockable) dot.lock().draw(this.context, true);
    return lockable;
  }
}

enum LineDirection {
  Horizontal = 0,
  Vertical,
  TopLeftToBottomRight,
  BottomLeftToTopRight,
}

class Dot {
  static diameter: number = 14;
  static radius = (): number => Dot.diameter / 2;
  static padding = (): number => 0.4 * Dot.diameter;
  static squareSideLength = (): number => Dot.diameter + Dot.padding() * 2;
  xIndex: number;
  yIndex: number;
  isActivated: Boolean = false;
  isLocked: Boolean;
  lineDirections = Array<LineDirection>();

  constructor(xIndex: number, yIndex: number, locked: Boolean = false) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.isLocked = locked;
  }

  startX = (withPadding: Boolean = true): number =>
    this.xIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  startY = (withPadding: Boolean = true): number =>
    this.yIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  endX = (withPadding: Boolean = true): number =>
    this.startX(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  endY = (withPadding: Boolean = true): number =>
    this.startY(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  centerX = (): number => this.startX() + Dot.padding() + Dot.radius();
  centerY = (): number => this.startY() + Dot.padding() + Dot.radius();
  equals(other: Dot): Boolean {
    return (
      !!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex
    );
  }
  clear(boardContext: CanvasRenderingContext2D): void {
    boardContext.clearRect(
      this.startX(),
      this.startY(),
      Dot.squareSideLength(),
      Dot.squareSideLength()
    );
  }
  isLockable(otherDots: Array<Dot>): Boolean {
    return true;
  }
  lock(): Dot {
    this.isLocked = true;
    return this;
  }

  draw(boardContext: CanvasRenderingContext2D, activated: Boolean = true): Dot {
    this.clear(boardContext);
    const path = new Path2D();
    console.debug(`Drawing at (${this.centerX()}, ${this.centerY()})`);
    console.count("drawn dots");
    if (activated) {
      this.isActivated = true;
    }
    path.arc(
      this.centerX(),
      this.centerY(),
      activated ? Dot.radius() : Dot.radius() / 3.3,
      0,
      360
    );
    boardContext.stroke(path);
    return this;
  }
}

const game = new Game(document.querySelector("main"));

game.createBoard().then(() => {
  let dot: Dot;
  const getRelativeCoords = (e: MouseEvent): { x: number; y: number } => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();
    const [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
    return { x, y };
  };
  game.canvas.onmousemove = function (e: MouseEvent) {
    const { x, y } = getRelativeCoords(e);
    const nextDot = game.getDotAt(x, y);

    if (!!dot && !dot.equals(nextDot) && !dot.isLocked)
      game.toggleDotActivated(dot.xIndex, dot.yIndex, false);
    if (!!nextDot && game.isDotActivateable(nextDot)) {
      game.toggleDotActivated(nextDot.xIndex, nextDot.yIndex, true);
    }
    dot = nextDot;
  };
  game.canvas.onclick = function (e: MouseEvent) {
    // TODO use click (or touch) + drag to draw a line from
    // * any dot to another, and see if that line is legible.
    // If the line is legible, display it as black, otherwise as red.
    // Display the to-activate dots with some other styling while forming the line.
    // Also check if the line would be too long.
    if (!!dot) {
      dot.lock();
    }
  };
  // game.toggleDotActivated(2, 2, true);
  // game.toggleDotActivated(2, 5, false);
});
