# ht-tooltip

Inspired by [ngx-charts tooltips](https://github.com/swimlane/ngx-charts) this provides a relatively customizable tooltip for custom mouseover titles that also supports HTML.

## Usage

```html
<ht-tooltip position="right" arrow="middle" content="Here's pure text tooltip">
  Mouseover me for a tooltip!
</ht-tooltip>

<ht-tooltip position="right" arrow="middle">
  <any slot="content"><b>Use</b> <pre>slot="content"</pre> <i>for</i> <u>HTML</u></any>
  <img src="random-image.png" alt="You still want an alt, but no title!" />
</ht-tooltip>
```

## CSS variables

#### --tooltip-background: rgba(0, 0, 0, .75);

Background of the tooltip.

#### --tooltip-color: white;

Text color in the tooltip.

#### --tooltip-font-size: 12px;

Font size in the tooltip.

#### --tooltip-border: 0;

Set a border on the tooltip, e.g. `--tooltip-border: 1px solid #767676;`

#### --tooltip-padding: 5px 10px;

Padding in the tooltip.

#### --tooltip-box-shadow: none;

Set a box-shadow on the tooltip, e.g. `4px 4px 2px -3px #767676`

#### --tooltip-max-width: 400px;

Maximum width before wrapping.

#### --tooltop-arrow-size: 7px;

The size of the arrow.

#### --tooltop-border-radius: 3px;

Border radius of the tooltip.

#### --tooltip-pointer-events: none;

If you want to be able to select text in the tooltip, you can change the pointer-events which is disabled by default by setting for example: `--tooltip-pointer-events: all;`.

#### --tooltip-delay: 0s;

If you want a short delay before the tooltip shows up, e.g. `--tooltip-delay: 300ms;`.


<!-- Auto Generated Below -->


## Properties

#### arrow

string

The position of the arrow. Will be ignored if `position` is not set. Defaults to `none`.

Possible values:
* `start` will put the arrow to the left or top.
* `middle` will put the arrow to the middle or center.
* `end` will put the arrow to the right or bottom.
* `none` will remove the arrow.


#### content

string

The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip.


#### dir

string

direction, if omitted the component will calculate itself


#### position

string

Which side of the element the tooltip should be shown. Defaults to `cursor`. Using `cursor` will also disable animations.

Possible values:
* `top` above the container
* `bottom` below the container
* `start` to the left of the container in LTR, right in RTL.
* `end` to the right of the container in LTR, left in RTL.
* `cursor` will put it approximately below the cursor.

## Attributes

#### arrow

string

The position of the arrow. Will be ignored if `position` is not set. Defaults to `none`.
Possible values:
* `start` will put the arrow to the left or top.
* `middle` will put the arrow to the middle or center.
* `end` will put the arrow to the right or bottom.
* `none` will remove the arrow.


#### content

string

The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip.


#### dir

string

direction, if omitted the component will calculate itself


#### position

string

Which side of the element the tooltip should be shown.
Defaults to `cursor`. Using `cursor` will also disable animations.

Possible values:
* `top` above the container
* `bottom` below the container
* `start` to the left of the container in LTR, right in RTL.
* `end` to the right of the container in LTR, left in RTL.
* `cursor` will put it approximately below the cursor. 

#### no-animate

Add this attribute to disable animations.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
