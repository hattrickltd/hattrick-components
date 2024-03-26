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

| Property        | Attribute         | Description                                                                                                                           | Type                       | Default     |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `addedMinutes`  | `added-minutes`   | How many minutes of added time the match has.                                                                                         | `number`                   | `0`         |
| `countUpFormat` | `count-up-format` |                                                                                                                                       | `string`                   | `"MM:SS"`   |
| `finishedDate`  | `finished-date`   | At what time the timer should stop. If not set, it will continue forever. If paused, the finishedDate will be pushed forward.         | `Date \| number \| string` | `undefined` |
| `halftimeBreak` | `halftime-break`  | How many minutes break does the match have between first and second half.                                                             | `number`                   | `15`        |
| `ignoreBreaks`  | `ignore-breaks`   | If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.                                  | `boolean`                  | `false`     |
| `matchdate`     | `matchdate`       | At what time the match starts.                                                                                                        | `Date \| number \| string` | `undefined` |
| `overtimeBreak` | `overtime-break`  | How many minutes break does the match have before overtime starts.                                                                    | `number`                   | `5`         |
| `speed`         | `speed`           | How fast the clock should tick. Defaults to 1. 2 means twice as fast.                                                                 | `number`                   | `1`         |
| `texts`         | --                | Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match. | `IClockTexts`              | `{} as any` |


## Methods

### `pause() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `resume() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
