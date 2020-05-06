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
        this.state = Array();
        if (!container)
            throw new Error("No main found");
        this.board = document.createElement("canvas");
        this.board.width = Game.boardW;
        this.board.height = Game.boardH;
        var ctx = this.board.getContext("2d");
        if (!ctx)
            throw new Error("Context could not be created");
        this.boardContext = ctx;
        this.boardContext.strokeStyle = "#000";
        container.innerHTML = "";
        container.appendChild(this.board);
    }
    Game.prototype.createBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, x, y, draw3OrNDots;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [5, 1], x = _a[0], y = _a[1];
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
                                            return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delayMs); })];
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.boardW = 600;
    Game.boardH = 600;
    return Game;
}());
var Dot = /** @class */ (function () {
    function Dot(x, y) {
        this.x = x;
        this.y = y;
    }
    Dot.prototype.draw = function (boardContext) {
        var path = new Path2D();
        var _a = [
            this.x * (Dot.diameter + Dot.padding * 2) + Dot.radius,
            this.y * (Dot.diameter + Dot.padding * 2) + Dot.radius,
        ], centerX = _a[0], centerY = _a[1];
        console.debug("Drawing at (" + centerX + ", " + centerY + ")");
        console.count("drawn dots");
        path.arc(centerX, centerY, (Dot.diameter / 2), 0, 360);
        boardContext.stroke(path);
        return this;
    };
    Dot.diameter = 14;
    Dot.radius = Dot.diameter / 2;
    Dot.padding = 0.4 * Dot.diameter;
    return Dot;
}());
var game = new Game(document.querySelector("main"));
game.createBoard();
