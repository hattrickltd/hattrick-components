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

#### --rating-background: #FFFFFF;

The background color.

#### --rating-color: #666666;

The text color.

#### --rating-font-weight: bold;

The font-weight.

#### --rating-stamina-arc-very-low: #DD4140;

Color of the stamina bar when below 25%.

#### --rating-stamina-arc-low: #F5A104;

Color of the stamina bar when between 25% and 49%.

#### --rating-stamina-arc-high: #F1C40A;

Color of the stamina bar when below 50% and 74%.

#### --rating-stamina-arc-very-high: #31A94B;

Color of the stamina bar when above 75%.

#### --rating-stamina-arc-rest: #CCCCCC;

The color of the remaining part to complete the circle.


<!-- Auto Generated Below -->


## Properties

#### rating

number

The rating to show inside the stamina.


#### size

"large" | "small" | number

Size of element in pixels. `large` is equivalent to `44`, `small` is equivalent to `29`. Note however that a numberic value doesn't automatically adjust font sizes and progress-arc size. You have to manually set <code>font-size</code> and <code>--progress-arc-stroke-width</code>.


#### stamina

number

Stamina in percentage between 0 and 1.


#### staminaLabel

string

Label for the mouseover stamina


## Attributes

#### rating

number

The rating to show inside the stamina.


#### size

"large" | "small" | number

Size of element in pixels. `large` is equivalent to `44`, `small` is equivalent to `29`. Note however that a numberic value doesn't automatically adjust font sizes and progress-arc size. You have to manually set <code>font-size</code> and <code>--progress-arc-stroke-width</code>.


#### stamina

number

Stamina in percentage between 0 and 1.


#### stamina-label

string

Label for the mouseover stamina



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
