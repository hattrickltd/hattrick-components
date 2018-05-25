# ht-timer

A simple timer to display hh:mm:ss, optionally it can also start counting upwards if the deadline has passed, making it useful also as a match clock.


## CSS variables

This component doesn't have any CSS variables


<!-- Auto Generated Below -->


## Properties

#### daysText

string

The string for `days` which is used if the deadline is more than 72 hours away.


#### deadline

any

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

any

At what time should the clock reach 00:00:00.


#### keep-counting

boolean

If the timer should start counting upwards again after reaching 0.


#### max-hours

number

After how many hours should it start showing _x days_. Change text via the `daysText` property.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
