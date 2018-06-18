/*! Built with http://stenciljs.com */
const { h } = window.HtComponents;

class Timer {
    constructor() {
        /** The string for `days` which is used if the deadline is more than 72 hours away. */
        this.daysText = "days";
        /** If the timer should start counting upwards again after reaching 0. */
        this.keepCounting = false;
        /** After how many hours should it start showing _x days_. Change text via the `daysText` property. */
        this.maxHours = 72;
    }
    // /** The number of seconds left (or negative if `keepCounting` is set to `true`. */
    // @Prop({ reflectToAttr: true, mutable: true }) seconds: number;
    componentWillLoad() {
        // if (!this.deadline) {
        //   if (this._seconds) this._deadline = Date.now() + this._seconds * 1000;
        //   else console.error(new Error("ht-timer: Property deadline not set"));
        // }
        // else {
        //   this._deadline = fixDate(this.deadline).getTime();
        // }
        // this.deadlineUpdated();
        this.deadlineUpdated();
        this._interval = setInterval(() => this.updateTime(), 1000);
    }
    componentDidUnload() {
        this._interval && clearInterval(this._interval);
        // let x = this.deadlineUpdated.bind(this);
        // console.log(x);
    }
    deadlineUpdated() {
        this._deadline = fixDate(this.deadline).getTime();
        this.updateTime();
    }
    updateTime() {
        this.seconds = Math.floor((this._deadline - Date.now()) / 1000);
        if (this.seconds <= 0 && !this.keepCounting) {
            clearInterval(this._interval);
            this._interval = undefined;
        }
    }
    getTime() {
        if (this.shouldShowDaysText()) {
            const days = Math.floor(this.seconds / 24 / 60 / 60);
            return `${days} ${this.daysText}`;
        }
        else if (this.seconds >= 0) {
            const hours = Math.floor(this.seconds / 60 / 60);
            const minutes = Math.floor(this.seconds / 60 % 60);
            const seconds = Math.floor(this.seconds % 60);
            return this.format(hours, minutes, seconds);
        }
        else if (this.seconds < 0 && this.keepCounting) {
            const hours = Math.floor(-this.seconds / 60 / 60);
            const minutes = Math.floor(-this.seconds / 60 % 60);
            const seconds = Math.floor(-this.seconds % 60);
            return this.format(hours, minutes, seconds);
        }
        else {
            // no time left on the clock
            return "00:00:00";
        }
    }
    shouldShowDaysText() {
        return this.seconds > this.maxHours * 60 * 60;
    }
    padLeft(val) {
        if (val < 10)
            return "0" + val;
        else
            return val.toString();
    }
    format(hours, minutes, seconds) {
        return `${this.padLeft(hours)}:${this.padLeft(minutes)}:${this.padLeft(seconds)}`;
    }
    hostData() {
        return {
            "seconds": this.seconds,
            "role": "timer",
            "class": {
                "ht-timer-passed-zero": this.keepCounting && this.seconds < 0,
                "ht-timer-finished": !this.keepCounting && this.seconds <= 0,
            }
        };
    }
    render() {
        return (h("span", null, this.getTime()));
    }
    static get is() { return "ht-timer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
    }; }
    static get style() { return ":host {\n  font-variant-numeric: tabular-nums lining-nums; }"; }
}
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
