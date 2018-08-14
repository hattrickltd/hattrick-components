# hattrick-timer

A simple timer to display hh:mm:ss, optionally it can also start counting upwards if the deadline has passed, making it useful also as a match clock.


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

This component doesn't have any CSS variables


<!-- Auto Generated Below -->


## Properties

#### daysText

string

The string for `days` which is used if the deadline is more than 72 hours away.


#### deadline

Date|string|number

At what time should the clock reach 00:00:00.


#### keepCounting

boolean

If the timer should start counting upwards again after reaching 0.


#### maxHours

number

After how many hours should it start showing _x days_. Change text via the `daysText` property.


## Attributes

#### days-text

string

The string for `days` which is used if the deadline is more than 72 hours away.


#### deadline

Date|string|number

At what time should the clock reach 00:00:00.


#### keep-counting

boolean

If the timer should start counting upwards again after reaching 0.


#### max-hours

number

After how many hours should it start showing _x days_. Change text via the `daysText` property.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
