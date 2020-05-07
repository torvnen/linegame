"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var doNTimes = function (f, n) {
    for (var i = 0; i < n; i++)
        f();
};
var Game = /** @class */ (function () {
    function Game(container) {
        this.container = container;
        this.board = Array();
        this.lines = Array();
        if (!container)
            throw new Error("No main found");
        this.canvas = document.createElement("canvas");
        this.canvas.width = Game.boardW;
        this.canvas.height = Game.boardH;
        var ctx = this.canvas.getContext("2d");
        if (!ctx)
            throw new Error("Context could not be created");
        Game.context = ctx;
        Game.context.strokeStyle = "#000";
        container.innerHTML = "";
        container.appendChild(this.canvas);
    }
    Game.prototype.startDrawingLine = function (dot) {
        throw new Error("Method not implemented.");
    };
    Game.prototype.flattenBoard = function () {
        var flat = Array();
        this.board.forEach(function (dArr) { return dArr.forEach(function (d) { return flat.push(d); }); });
        return flat;
    };
    Game.prototype.isDotActivateable = function (dot) {
        var xIndex = dot.xIndex, yIndex = dot.yIndex;
        var neighborIndices = [
            [xIndex - 1, yIndex + 1],
            [xIndex - 1, yIndex],
            [xIndex - 1, yIndex - 1],
            [xIndex, yIndex - 1],
            [xIndex + 1, yIndex - 1],
            [xIndex + 1, yIndex],
            [xIndex + 1, yIndex + 1],
            [xIndex, yIndex + 1],
        ];
        for (var _i = 0, neighborIndices_1 = neighborIndices; _i < neighborIndices_1.length; _i++) {
            var _a = neighborIndices_1[_i], x = _a[0], y = _a[1];
            if (this.board[x] && this.board[x][y] && this.board[x][y].isLocked)
                return true;
        }
        return false;
    };
    Game.prototype.completeOrDestroyLine = function (line) {
        if (!!line && line.isLegitimate) {
            this.lines.push(line.finish());
        }
        else
            line.destroy();
    };
    Game.prototype.getDotAt = function (x, y) {
        var dots = this.flattenBoard();
        return dots.find(function (d) {
            var _a = [d.startX(), d.endX()], x1 = _a[0], x2 = _a[1];
            if (x1 > x || x2 < x)
                return false;
            var _b = [d.startY(), d.endY()], y1 = _b[0], y2 = _b[1];
            if (y1 > y || y2 < y)
                return false;
            return true;
        });
    };
    Game.prototype.getPossibleLines = function (dot) {
        var _a = [dot.xIndex, dot.yIndex], xI = _a[0], yI = _a[1];
        var possibilities = Array();
        for (var d in LineDirection) {
            for (var i = -4; i < 4; i++) {
                var possible = false;
                switch (d) {
                }
            }
        }
    };
    Game.prototype.addToBoard = function (dot) {
        if (!Array.isArray(this.board[dot.xIndex]))
            this.board[dot.xIndex] = Array();
        this.board[dot.xIndex][dot.yIndex] = dot;
    };
    Game.prototype.createBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, xIndex, yIndex, drawWithDelay, draw3OrNDots, coordsWithFilledDots, _loop_1, y;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [5, 2], xIndex = _a[0], yIndex = _a[1];
                        drawWithDelay = function (xIndex, yIndex, activated, locked, delayMs) {
                            if (activated === void 0) { activated = false; }
                            if (locked === void 0) { locked = false; }
                            if (delayMs === void 0) { delayMs = 20; }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.addToBoard(new Dot(xIndex, yIndex, locked).draw(activated));
                                            return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delayMs); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        draw3OrNDots = function (direction, n, delayMs) {
                            if (n === void 0) { n = 3; }
                            if (delayMs === void 0) { delayMs = 20; }
                            return __awaiter(_this, void 0, void 0, function () {
                                var i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < n)) return [3 /*break*/, 4];
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
                                            return [4 /*yield*/, drawWithDelay(xIndex, yIndex, true, true)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/, new Promise(function (r) { return r(); })];
                                    }
                                });
                            });
                        };
                        // Draw 3 dots in multiple directions to create a hollow cross
                        // Use async/await in order to use animation
                        return [4 /*yield*/, draw3OrNDots("right")];
                    case 1:
                        // Draw 3 dots in multiple directions to create a hollow cross
                        // Use async/await in order to use animation
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("down")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("right")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("down")];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("left")];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("down")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("left")];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("up")];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("left")];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("up")];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("right")];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, draw3OrNDots("up")];
                    case 12:
                        _b.sent();
                        coordsWithFilledDots = this.flattenBoard().map(function (dot) { return [
                            dot.xIndex,
                            dot.yIndex,
                        ]; });
                        _loop_1 = function (y) {
                            var _loop_2, x;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_2 = function (x) {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!coordsWithFilledDots.some(function (c) { return c[0] === x && c[1] === y; })) return [3 /*break*/, 1];
                                                        return [2 /*return*/, "continue"];
                                                    case 1: return [4 /*yield*/, drawWithDelay(x, y, false, false, 6)];
                                                    case 2:
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        x = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(x < 14)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_2(x)];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        x++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        y = 0;
                        _b.label = 13;
                    case 13:
                        if (!(y < 14)) return [3 /*break*/, 16];
                        return [5 /*yield**/, _loop_1(y)];
                    case 14:
                        _b.sent();
                        _b.label = 15;
                    case 15:
                        y++;
                        return [3 /*break*/, 13];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.toggleDotActivated = function (xIndex, yIndex, activated) {
        if (!Array.isArray(this.board[xIndex]))
            return;
        if (!this.board[xIndex][yIndex])
            return;
        this.board[xIndex][yIndex].draw(activated);
    };
    Game.prototype.lockDot = function (dot) {
        var lockable = dot.isLockable(this.flattenBoard());
        if (lockable)
            dot.lock().draw(true);
        return lockable;
    };
    Game.boardW = 600;
    Game.boardH = 600;
    return Game;
}());
var LineDirection;
(function (LineDirection) {
    LineDirection[LineDirection["None"] = 0] = "None";
    LineDirection[LineDirection["Down"] = 1] = "Down";
    LineDirection[LineDirection["Up"] = 2] = "Up";
    LineDirection[LineDirection["LeftToRight"] = 4] = "LeftToRight";
    LineDirection[LineDirection["RightToLeft"] = 8] = "RightToLeft";
})(LineDirection || (LineDirection = {}));
var Line = /** @class */ (function () {
    function Line(start) {
        this._finished = false;
        this._dots = Array();
        this.start = start;
    }
    Object.defineProperty(Line.prototype, "finished", {
        get: function () {
            return this._finished;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "endDot", {
        get: function () {
            var lineDirection = this.lineDirection;
            return this._dots.reduce(function (prev, curr) {
                if ((lineDirection & LineDirection.LeftToRight) ===
                    LineDirection.LeftToRight)
                    return prev.xIndex > curr.xIndex ? prev : curr;
                return prev.xIndex < curr.xIndex ? prev : curr;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "lineDirection", {
        get: function () {
            var _this = this;
            var dot2 = this._dots.find(function (d) {
                return _this.start.neighborIndices.some(function (_a) {
                    var x = _a[0], y = _a[1];
                    return d.xIndex === x && d.yIndex === y;
                });
            });
            if (!dot2)
                return LineDirection.None;
            var upOrDown = this.start.yIndex === dot2.yIndex
                ? LineDirection.None
                : this.start.yIndex < dot2.yIndex
                    ? LineDirection.Down
                    : LineDirection.Up;
            var ltrOrRtl = this.start.xIndex === dot2.xIndex
                ? LineDirection.None
                : this.start.xIndex < dot2.xIndex
                    ? LineDirection.LeftToRight
                    : LineDirection.RightToLeft;
            return upOrDown | ltrOrRtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "isLegitimate", {
        get: function () {
            var curr = this.start;
            for (var i = 0; i < 5; i++) {
                var next = this._dots.find(function (d) {
                    return curr.neighborIndices.some(function (_a) {
                        var x = _a[0], y = _a[1];
                        return d.xIndex === x && d.yIndex === y;
                    });
                });
                if (!next)
                    return false;
                curr = next;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.finish = function () {
        this._finished = true;
        return this;
    };
    Line.prototype.destroy = function () {
        for (var _i = 0, _a = this._dots; _i < _a.length; _i++) {
            var dot = _a[_i];
            dot.draw(dot.isLocked, false);
        }
    };
    Object.defineProperty(Line.prototype, "coords", {
        get: function () {
            var d1 = this.start;
            var d2 = this.endDot;
            var isLtr = (this.lineDirection & LineDirection.LeftToRight) ===
                LineDirection.LeftToRight;
            var isRtl = (this.lineDirection & LineDirection.RightToLeft) ===
                LineDirection.RightToLeft;
            var isDown = (this.lineDirection & LineDirection.Down) === LineDirection.Down;
            var isUp = (this.lineDirection & LineDirection.Up) === LineDirection.Up;
            var c = {};
            if (isLtr || isRtl) {
                // It's a horizontal or diagonal line
                c.startX = isLtr ? d1.startX(true) : d1.endX(true);
                c.endX = isLtr ? d2.endX(true) : d2.startX(true);
                if (isDown) {
                    c.startY = d1.startY(true);
                    c.endY = d2.endY(true);
                }
                else if (isUp) {
                    c.startY = d1.endY(true);
                    c.endY = d2.startY(true);
                }
                else {
                    c.startY = (d1.startY() + d1.endY()) / 2;
                    c.endY = (d2.startY() + d2.endY()) / 2;
                }
            }
            else {
                // It's a vertical line
                c.startX = (d1.startX(true) + d1.endX(true)) / 2;
                c.endX = c.startX;
                c.startY = isDown ? d1.startY(true) : d1.endY(true);
                c.endY = isDown ? d2.endY(true) : d1.startY(true);
            }
            return c;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.draw = function () {
        var coords = this.coords;
    };
    return Line;
}());
var Dot = /** @class */ (function () {
    function Dot(xIndex, yIndex, locked) {
        var _this = this;
        if (locked === void 0) { locked = false; }
        this.isActivated = false;
        this.lineDirections = Array();
        this.startX = function (withPadding) {
            if (withPadding === void 0) { withPadding = true; }
            return _this.xIndex * (Dot.diameter + Dot.padding() * 2) +
                (withPadding ? Dot.padding() : 0);
        };
        this.startY = function (withPadding) {
            if (withPadding === void 0) { withPadding = true; }
            return _this.yIndex * (Dot.diameter + Dot.padding() * 2) +
                (withPadding ? Dot.padding() : 0);
        };
        this.endX = function (withPadding) {
            if (withPadding === void 0) { withPadding = true; }
            return _this.startX(withPadding) +
                (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
        };
        this.endY = function (withPadding) {
            if (withPadding === void 0) { withPadding = true; }
            return _this.startY(withPadding) +
                (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
        };
        this.centerX = function () { return _this.startX() + Dot.padding() + Dot.radius(); };
        this.centerY = function () { return _this.startY() + Dot.padding() + Dot.radius(); };
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.isLocked = locked;
    }
    Object.defineProperty(Dot.prototype, "neighborIndices", {
        get: function () {
            return [
                [this.xIndex - 1, this.yIndex + 1],
                [this.xIndex - 1, this.yIndex],
                [this.xIndex - 1, this.yIndex - 1],
                [this.xIndex, this.yIndex - 1],
                [this.xIndex + 1, this.yIndex - 1],
                [this.xIndex + 1, this.yIndex],
                [this.xIndex + 1, this.yIndex + 1],
                [this.xIndex, this.yIndex + 1],
            ];
        },
        enumerable: true,
        configurable: true
    });
    Dot.prototype.equals = function (other) {
        return (!!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex);
    };
    Dot.prototype.clear = function () {
        Game.context.clearRect(this.startX(), this.startY(), Dot.squareSideLength(), Dot.squareSideLength());
    };
    Dot.prototype.isLockable = function (otherDots) {
        return true;
    };
    Dot.prototype.activate = function () {
        this.draw(true);
        return this;
    };
    Dot.prototype.lock = function () {
        this.isLocked = true;
        return this;
    };
    Dot.prototype.draw = function (activated, highlighted) {
        if (activated === void 0) { activated = true; }
        if (highlighted === void 0) { highlighted = false; }
        this.clear();
        var path = new Path2D();
        console.debug("Drawing at (" + this.centerX() + ", " + this.centerY() + ")");
        console.count("drawn dots");
        if (activated) {
            this.isActivated = true;
        }
        path.arc(this.centerX(), this.centerY(), activated ? Dot.radius() : Dot.radius() / 3.3, 0, 360);
        Game.context.stroke(path);
        if (highlighted)
            Game.context.fill(path);
        return this;
    };
    Dot.diameter = 14;
    Dot.radius = function () { return Dot.diameter / 2; };
    Dot.padding = function () { return 0.4 * Dot.diameter; };
    Dot.squareSideLength = function () { return Dot.diameter + Dot.padding() * 2; };
    return Dot;
}());
var game = new Game(document.querySelector("main"));
game.createBoard().then(function () {
    var startDot;
    var endDot;
    var isDragging = false;
    var line;
    var getRelativeCoords = function (e) {
        var bounds = e.target.getBoundingClientRect();
        var _a = [e.clientX - bounds.left, e.clientY - bounds.top], x = _a[0], y = _a[1];
        return { x: x, y: y };
    };
    game.canvas.onmousemove = function (e) {
        var _a = getRelativeCoords(e), x = _a.x, y = _a.y;
        var nextDot = game.getDotAt(x, y);
        if (!!startDot && !startDot.equals(nextDot) && !startDot.isLocked)
            game.toggleDotActivated(startDot.xIndex, startDot.yIndex, false);
        if (!!nextDot && game.isDotActivateable(nextDot)) {
            game.toggleDotActivated(nextDot.xIndex, nextDot.yIndex, true);
        }
        if (!isDragging)
            startDot = nextDot;
        else
            endDot = nextDot;
    };
    game.canvas.ondragstart = function (e) {
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
    game.canvas.ondragend = function (e) {
        game.completeOrDestroyLine(line);
    };
    game.canvas.ondrag = function (e) {
        if (!!startDot && startDot.isLocked) {
            line = game.startDrawingLine(startDot);
        }
    };
    // game.toggleDotActivated(2, 2, true);
    // game.toggleDotActivated(2, 5, false);
});
