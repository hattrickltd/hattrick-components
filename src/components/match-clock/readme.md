# hattrick-match-clock

A match clock which counts down during halftime and overtime breaks, also counts down if the match hasn't started yet.


## Usage

```html
<hattrick-match-clock matchtime="2018-08-01 12:00:00"></hattrick-match-clock>
<hattrick-match-clock matchtime="1533117600000"></hattrick-match-clock>
```
```js
const matchtime = new Date("2018-08-01 12:00:00")
const timer = document.createElement("hattrick-match-clock");
timer.matchtime = matchtime; // as date
timer.matchtime = matchtime.toISOString(); // as string
timer.matchtime = matchtime.getTime(); // as number
timer.matchtime = matchtime.getTime().toString(); // as numberic string
```


## CSS variables

This component doesn't have any CSS variables


<!-- Auto Generated Below -->


## Properties

#### matchtime

Date|string|number

At what time the match starts.


#### texts

```js
{
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  halftime: string,
  overtimeBreak: string,
  overtime: string,
}
```

Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match.


#### addedMinutes

number

How many minutes of added time the match has.


#### halftimeBreak

number

How many minutes break does the match have between first and second half.


#### overtimeBreak

number

How many minutes break does the match have before overtime starts.


#### ignoreBreaks

boolean

If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.


## Attributes

#### matchtime

Date|string|number

At what time the match starts.


#### texts

```js
{
  days: string,
  hours: string,
  minutes: string,
  seconds: string,
  halftime: string,
  overtimeBreak: string,
  overtime: string,
}
```

Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match.


#### added-minutes

number

How many minutes of added time the match has.


#### halftime-break

number

How many minutes break does the match have between first and second half.


#### overtime-break

number

How many minutes break does the match have before overtime starts.


#### ignore-breaks

boolean

If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
