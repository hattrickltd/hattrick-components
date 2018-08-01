export class Timer {
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
        this.deadlineUpdated();
        this._interval = setInterval(() => this.updateTime(), 1000);
    }
    componentDidUnload() {
        this._interval && clearInterval(this._interval);
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
    static get style() { return "/**style-placeholder:ht-timer:**/"; }
}
export function fixDate(date) {
    if (!date)
        return new Date();
    if (Object.prototype.toString.call(date) === "[object Date]")
        return date;
    if (!isNaN(date))
        return new Date(parseInt(date.toString()));
    if (typeof date === "string")
        return new Date(date.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/, "$1T$2:$3"));
    return date;
}
