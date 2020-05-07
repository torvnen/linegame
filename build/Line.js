"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
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
            var lineDirection = this.direction;
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
    Object.defineProperty(Line.prototype, "direction", {
        get: function () {
            var _this = this;
            var dot2 = this._dots.find(function (d) {
                return _this.start.neighborIndices.some(function (_a) {
                    var x = _a.x, y = _a.y;
                    return d.xIndex === x && d.yIndex === y;
                });
            });
            if (!dot2)
                return LineDirection.None;
            var upOrDown = this.start.yIndex === dot2.yIndex
                ? LineDirection.None
                : this.start.yIndex < dot2.yIndex
                    ? LineDirection.UpToDown
                    : LineDirection.DownToUp;
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
                        var x = _a.x, y = _a.y;
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
    Line.prototype.setDots = function (dots) {
        this._dots = dots;
        return this;
    };
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
            var _a = utils_1.deconstructLineDirection(this.direction), isLtr = _a.isLtr, isRtl = _a.isRtl, isUtd = _a.isUtd, isDtu = _a.isDtu;
            var c = {};
            if (isLtr || isRtl) {
                // It's a horizontal or diagonal line
                c.startX = isLtr ? d1.startX(true) : d1.endX(true);
                c.endX = isLtr ? d2.endX(true) : d2.startX(true);
                if (isUtd) {
                    c.startY = d1.startY(true);
                    c.endY = d2.endY(true);
                }
                else if (isDtu) {
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
                c.startY = isUtd ? d1.startY(true) : d1.endY(true);
                c.endY = isDtu ? d2.endY(true) : d1.startY(true);
            }
            return c;
        },
        enumerable: true,
        configurable: true
    });
    return Line;
}());
var LineDirection;
(function (LineDirection) {
    LineDirection[LineDirection["None"] = 0] = "None";
    LineDirection[LineDirection["UpToDown"] = 1] = "UpToDown";
    LineDirection[LineDirection["DownToUp"] = 2] = "DownToUp";
    LineDirection[LineDirection["LeftToRight"] = 4] = "LeftToRight";
    LineDirection[LineDirection["RightToLeft"] = 8] = "RightToLeft";
})(LineDirection = exports.LineDirection || (exports.LineDirection = {}));
exports.default = Line;
