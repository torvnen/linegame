"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Line_1 = __importDefault(require("./Line"));
var Game_1 = __importDefault(require("./Game"));
var game = new Game_1.default(document.querySelector("main"));
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
        if (!line)
            startDot = nextDot;
        else
            endDot = nextDot;
    };
    game.canvas.onmousedown = function (e) {
        if (!!startDot) {
            startDot.lock();
            line = new Line_1.default(startDot);
        }
    };
    game.canvas.onmouseup = function (e) {
        if (!!startDot) {
        }
        game.completeOrDestroyLine(line);
        line = undefined;
    };
});
