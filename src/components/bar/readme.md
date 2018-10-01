# hattrick-bar

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
<hattrick-bar level="4"></hattrick-bar>
<hattrick-bar level="4" max="10"></hattrick-bar>
<hattrick-bar level="4" max="8" cap="6" is-cap="false" denomination="Weak" label="Defending"></hattrick-bar>
<hattrick-bar level="6" max="8" cap="6" is-cap="true" denomination="Weak" label="Defending"></hattrick-bar>
```

## CSS variables

| Variable       | Description       | Default value |
| -------------- | ----------------- | ------------- |
| <nobr>--bar-level-background</nobr>  | The background color of the bar representing the level. | #59965D |
| <nobr>--bar-cap-background</nobr>  | The background color of the bar representing the steps between the current level and the maximum achievable level. | #CACACA |
| <nobr>--bar-max-background</nobr>  | The default background color of the remainder of the bar. | #ECECEC |
| <nobr>--bar-capped-background</nobr>  | The background color of the bar representing the level when the maximum achievable level has been reached. | #FFEB99 |
| <nobr>--bar-title-color</nobr>  | The text color of the title (e.g. skill name) in the bar. The text color of the actual levels are the opposites of the background (e.g. green bar with gray rest will give green text in the "max bar" or gray text in the "level bar"). | #000000 |

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                           | Type      |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------- | --------- |
| `cap`          | `cap`          | If there's a max before the end of the bar (e.g. maxed youth skill).                                  | `number`  |
| `denomination` | `denomination` | The denomination of the skill level                                                                   | `string`  |
| `isCap`        | `is-cap`       | If the sublevel is the same as the levelCap.                                                          | `boolean` |
| `label`        | `label`        | The label shown inside the bar                                                                        | `string`  |
| `lazy`         | `lazy`         | Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport | `boolean` |
| `level`        | `level`        | The level of the bar.                                                                                 | `number`  |
| `max`          | `max`          | The maximum level the bar should show.                                                                | `number`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
