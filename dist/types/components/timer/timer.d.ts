export declare class Timer {
    private _deadline;
    private _interval;
    private seconds;
    /** The string for `days` which is used if the deadline is more than 72 hours away. */
    daysText: string;
    /** At what time should the clock reach 00:00:00. */
    deadline: Date | string | number;
    /** If the timer should start counting upwards again after reaching 0. */
    keepCounting: boolean;
    /** After how many hours should it start showing _x days_. Change text via the `daysText` property. */
    maxHours: number;
    componentWillLoad(): void;
    componentDidUnload(): void;
    private deadlineUpdated;
    private updateTime;
    private getTime;
    private shouldShowDaysText;
    private padLeft;
    private format;
    hostData(): {
        "role": string;
        "class": {
            "ht-timer-passed-zero": boolean;
            "ht-timer-finished": boolean;
        };
    };
    render(): JSX.Element;
}
export declare function fixDate(date: Date | string | number): Date;
