# hattrick-progress-arc

This is a Stencil fork of [angular-progress-arc](https://github.com/jesujcastillom/angular-progress-arc) (thanks to [jesujcastillom](https://github.com/jesujcastillom)), used to display circular progress meters, or in Hattrick used to display stamina.


## CSS variables

| Variable       | Description       | Default value |
| -------------- | ----------------- | ------------- |
| <nobr>--progress-arc-stroke-width</nobr>  | Thickness of the circle. | 8px |
| <nobr>--progress-arc-color</nobr>  | Color of the arc. | #00aa00 |
| <nobr>--progress-arc-rest-color</nobr>  | Color of the remaining part to complete the circle. | transparent |

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                    | Type      |
| ------------------ | ------------------- | -------------------------------------------------------------- | --------- |
| `complete`         | `complete`          | Expression evaluating to float [0.0, 1.0]                      | `number`  |
| `counterClockwise` | `counter-clockwise` | Indicating if the progress should instead be counter clockwise | `boolean` |
| `size`             | `size`              | Size of element in pixels.                                     | `number`  |
| `strokeWidth`      | `stroke-width`      | Width of progress arc stroke.                                  | `number`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
