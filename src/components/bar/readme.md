# ht-bar

Used to display various bars, e.g. skill bars or formation experiences (not to be mistaken with sliders!).

Terms for each part of a bar:
```
Currently is at level 4, can reach (cap at) 6, but 8 is the max for this type of bar.
|--------|----|----|
    ^      ^     ^
  level   cap   max
```

## Usage

```html
<ht-bar level="4"></ht-bar>
<ht-bar level="4" max="10"></ht-bar>
<ht-bar level="4" max="8" cap="6" is-cap="false" denomination="Weak" label="Defending"></ht-bar>
<ht-bar level="6" max="8" cap="6" is-cap="true" denomination="Weak" label="Defending"></ht-bar>
```

## CSS variables

#### --bar-level-background: #A9A9A9;

The background color of the bar representing the level

#### --bar-cap-background: #CACACA;

The background color of the bar representing the steps between the current level and the maximum achievable level.

#### --bar-max-background: #ECECEC;

The default background color of the remainder of the bar

#### --bar-capped-background: #FFEB99;

The background color of the bar representing the level when the maximum achievable level has been reached.

#### --bar-title-color: #000000;

The text color of the title (e.g. skill name) in the bar. The text color of the actual levels are the opposites of the background (e.g. green bar with gray rest will give green text in the "max bar" or gray text in the "level bar").

<!-- Auto Generated Below -->


## Properties

#### cap

number

If there's a max before the end of the bar (e.g. maxed youth skill).


#### denomination

string

The denomination of the skill level


#### isCap

boolean

If the sublevel is the same as the levelCap.


#### label

string

The label shown inside the bar


#### level

number

The level of the bar.


#### max

number

The maximum level the bar should show.


## Attributes

#### cap

number

If there's a max before the end of the bar (e.g. maxed youth skill).


#### denomination

string

The denomination of the skill level


#### is-cap

boolean

If the sublevel is the same as the levelCap.


#### label

string

The label shown inside the bar


#### level

number

The level of the bar.


#### max

number

The maximum level the bar should show.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
