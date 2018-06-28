/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
var Timer = /** @class */ (function () {
    function Timer() {
        /** The string for `days` which is used if the deadline is more than 72 hours away. */
        this.daysText = "days";
        /** If the timer should start counting upwards again after reaching 0. */
        this.keepCounting = false;
        /** After how many hours should it start showing _x days_. Change text via the `daysText` property. */
        this.maxHours = 72;
    }
    // /** The number of seconds left (or negative if `keepCounting` is set to `true`. */
    // @Prop({ reflectToAttr: true, mutable: true }) seconds: number;
    Timer.prototype.componentWillLoad = function () {
        var _this = this;
        this.deadlineUpdated();
        this._interval = setInterval(function () { return _this.updateTime(); }, 1000);
    };
    Timer.prototype.componentDidUnload = function () {
        this._interval && clearInterval(this._interval);
    };
    Timer.prototype.deadlineUpdated = function () {
        this._deadline = fixDate(this.deadline).getTime();
        this.updateTime();
    };
    Timer.prototype.updateTime = function () {
        this.seconds = Math.floor((this._deadline - Date.now()) / 1000);
        if (this.seconds <= 0 && !this.keepCounting) {
            clearInterval(this._interval);
            this._interval = undefined;
        }
    };
    Timer.prototype.getTime = function () {
        if (this.shouldShowDaysText()) {
            var days = Math.floor(this.seconds / 24 / 60 / 60);
            return days + " " + this.daysText;
        }
        else if (this.seconds >= 0) {
            var hours = Math.floor(this.seconds / 60 / 60);
            var minutes = Math.floor(this.seconds / 60 % 60);
            var seconds = Math.floor(this.seconds % 60);
            return this.format(hours, minutes, seconds);
        }
        else if (this.seconds < 0 && this.keepCounting) {
            var hours = Math.floor(-this.seconds / 60 / 60);
            var minutes = Math.floor(-this.seconds / 60 % 60);
            var seconds = Math.floor(-this.seconds % 60);
            return this.format(hours, minutes, seconds);
        }
        else {
            // no time left on the clock
            return "00:00:00";
        }
    };
    Timer.prototype.shouldShowDaysText = function () {
        return this.seconds > this.maxHours * 60 * 60;
    };
    Timer.prototype.padLeft = function (val) {
        if (val < 10)
            return "0" + val;
        else
            return val.toString();
    };
    Timer.prototype.format = function (hours, minutes, seconds) {
        return this.padLeft(hours) + ":" + this.padLeft(minutes) + ":" + this.padLeft(seconds);
    };
    Timer.prototype.hostData = function () {
        return {
            "role": "timer",
            "class": {
                "ht-timer-passed-zero": this.keepCounting && this.seconds < 0,
                "ht-timer-finished": !this.keepCounting && this.seconds <= 0,
            }
        };
    };
    Timer.prototype.render = function () {
        return (h("span", null, this.getTime()));
    };
    Object.defineProperty(Timer, "is", {
        get: function () { return "ht-timer"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer, "properties", {
        get: function () {
            return {
                "daysText": {
                    "type": String,
                    "attr": "days-text"
                },
                "deadline": {
                    "type": "Any",
                    "attr": "deadline",
                    "watchCallbacks": ["deadlineUpdated"]
                },
                "keepCounting": {
                    "type": Boolean,
                    "attr": "keep-counting"
                },
                "maxHours": {
                    "type": Number,
                    "attr": "max-hours"
                },
                "seconds": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timer, "style", {
        get: function () { return ":host {\n  font-variant-numeric: tabular-nums lining-nums; }"; },
        enumerable: true,
        configurable: true
    });
    return Timer;
}());
function fixDate(date) {
    if (!date)
        return new Date();
    if (typeof date === "string")
        date = Date.parse(date.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/, "$1T$2:$3"));
    if (typeof date === "number")
        date = new Date(date);
    return date;
}
export { Timer as HtTimer };
