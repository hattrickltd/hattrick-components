# hattrick-rating

Used to display a Hattrick rating. Uses [progress-arc](../progress-arc/) to display stamina.


## Usage
```html
<hattrick-rating size="large" rating="14.5" stamina="0.8"></hattrick-rating>
<hattrick-rating size="small" rating="14.5" stamina="0.6"></hattrick-rating>

<hattrick-rating size="44" rating="14.5" stamina="0.4"></hattrick-rating>
<hattrick-rating size="29" rating="14.5" stamina="0.2"></hattrick-rating>
```

## CSS Variables

| Variable       | Description       | Default value |
| -------------- | ----------------- | ------------- |
| <nobr>--rating-background</nobr>  | The background color. | #FFFFFF |
| <nobr>--rating-color</nobr>  | The text color. | #666666 |
| <nobr>--rating-font-weight</nobr>  | The font-weight. | bold |
| <nobr>--rating-stamina-arc-very-low</nobr>  | Color of the stamina bar when below 25%. | #DD4140 |
| <nobr>--rating-stamina-arc-low</nobr>  | Color of the stamina bar when between 25% and 49%. | #F5A104 |
| <nobr>--rating-stamina-arc-high</nobr>  | Color of the stamina bar when below 50% and 74%. | #F1C40A |
| <nobr>--rating-stamina-arc-very-high</nobr>  | Color of the stamina bar when above 75%. | #31A94B |
| <nobr>--rating-stamina-arc-rest</nobr>  | The color of the remaining part to complete the circle. | #CCCCCC |

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                            | Type                           |
| -------------- | --------------- | -------------------------------------- | ------------------------------ |
| `rating`       | `rating`        | The rating to show inside the stamina. | `number`                       |
| `size`         | --              | Size of element in pixels.             | `number`, `"small"`, `"large"` |
| `staminaLabel` | `stamina-label` | Label for the mouseover stamina        | `string`                       |
| `stamina`      | `stamina`       | Stamina in percentage between 0 and 1. | `number`                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
