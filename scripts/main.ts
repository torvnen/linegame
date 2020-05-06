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
    // Start at (5, 1)
    let [x, y] = [5, 1];
    const draw3OrNDots = async (
      direction: "up" | "down" | "right" | "left",
      n: number = 3,
      delayMs: number = 20
    ) => {
      for (let i = 0; i < n; i++){
        switch (direction) {
          case "up":
            y--;
            break;
          case "down":
            y++;
            break;
          case "right":
            x++;
            break;
          case "left":
            x--;
            break;
        }
        this.state.push(new Dot(x, y).draw(this.boardContext));
        await new Promise((r: any) => setTimeout(r, delayMs));
      }
      return new Promise((r: any) => r())
    };
    // Draw 3 dots in multiple directions to create a hollow cross
    // Use async/await in order to use animation
    await draw3OrNDots( "right");
    await draw3OrNDots( "down");
    await draw3OrNDots( "right");
    await draw3OrNDots( "down");
    await draw3OrNDots( "left");
    await draw3OrNDots( "down");
    await draw3OrNDots( "left");
    await draw3OrNDots( "up");
    await draw3OrNDots( "left");
    await draw3OrNDots( "up");
    await draw3OrNDots( "right");
    await draw3OrNDots( "up");
  }
}

class Dot {
  static diameter: number = 14;
  static radius: number = Dot.diameter / 2
  static padding: number = 0.4 * Dot.diameter
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(boardContext: CanvasRenderingContext2D): Dot {
    const path = new Path2D();
    const [centerX, centerY] = [
      this.x * (Dot.diameter + Dot.padding * 2) + Dot.radius,
      this.y * (Dot.diameter + Dot.padding * 2) + Dot.radius,
    ];
    console.debug(`Drawing at (${centerX}, ${centerY})`);
    console.count("drawn dots");
    path.arc(centerX, centerY, (Dot.diameter / 2), 0, 360);
    boardContext.stroke(path);
    return this;
  }
}

const game = new Game(document.querySelector("main"));

game.createBoard();
