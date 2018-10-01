# hattrick-match-clock

A match clock which counts down during halftime and overtime breaks, also counts down if the match hasn't started yet.


## Usage

```html
<hattrick-match-clock matchdate="2018-08-01 12:00:00"></hattrick-match-clock>
<hattrick-match-clock matchdate="1533117600000"></hattrick-match-clock>
```
```js
const matchdate = new Date("2018-08-01 12:00:00")
const timer = document.createElement("hattrick-match-clock");
timer.matchdate = matchdate; // as date
timer.matchdate = matchdate.toISOString(); // as string
timer.matchdate = matchdate.getTime(); // as number
timer.matchdate = matchdate.getTime().toString(); // as numberic string
```


## CSS variables

_This component doesn't have any CSS variables_


<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                            | Type                                                                                                                                                          |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addedMinutes`  | `added-minutes`  | How many minutes of added time the match has.                                                                                          | `number`                                                                                                                                                      |
| `halftimeBreak` | `halftime-break` | How many minutes break does the match have between first and second half.                                                              | `number`                                                                                                                                                      |
| `ignoreBreaks`  | `ignore-breaks`  | If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.                                   | `boolean`                                                                                                                                                     |
| `matchdate`     | --               | At what time the match starts.                                                                                                         | `Date`, `string`, `number`                                                                                                                                    |
| `overtimeBreak` | `overtime-break` | How many minutes break does the match have before overtime starts.                                                                     | `number`                                                                                                                                                      |
| `texts`         | --               | Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match.. | `{     days: string,     hours: string,     minutes: string,     seconds: string,     halftime: string,     overtimeBreak: string,     overtime: string,   }` |


## Methods

| Method   | Description |
| -------- | ----------- |
| `pause`  |             |
| `resume` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
