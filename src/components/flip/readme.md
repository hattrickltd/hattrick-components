# hattrick-flip

Used to display an element with both a front and a back which you can toggle vertically or horizontally.

## Usage

```html
<hattrick-flip direction="x" id="flip">
  <div slot="front">
    This is the front
  </div>
  <div slot="back">
    This is on the back and not visible unless flipped.
  </div>
</hattrick-flip>
```

```js
document.getElementById("flip").flipped = true;
```

## CSS variables

| Variable          | Description                              | Default value |
| ----------------- | -----------------------------------------| ------------- |
| `--flip-height`   | The height of the flip container.        | `100%`        |
| `--flip-width`    | The width of the flip container.         | `100%`        |
| `--flip-duration` | The animation duration to flip the card. | `1s`          |

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                 | Type         | Default     |
| ----------- | ----------- | --------------------------------------------------------------------------- | ------------ | ----------- |
| `direction` | `direction` | If the flip container should rotate horizontally (`x`) or vertically (`y`). | `"x" \| "y"` | `undefined` |
| `flipped`   | `flipped`   | If the container should be flipped (showing back) or not.                   | `boolean`    | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
