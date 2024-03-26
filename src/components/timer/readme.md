# hattrick-timer

A simple timer to display hh:mm:ss, optionally it can also start counting upwards if the deadline has passed.


## Usage

```html
<hattrick-timer deadline="2018-08-01 12:00:00"></hattrick-timer>
<hattrick-timer deadline="1533117600000"></hattrick-timer>
<hattrick-timer deadline="2018-08-01 12:00:00" keep-counting="true"></hattrick-timer>
<hattrick-timer deadline="2018-08-01 12:00:00" max-hours="72" days-text="days"></hattrick-timer>
```
```js
const deadline = new Date("2018-08-01 12:00:00")
const timer = document.createElement("hattrick-timer");
timer.deadline = deadline; // as date
timer.deadline = deadline.toISOString(); // as string
timer.deadline = deadline.getTime(); // as number
timer.deadline = deadline.getTime().toString(); // as numberic string
```


## CSS variables

_This component doesn't have any CSS variables_


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                     | Type                       | Default      |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `daysText`     | `days-text`     | The string for `days` which is used if the deadline is more than 72 hours away.                 | `string`                   | `"days"`     |
| `deadline`     | `deadline`      | At what time should the clock reach 00:00:00.                                                   | `Date \| number \| string` | `undefined`  |
| `keepCounting` | `keep-counting` | If the timer should start counting upwards again after reaching 0.                              | `boolean`                  | `false`      |
| `maxHours`     | `max-hours`     | After how many hours should it start showing _x days_. Change text via the `daysText` property. | `number`                   | `72`         |
| `pattern`      | `pattern`       |                                                                                                 | `string`                   | `"HH:MM:SS"` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
