/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  IAvatarImage,
  IAvatarPart,
} from './components/avatar/avatar';
import {
  EventEmitter,
} from '@stencil/core';

declare global {

  namespace StencilComponents {
    interface HtAvatar {
      /**
       * Set whether or not the background should be shown. 
       */
      'background': boolean;
      /**
       * the base route to the avatars, can be either a relative or absolute url 
       */
      'base': string;
      /**
       * Set whether or not the surrounding card should be shown. 
       */
      'facecard': boolean;
      /**
       * Set this to false to remove the bandages on injured and bruised players. 
       */
      'injury': boolean;
      /**
       * Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport 
       */
      'lazy': boolean;
      /**
       * An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette. 
       */
      'parts': IAvatarPart[] | number | string;
      'printToCanvas': (images?: IAvatarImage[]) => HTMLCanvasElement;
      /**
       * Set to true to generate a circular avatar by cutting off the bottom. 
       */
      'round': boolean;
      /**
       * Set to true to generate a square avatar by cutting off the bottom. 
       */
      'square': boolean;
    }
  }

  interface HTMLHtAvatarElement extends StencilComponents.HtAvatar, HTMLStencilElement {}

  var HTMLHtAvatarElement: {
    prototype: HTMLHtAvatarElement;
    new (): HTMLHtAvatarElement;
  };
  interface HTMLElementTagNameMap {
    'ht-avatar': HTMLHtAvatarElement;
  }
  interface ElementTagNameMap {
    'ht-avatar': HTMLHtAvatarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-avatar': JSXElements.HtAvatarAttributes;
    }
  }
  namespace JSXElements {
    export interface HtAvatarAttributes extends HTMLAttributes {
      /**
       * Set whether or not the background should be shown. 
       */
      'background'?: boolean;
      /**
       * the base route to the avatars, can be either a relative or absolute url 
       */
      'base'?: string;
      /**
       * Set whether or not the surrounding card should be shown. 
       */
      'facecard'?: boolean;
      /**
       * Set this to false to remove the bandages on injured and bruised players. 
       */
      'injury'?: boolean;
      /**
       * Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport 
       */
      'lazy'?: boolean;
      'onLoad'?: (event: CustomEvent<Array<IAvatarImage>>) => void;
      /**
       * An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette. 
       */
      'parts'?: IAvatarPart[] | number | string;
      /**
       * Set to true to generate a circular avatar by cutting off the bottom. 
       */
      'round'?: boolean;
      /**
       * Set to true to generate a square avatar by cutting off the bottom. 
       */
      'square'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtBar {
      /**
       * If there's a max before the end of the bar (e.g. maxed youth skill). 
       */
      'cap': number;
      /**
       * The denomination of the skill level 
       */
      'denomination': string;
      'hideContent': boolean;
      /**
       * If the sublevel is the same as the levelCap. 
       */
      'isCap': boolean;
      /**
       * The label shown inside the bar 
       */
      'label': string;
      /**
       * Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport 
       */
      'lazy': boolean;
      /**
       * The level of the bar. 
       */
      'level': number;
      /**
       * The maximum level the bar should show. 
       */
      'max': number;
    }
  }

  interface HTMLHtBarElement extends StencilComponents.HtBar, HTMLStencilElement {}

  var HTMLHtBarElement: {
    prototype: HTMLHtBarElement;
    new (): HTMLHtBarElement;
  };
  interface HTMLElementTagNameMap {
    'ht-bar': HTMLHtBarElement;
  }
  interface ElementTagNameMap {
    'ht-bar': HTMLHtBarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-bar': JSXElements.HtBarAttributes;
    }
  }
  namespace JSXElements {
    export interface HtBarAttributes extends HTMLAttributes {
      /**
       * If there's a max before the end of the bar (e.g. maxed youth skill). 
       */
      'cap'?: number;
      /**
       * The denomination of the skill level 
       */
      'denomination'?: string;
      'hideContent'?: boolean;
      /**
       * If the sublevel is the same as the levelCap. 
       */
      'isCap'?: boolean;
      /**
       * The label shown inside the bar 
       */
      'label'?: string;
      /**
       * Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport 
       */
      'lazy'?: boolean;
      /**
       * The level of the bar. 
       */
      'level'?: number;
      /**
       * The maximum level the bar should show. 
       */
      'max'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtFlip {
      'direction': "x" | "y";
      'flipped': boolean;
    }
  }

  interface HTMLHtFlipElement extends StencilComponents.HtFlip, HTMLStencilElement {}

  var HTMLHtFlipElement: {
    prototype: HTMLHtFlipElement;
    new (): HTMLHtFlipElement;
  };
  interface HTMLElementTagNameMap {
    'ht-flip': HTMLHtFlipElement;
  }
  interface ElementTagNameMap {
    'ht-flip': HTMLHtFlipElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-flip': JSXElements.HtFlipAttributes;
    }
  }
  namespace JSXElements {
    export interface HtFlipAttributes extends HTMLAttributes {
      'direction'?: "x" | "y";
      'flipped'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtProgressArc {
      /**
       * Expression evaluating to float [0.0, 1.0] 
       */
      'complete': number;
      /**
       * Indicating if the progress should instead be counter clockwise 
       */
      'counterClockwise': boolean;
      /**
       * Size of element in pixels. 
       */
      'size': number;
      /**
       * Width of progress arc stroke. 
       */
      'strokeWidth': number;
    }
  }

  interface HTMLHtProgressArcElement extends StencilComponents.HtProgressArc, HTMLStencilElement {}

  var HTMLHtProgressArcElement: {
    prototype: HTMLHtProgressArcElement;
    new (): HTMLHtProgressArcElement;
  };
  interface HTMLElementTagNameMap {
    'ht-progress-arc': HTMLHtProgressArcElement;
  }
  interface ElementTagNameMap {
    'ht-progress-arc': HTMLHtProgressArcElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-progress-arc': JSXElements.HtProgressArcAttributes;
    }
  }
  namespace JSXElements {
    export interface HtProgressArcAttributes extends HTMLAttributes {
      /**
       * Expression evaluating to float [0.0, 1.0] 
       */
      'complete'?: number;
      /**
       * Indicating if the progress should instead be counter clockwise 
       */
      'counterClockwise'?: boolean;
      /**
       * Size of element in pixels. 
       */
      'size'?: number;
      /**
       * Width of progress arc stroke. 
       */
      'strokeWidth'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtRating {
      /**
       * The rating to show inside the stamina. 
       */
      'rating': number;
      /**
       * Size of element in pixels. 
       */
      'size': number | "small" | "large";
      /**
       * Stamina in percentage between 0 and 1. 
       */
      'stamina': number;
      /**
       * Label for the mouseover stamina 
       */
      'staminaLabel': string;
    }
  }

  interface HTMLHtRatingElement extends StencilComponents.HtRating, HTMLStencilElement {}

  var HTMLHtRatingElement: {
    prototype: HTMLHtRatingElement;
    new (): HTMLHtRatingElement;
  };
  interface HTMLElementTagNameMap {
    'ht-rating': HTMLHtRatingElement;
  }
  interface ElementTagNameMap {
    'ht-rating': HTMLHtRatingElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-rating': JSXElements.HtRatingAttributes;
    }
  }
  namespace JSXElements {
    export interface HtRatingAttributes extends HTMLAttributes {
      /**
       * The rating to show inside the stamina. 
       */
      'rating'?: number;
      /**
       * Size of element in pixels. 
       */
      'size'?: number | "small" | "large";
      /**
       * Stamina in percentage between 0 and 1. 
       */
      'stamina'?: number;
      /**
       * Label for the mouseover stamina 
       */
      'staminaLabel'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtTimer {
      /**
       * The string for `days` which is used if the deadline is more than 72 hours away. 
       */
      'daysText': string;
      /**
       * At what time should the clock reach 00:00:00. 
       */
      'deadline': Date | string | number;
      /**
       * If the timer should start counting upwards again after reaching 0. 
       */
      'keepCounting': boolean;
      /**
       * After how many hours should it start showing _x days_. Change text via the `daysText` property. 
       */
      'maxHours': number;
    }
  }

  interface HTMLHtTimerElement extends StencilComponents.HtTimer, HTMLStencilElement {}

  var HTMLHtTimerElement: {
    prototype: HTMLHtTimerElement;
    new (): HTMLHtTimerElement;
  };
  interface HTMLElementTagNameMap {
    'ht-timer': HTMLHtTimerElement;
  }
  interface ElementTagNameMap {
    'ht-timer': HTMLHtTimerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-timer': JSXElements.HtTimerAttributes;
    }
  }
  namespace JSXElements {
    export interface HtTimerAttributes extends HTMLAttributes {
      /**
       * The string for `days` which is used if the deadline is more than 72 hours away. 
       */
      'daysText'?: string;
      /**
       * At what time should the clock reach 00:00:00. 
       */
      'deadline'?: Date | string | number;
      /**
       * If the timer should start counting upwards again after reaching 0. 
       */
      'keepCounting'?: boolean;
      /**
       * After how many hours should it start showing _x days_. Change text via the `daysText` property. 
       */
      'maxHours'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface HtTooltip {
      /**
       * The position of the arrow. Will be ignored if `position` is not set. `start` will put the arrow to the left or top. `middle` will put the arrow to the middle or center. `end` will put the arrow to the right or bottom.
       */
      'arrow': "start" | "middle" | "end" | "none";
      /**
       * The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip. 
       */
      'content': string;
      'dir': string;
      /**
       * Which side of the element the tooltip should be shown. `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
       */
      'position': "top" | "bottom" | "start" | "end" | "cursor";
    }
  }

  interface HTMLHtTooltipElement extends StencilComponents.HtTooltip, HTMLStencilElement {}

  var HTMLHtTooltipElement: {
    prototype: HTMLHtTooltipElement;
    new (): HTMLHtTooltipElement;
  };
  interface HTMLElementTagNameMap {
    'ht-tooltip': HTMLHtTooltipElement;
  }
  interface ElementTagNameMap {
    'ht-tooltip': HTMLHtTooltipElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ht-tooltip': JSXElements.HtTooltipAttributes;
    }
  }
  namespace JSXElements {
    export interface HtTooltipAttributes extends HTMLAttributes {
      /**
       * The position of the arrow. Will be ignored if `position` is not set. `start` will put the arrow to the left or top. `middle` will put the arrow to the middle or center. `end` will put the arrow to the right or bottom.
       */
      'arrow'?: "start" | "middle" | "end" | "none";
      /**
       * The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip. 
       */
      'content'?: string;
      'dir'?: string;
      /**
       * Which side of the element the tooltip should be shown. `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
       */
      'position'?: "top" | "bottom" | "start" | "end" | "cursor";
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;