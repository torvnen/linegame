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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dot_1 = __importDefault(require("./Dot"));
var Line_1 = require("./Line");
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
        // if (!!line && line.isLegitimate) {
        //   this.lines.push(line.finish());
        // } else line.destroy();
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
    Game.prototype.getDotsBetween = function (d1, d2) {
        var hDirection = d1.xIndex === d2.xIndex
            ? Line_1.LineDirection.None
            : d1.xIndex < d2.xIndex
                ? Line_1.LineDirection.LeftToRight
                : Line_1.LineDirection.RightToLeft;
        var vDirection = d1.yIndex === d2.yIndex
            ? Line_1.LineDirection.None
            : d1.yIndex < d2.yIndex
                ? Line_1.LineDirection.UpToDown
                : Line_1.LineDirection.DownToUp;
        var dots = Array();
        while (true) {
            var nextX = hDirection === Line_1.LineDirection.None
                ? d1.xIndex
                : hDirection === Line_1.LineDirection.LeftToRight
                    ? d1.xIndex + 1
                    : d1.xIndex - 1;
            var nextY = vDirection === Line_1.LineDirection.None
                ? d1.yIndex
                : vDirection === Line_1.LineDirection.UpToDown
                    ? d1.yIndex + 1
                    : d1.yIndex - 1;
            // Check if we went further than d2
            // * that would mean that a line from d1 to d2 is not legitimate
            var xTooFar = Math.abs(d1.xIndex - d2.xIndex) < Math.abs(d1.xIndex - nextX);
            var yTooFar = Math.abs(d1.yIndex - d2.yIndex) < Math.abs(d1.yIndex - nextY);
            if (xTooFar || yTooFar) {
                return null;
            }
            dots.push(this.board[nextX][nextY]);
            if (d2.xIndex === nextX && d2.yIndex === nextY)
                break;
        }
        return dots;
    };
    Game.prototype.addToBoard = function (dot) {
        if (!Array.isArray(this.board[dot.xIndex]))
            this.board[dot.xIndex] = Array();
        this.board[dot.xIndex][dot.yIndex] = dot;
    };
    Game.prototype.createBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var padding, _a, xIndex, yIndex, drawWithDelay, draw3Dots, coordsWithFilledDots, _loop_1, y;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        padding = Math.floor((Game.dotsPerSide - 10) / 2);
                        _a = [padding + 5, padding + 1], xIndex = _a[0], yIndex = _a[1];
                        drawWithDelay = function (xIndex, yIndex, activated, locked, delayMs) {
                            if (activated === void 0) { activated = false; }
                            if (locked === void 0) { locked = false; }
                            if (delayMs === void 0) { delayMs = 20; }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.addToBoard(new Dot_1.default(xIndex, yIndex, locked).draw(activated));
                                            return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delayMs); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        draw3Dots = function (direction, delayMs) {
                            if (delayMs === void 0) { delayMs = 20; }
                            return __awaiter(_this, void 0, void 0, function () {
                                var i;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            i = 0;
                                            _a.label = 1;
                                        case 1:
                                            if (!(i < 3)) return [3 /*break*/, 4];
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
                                            return [4 /*yield*/, drawWithDelay(xIndex, yIndex, true, true, delayMs)];
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
                        return [4 /*yield*/, draw3Dots("right")];
                    case 1:
                        // Draw 3 dots in multiple directions to create a hollow cross
                        // Use async/await in order to use animation
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("down")];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("right")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("down")];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("left")];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("down")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("left")];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("up")];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("left")];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("up")];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("right")];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, draw3Dots("up")];
                    case 12:
                        _b.sent();
                        coordsWithFilledDots = this.flattenBoard()
                            .filter(function (d) { return d.isActivated; })
                            .map(function (dot) { return [dot.xIndex, dot.yIndex]; });
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
                                        if (!(x < Game.dotsPerSide)) return [3 /*break*/, 4];
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
                        if (!(y < Game.dotsPerSide)) return [3 /*break*/, 16];
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
    Game.dotsPerSide = 20;
    return Game;
}());
exports.default = Game;
