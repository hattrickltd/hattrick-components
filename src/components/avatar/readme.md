# hattrick-avatar

Displays an avatar from a JSON array of parts.

Example avatar
```js
const avatarParts = [{
		"url": "backgrounds/bg_blue_int.png",
		"x": 9,
		"y": 10
	}, {
		"url": "//res.hattrick.org/kits/17/167/1664/1663296/body12.png",
		"x": 9,
		"y": 10
	}, {
		"url": "faces/f4h.png",
		"x": 9,
		"y": 10
	}, {
		"url": "eyes/e34c.png",
		"x": 25,
		"y": 16
	}, {
		"url": "mouths/m5c.png",
		"x": 29,
		"y": 66
	}, {
		"url": "noses/n3.png",
		"x": 20,
		"y": 27
	}, {
		"url": "hair/f4h6f.png",
		"x": 9,
		"y": 10
	}
];
```

## Usage

```js
// this will create 7 avatars with various configurations
[
  {}, // default
  { facecard: false },
  { facecard: false, background: false },
  { facecard: false, square: true },
  { facecard: false, square: true, background: false },
  { facecard: false, round: true },
  { facecard: false, round: true, background: false },
].forEach(function (config) {
  const avatar = document.createElement("hattrick-avatar");
  avatar.parts = avatarParts;
  Object.assign(avatar, config);
  avatarHolder.appendChild(avatar);
});
```

Additionally, you can create silhouettes by settings `avatar.parts` to a number. In Hattrick the silhouettes are based on the face type shown as `f1`-`f9` in the faces url. The number represents the number that should be set in `avatar.parts`. E.g. in the example avatar parts above, you would use `avatar.parts = 4`. If neither parts nor a number is provided, a random silhouette will be shown.

## CSS variables

#### --avatar-size: 1;

A decimal value between 0 and 1 allows you to dynamically change the size of the avatar. Technically you could use a value larger than 1, but the avatars doesn't scale well above their original size.

<!-- Auto Generated Below -->


## Properties

#### background

boolean

Set whether or not the background should be shown.


#### base

string

the base route to the avatars, can be either a relative or absolute url


#### facecard

boolean

Set whether or not the surrounding card should be shown.


#### injury

boolean

Set this to false to remove the bandages on injured and bruised players.


#### parts

`{ url: string; x: number; y: number; }[]` | number | string

An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette.


#### round

boolean

Set to true to generate a circular avatar by cutting off the bottom.


#### square

boolean

Set to true to generate a square avatar by cutting off the bottom.


## Attributes

#### background

boolean

Set whether or not the background should be shown.


#### base

string

the base route to the avatars, can be either a relative or absolute url


#### facecard

boolean

Set whether or not the surrounding card should be shown.


#### injury

boolean

Set this to false to remove the bandages on injured and bruised players.


#### parts

`{ url: string; x: number; y: number; }[]` | number | string

An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette.


#### round

boolean

Set to true to generate a circular avatar by cutting off the bottom.


#### square

boolean

Set to true to generate a square avatar by cutting off the bottom.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
