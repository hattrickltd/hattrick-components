/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  IAvatarPart,
} from './components/avatar/avatar';

declare global {

  namespace StencilComponents {
    interface HtAvatar {
      /**
       * Set whether or not the background should be shown. 
       */
      'background': boolean;
      /**
       * Set whether or not the surrounding card should be shown. 
       */
      'facecard': boolean;
      /**
       * Set this to false to remove the bandages on injured and bruised players. 
       */
      'injury': boolean;
      /**
       * An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette. 
       */
      'parts': IAvatarPart[] | number | string;
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
       * Set whether or not the surrounding card should be shown. 
       */
      'facecard'?: boolean;
      /**
       * Set this to false to remove the bandages on injured and bruised players. 
       */
      'injury'?: boolean;
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
      /**
       * If the sublevel is the same as the levelCap. 
       */
      'isCap': boolean;
      /**
       * The label shown inside the bar 
       */
      'label': string;
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
      /**
       * If the sublevel is the same as the levelCap. 
       */
      'isCap'?: boolean;
      /**
       * The label shown inside the bar 
       */
      'label'?: string;
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

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;