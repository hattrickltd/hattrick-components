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

#### --flip-height: auto;

The height of the flip container. **Highly recommended for `direction="x"`.**

#### --flip-width: auto;

The width of the flip container. **Highly recommended for `direction="y"`.**

#### --flip-duration: 1s;

The animation duration to flip the card.


<!-- Auto Generated Below -->


## Properties

#### direction

"x" | "y"

If the container should rotate horizontally (`x`) or vertically (`y`).


#### flipped

boolean

If the container should be flipped.


## Attributes

#### direction

"x" | "y"

If the container should rotate horizontally (`x`) or vertically (`y`).


#### flipped

boolean

If the container should be flipped.

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
