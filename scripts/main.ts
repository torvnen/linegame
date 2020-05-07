const doNTimes = (f: () => any, n: Number): void => {
  for (let i = 0; i < n; i++) f();
};

class Game {
  static boardW = 600;
  static boardH = 600;
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

  startDrawingLine(dot: Dot): Line {
    throw new Error("Method not implemented.");
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
  completeOrDestroyLine(line: Line) {
    if (!!line && line.isLegitimate) {
      this.lines.push(line.finish());
    } else line.destroy();
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
      activated: boolean = false,
      locked: boolean = false,
      delayMs: number = 20
    ) => {
      this.addToBoard(new Dot(xIndex, yIndex, locked).draw(activated));
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

enum LineDirection {
  None = 0,
  Down = 1 << 0,
  Up = 1 << 1,
  LeftToRight = 1 << 2,
  RightToLeft = 1 << 3,
}

interface LineCoords {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

class Line {
  private _finished = false;
  private _dots = Array<Dot>();
  start: Dot;
  get finished() {
    return this._finished;
  }
  get endDot(): Dot {
    const lineDirection = this.lineDirection;
    return this._dots.reduce((prev, curr) => {
      if (
        (lineDirection & LineDirection.LeftToRight) ===
        LineDirection.LeftToRight
      )
        return prev.xIndex > curr.xIndex ? prev : curr;
      return prev.xIndex < curr.xIndex ? prev : curr;
    });
  }
  get lineDirection(): LineDirection {
    const dot2 = this._dots.find((d) =>
      this.start.neighborIndices.some(
        ([x, y]) => d.xIndex === x && d.yIndex === y
      )
    );
    if (!dot2) return LineDirection.None;
    const upOrDown =
      this.start.yIndex === dot2.yIndex
        ? LineDirection.None
        : this.start.yIndex < dot2.yIndex
        ? LineDirection.Down
        : LineDirection.Up;
    const ltrOrRtl =
      this.start.xIndex === dot2.xIndex
        ? LineDirection.None
        : this.start.xIndex < dot2.xIndex
        ? LineDirection.LeftToRight
        : LineDirection.RightToLeft;
    return upOrDown | ltrOrRtl;
  }
  get isLegitimate(): boolean {
    let curr = this.start;
    for (let i = 0; i < 5; i++) {
      let next = this._dots.find((d) =>
        curr.neighborIndices.some(([x, y]) => d.xIndex === x && d.yIndex === y)
      );
      if (!next) return false;
      curr = next;
    }
    return true;
  }
  constructor(start: Dot) {
    this.start = start;
  }
  finish(): Line {
    this._finished = true;
    return this;
  }
  destroy(): void {
    for (let dot of this._dots) {
      dot.draw(dot.isLocked, false);
    }
  }
  get coords(): LineCoords | null {
    const d1 = this.start;
    const d2 = this.endDot;
    const isLtr =
      (this.lineDirection & LineDirection.LeftToRight) ===
      LineDirection.LeftToRight;
    const isRtl =
      (this.lineDirection & LineDirection.RightToLeft) ===
      LineDirection.RightToLeft;
    const isDown =
      (this.lineDirection & LineDirection.Down) === LineDirection.Down;
    const isUp = (this.lineDirection & LineDirection.Up) === LineDirection.Up;
    const c: LineCoords = {};
    if (isLtr || isRtl) {
      // It's a horizontal or diagonal line
      c.startX = isLtr ? d1.startX(true) : d1.endX(true);
      c.endX = isLtr ? d2.endX(true) : d2.startX(true);
      if (isDown) {
        c.startY = d1.startY(true);
        c.endY = d2.endY(true);
      } else if (isUp) {
        c.startY = d1.endY(true);
        c.endY = d2.startY(true);
      } else {
        c.startY = (d1.startY() + d1.endY()) / 2;
        c.endY = (d2.startY() + d2.endY()) / 2;
      }
    } else {
      // It's a vertical line
      c.startX = (d1.startX(true) + d1.endX(true)) / 2;
      c.endX = c.startX;
      c.startY = isDown ? d1.startY(true) : d1.endY(true);
      c.endY = isDown ? d2.endY(true) : d1.startY(true);
    }
    return c;
  }
  draw() {
    const coords = this.coords;
  }
}

class Dot {
  static diameter: number = 14;
  static radius = (): number => Dot.diameter / 2;
  static padding = (): number => 0.4 * Dot.diameter;
  static squareSideLength = (): number => Dot.diameter + Dot.padding() * 2;
  xIndex: number;
  yIndex: number;
  isActivated: boolean = false;
  isLocked: boolean;
  lineDirections = Array<LineDirection>();
  get neighborIndices() {
    return [
      [this.xIndex - 1, this.yIndex + 1], // bottom-left
      [this.xIndex - 1, this.yIndex], // left
      [this.xIndex - 1, this.yIndex - 1], // top-left
      [this.xIndex, this.yIndex - 1], // top
      [this.xIndex + 1, this.yIndex - 1], // top-right
      [this.xIndex + 1, this.yIndex], // right
      [this.xIndex + 1, this.yIndex + 1], // bottom-right
      [this.xIndex, this.yIndex + 1], // bottom
    ];
  }

  constructor(xIndex: number, yIndex: number, locked: boolean = false) {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.isLocked = locked;
  }

  startX = (withPadding: boolean = true): number =>
    this.xIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  startY = (withPadding: boolean = true): number =>
    this.yIndex * (Dot.diameter + Dot.padding() * 2) +
    (withPadding ? Dot.padding() : 0);
  endX = (withPadding: boolean = true): number =>
    this.startX(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  endY = (withPadding: boolean = true): number =>
    this.startY(withPadding) +
    (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
  centerX = (): number => this.startX() + Dot.padding() + Dot.radius();
  centerY = (): number => this.startY() + Dot.padding() + Dot.radius();
  equals(other: Dot): boolean {
    return (
      !!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex
    );
  }
  clear(): void {
    Game.context.clearRect(
      this.startX(),
      this.startY(),
      Dot.squareSideLength(),
      Dot.squareSideLength()
    );
  }
  isLockable(otherDots: Array<Dot>): boolean {
    return true;
  }
  activate(): Dot {
    this.draw(true);
    return this;
  }
  lock(): Dot {
    this.isLocked = true;
    return this;
  }
  draw(activated = true, highlighted = false): Dot {
    this.clear();
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
    Game.context.stroke(path);
    if (highlighted) Game.context.fill(path);
    return this;
  }
}

const game = new Game(document.querySelector("main"));

game.createBoard().then(() => {
  let startDot: Dot;
  let endDot: Dot;
  let isDragging = false;
  let line: Line;
  const getRelativeCoords = (e: MouseEvent): { x: number; y: number } => {
    const bounds = (e.target as HTMLElement).getBoundingClientRect();
    const [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
    return { x, y };
  };
  game.canvas.onmousemove = function (e: MouseEvent) {
    const { x, y } = getRelativeCoords(e);
    const nextDot = game.getDotAt(x, y);

    if (!!startDot && !startDot.equals(nextDot) && !startDot.isLocked)
      game.toggleDotActivated(startDot.xIndex, startDot.yIndex, false);
    if (!!nextDot && game.isDotActivateable(nextDot)) {
      game.toggleDotActivated(nextDot.xIndex, nextDot.yIndex, true);
    }
    if (!isDragging) startDot = nextDot;
    else endDot = nextDot;
  };
  game.canvas.ondragstart = function (e: MouseEvent) {
    // TODO use click (or touch) + drag to draw a line from
    // * any dot to another, and see if that line is legible.
    // If the line is legible, display it as black, otherwise as red.
    // Display the to-activate dots with some other styling while forming the line.
    // Also check if the line would be too long.
    if (!!startDot) {
      startDot.lock();
      line = new Line(startDot);
    }
  };
  game.canvas.ondragend = function (e: MouseEvent) {
    game.completeOrDestroyLine(line);
  };
  game.canvas.ondrag = function (e: DragEvent) {
    if (!!startDot && startDot.isLocked) {
      line = game.startDrawingLine(startDot);
    }
  };
  // game.toggleDotActivated(2, 2, true);
  // game.toggleDotActivated(2, 5, false);
});
