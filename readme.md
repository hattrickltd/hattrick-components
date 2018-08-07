![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Hattrick Components

This project contains a bunch of web components that we use on [Hattrick.org](https://www.hattrick.org) and [Hattrick Mobile](https://m.hattrick.org/). However, all of these components works independently of Hattrick, so if you want to use them on your site as well, go right ahead!


## Using Hattrick Components

### Script tag

- Put a script tag like this (with the correct version) `<script src="https://unpkg.com/hattrick-components@1.0.0/dist/hattrick-components.js"></script>` in the head of your index.html.
- Then you can use the element anywhere in your template, JSX, html etc.

### Node Modules
- Run `npm install hattrick-components --save`.
- Put a script tag similar to this `<script src="node_modules/hattrick-components/dist/hattrick-components.js"></script>` in the head of your index.html.
- Then you can use the element anywhere in your template, JSX, html etc.

>If you're using these components in Angular, don't forget to add `schemas: [CUSTOM_ELEMENTS_SCHEMA]` to your `@NgModule`.


## Available components

These are the currently available Hattrick Components. For more details on how to use each component, see the respective readme.md linked in the table below.


| **Component** | **Description** |
| ------------- | ------------- |
| [Avatar](/src/components/avatar/) | Used to display avatar in various styles by providing a JSON representation of the avatar parts. |
| [Bar](/src/components/bar/) | Used to display various bars, e.g. skill bars or formation experiences (not to be mistaken with sliders!). |
| [Flip](/src/components/flip/) | Used to display an element with both a front and a back which you can toggle vertically or horizontally. |
| [Progress-arc](/src/components/progress-arc/) | Used to display circular progress meters, or in Hattrick used to display stamina. |
| [Rating](/src/components/rating/) | Used to display a Hattrick rating. Uses [progress-arc](/src/components/progress-arc/) to display stamina. |
| [Timer](/src/components/timer/) | A simple timer to display hh:mm:ss, optionally it can also start counting upwards if the deadline has passed, making it useful also as a match clock. |
| [Tooltip](/src/components/tooltip/) | Provides a relatively customizable tooltip for custom mouseover titles that also supports HTML. |


## Hattrick Components <3 Stencil

Hattrick Components is built using [Stencil](https://github.com/ionic-team/stencil).

> Stencil is a compiler for building fast web apps using Web Components.
>
> Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.
>
> Stencil components are just Web Components, so they work in any major framework or with no framework at all. 
