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
        if (!container)
            throw new Error("No main found");
        this.canvas = document.createElement("canvas");
        this.canvas.width = Game.boardW;
        this.canvas.height = Game.boardH;
        var ctx = this.canvas.getContext("2d");
        if (!ctx)
            throw new Error("Context could not be created");
        this.context = ctx;
        this.context.strokeStyle = "#000";
        container.innerHTML = "";
        container.appendChild(this.canvas);
    }
    Game.prototype.flattenBoard = function () {
        var flat = Array();
        this.board.forEach(function (dArr) { return dArr.forEach(function (d) { return flat.push(d); }); });
        return flat;
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
                                            this.addToBoard(new Dot(xIndex, yIndex, locked).draw(this.context, activated));
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
        this.board[xIndex][yIndex].draw(this.context, activated);
    };
    Game.boardW = 600;
    Game.boardH = 600;
    return Game;
}());
var Dot = /** @class */ (function () {
    function Dot(xIndex, yIndex, locked) {
        var _this = this;
        if (locked === void 0) { locked = false; }
        this.isActivated = false;
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
            return _this.startX(withPadding) + (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
        };
        this.endY = function (withPadding) {
            if (withPadding === void 0) { withPadding = true; }
            return _this.startY(withPadding) + (withPadding ? Dot.squareSideLength() : Dot.diameter + Dot.padding());
        };
        this.centerX = function () { return _this.startX() + Dot.padding() + Dot.radius(); };
        this.centerY = function () { return _this.startY() + Dot.padding() + Dot.radius(); };
        this.xIndex = xIndex;
        this.yIndex = yIndex;
        this.isLocked = locked;
    }
    Dot.prototype.equals = function (other) {
        return (!!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex);
    };
    Dot.prototype.clear = function (boardContext) {
        boardContext.clearRect(this.startX(), this.startY(), Dot.squareSideLength(), Dot.squareSideLength());
    };
    Dot.prototype.lock = function () {
        this.isLocked = true;
        return this;
    };
    Dot.prototype.draw = function (boardContext, activated) {
        if (activated === void 0) { activated = true; }
        this.clear(boardContext);
        var path = new Path2D();
        console.debug("Drawing at (" + this.centerX() + ", " + this.centerY() + ")");
        console.count("drawn dots");
        if (activated) {
            this.isActivated = true;
        }
        path.arc(this.centerX(), this.centerY(), activated ? Dot.radius() : Dot.radius() / 3.3, 0, 360);
        boardContext.stroke(path);
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
    var dot;
    game.canvas.onmousemove = function (e) {
        var bounds = e.target.getBoundingClientRect();
        var _a = [e.clientX - bounds.left, e.clientY - bounds.top], x = _a[0], y = _a[1];
        var nextDot = game.getDotAt(x, y);
        //if (!!nextDot) console.debug(`Found a dot at index [%i, %i]`, nextDot.xIndex, nextDot.yIndex)
        if (!!dot && !dot.equals(nextDot) && !dot.isLocked)
            game.toggleDotActivated(dot.xIndex, dot.yIndex, false);
        if (!!nextDot) {
            game.toggleDotActivated(nextDot.xIndex, nextDot.yIndex, true);
        }
        dot = nextDot;
    };
    // game.toggleDotActivated(2, 2, true);
    // game.toggleDotActivated(2, 5, false);
});
