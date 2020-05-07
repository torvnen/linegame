"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Line_1 = require("./Line");
exports.doNTimes = function (f, n) {
    for (var i = 0; i < n; i++)
        f();
};
function deconstructLineDirection(d) {
    return {
        isLtr: (d & Line_1.LineDirection.LeftToRight) === Line_1.LineDirection.LeftToRight,
        isRtl: (d & Line_1.LineDirection.RightToLeft) === Line_1.LineDirection.RightToLeft,
        isUtd: (d & Line_1.LineDirection.UpToDown) === Line_1.LineDirection.UpToDown,
        isDtu: (d & Line_1.LineDirection.DownToUp) === Line_1.LineDirection.DownToUp,
    };
}
exports.deconstructLineDirection = deconstructLineDirection;
