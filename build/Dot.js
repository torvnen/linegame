"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(require("./Game"));
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
                { x: this.xIndex - 1, y: this.yIndex + 1 },
                { x: this.xIndex - 1, y: this.yIndex },
                { x: this.xIndex - 1, y: this.yIndex - 1 },
                { x: this.xIndex, y: this.yIndex - 1 },
                { x: this.xIndex + 1, y: this.yIndex - 1 },
                { x: this.xIndex + 1, y: this.yIndex },
                { x: this.xIndex + 1, y: this.yIndex + 1 },
                { x: this.xIndex, y: this.yIndex + 1 },
            ];
        },
        enumerable: true,
        configurable: true
    });
    Dot.prototype.equals = function (other) {
        return (!!other && other.xIndex === this.xIndex && other.yIndex === this.yIndex);
    };
    Dot.prototype.clear = function () {
        Game_1.default.context.clearRect(this.startX(), this.startY(), Dot.squareSideLength(), Dot.squareSideLength());
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
        // console.debug(`Drawing at (${this.centerX()}, ${this.centerY()})`);
        // console.count("drawn dots");
        if (activated) {
            this.isActivated = true;
        }
        path.arc(this.centerX(), this.centerY(), activated ? Dot.radius() : Dot.radius() / 3.3, 0, 360);
        Game_1.default.context.stroke(path);
        if (highlighted)
            Game_1.default.context.fill(path);
        return this;
    };
    Dot.diameter = 14;
    Dot.radius = function () { return Dot.diameter / 2; };
    Dot.padding = function () { return 0.4 * Dot.diameter; };
    Dot.squareSideLength = function () { return Dot.diameter + Dot.padding() * 2; };
    return Dot;
}());
exports.default = Dot;
