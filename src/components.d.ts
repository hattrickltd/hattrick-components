/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  IAvatarImage,
  IAvatarPart,
} from './components/avatar/avatar.interfaces';
import {
  IClockTexts,
} from './components/match-clock/match-clock.interfaces';

export namespace Components {
  interface HattrickAvatar {
    /**
    * Set whether or not the background should be shown.
    */
    'background'?: boolean;
    /**
    * the base route to the avatars, can be either a relative or absolute url.
    */
    'base': string;
    /**
    * Set whether or not the surrounding card should be shown.
    */
    'facecard'?: boolean;
    /**
    * Set this to false to remove the bandages on injured and bruised players.
    */
    'injury'?: boolean;
    /**
    * Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport.
    */
    'lazy'?: boolean;
    /**
    * How soon before the avatar comes into view should we start loading it? Accepts CSS-like margin value.
    */
    'lazyMargin'?: string;
    /**
    * An array (or a JSON formatted string) with the parts that builds up the avatar, or a number to display a silhouette.
    */
    'parts': IAvatarPart[] | number | string;
    /**
    * Prints the images to a canvas. Useful together with `.toDataURL()`. This may be useful for faster loading at a later time.
    * @param images The avatar parts to print. Defaults to the images already loaded by the component.
    * @example const avatar = document.createElement("hattrick-avatar"); avatar.parts = avatarParts; avatar.onload = function (evt) {   const dataUrl = avatar.printToCanvas().toDataURL();   // store in cache for later use? }; document.body.appendChild(avatar);
    * @example <hattrick-avatar parts="..." onload="avatarLoaded.call(this, event.detail)"></hattrick-avatar> function avatarLoaded(images) {   const dataUrl = this.printToCanvas(images).toDataURL(); }
    */
    'printToCanvas': (images?: IAvatarImage[]) => Promise<HTMLCanvasElement>;
    /**
    * Set to true to generate a circular avatar by cutting off the bottom.
    */
    'round'?: boolean;
    /**
    * Set to true to generate a square avatar by cutting off the bottom.
    */
    'square'?: boolean;
  }
  interface HattrickBar {
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
    * The level of the bar.
    */
    'level': number;
    /**
    * The maximum level the bar should show.
    */
    'max': number;
  }
  interface HattrickFlip {
    /**
    * If the flip container should rotate horizontally (`x`) or vertically (`y`).
    */
    'direction': "x" | "y";
    /**
    * If the container should be flipped (showing back) or not.
    */
    'flipped': boolean;
  }
  interface HattrickMatchClock {
    /**
    * How many minutes of added time the match has.
    */
    'addedMinutes': number;
    'countUpFormat': string;
    /**
    * How many minutes break does the match have between first and second half.
    */
    'halftimeBreak': number;
    /**
    * If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.
    */
    'ignoreBreaks': boolean;
    /**
    * At what time the match starts.
    */
    'matchdate': Date | string | number;
    /**
    * How many minutes break does the match have before overtime starts.
    */
    'overtimeBreak': number;
    'pause': () => Promise<void>;
    'resume': () => Promise<void>;
    /**
    * How fast the clock should tick. Defaults to 1. 2 means twice as fast.
    */
    'speed': number;
    /**
    * Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match..
    */
    'texts': IClockTexts;
  }
  interface HattrickPicture {
    'alt': string;
    'src': string;
    'srcset'?: string;
  }
  interface HattrickProgressArc {
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
  interface HattrickRating {
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
  interface HattrickTimer {
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
  interface HattrickTooltip {
    'alwaysShow': boolean;
    /**
    * The position of the arrow. Will be ignored if `position` is not set. `start` will put the arrow to the left or top. `middle` will put the arrow to the middle or center. `end` will put the arrow to the right or bottom.
    */
    'arrow': "start" | "middle" | "end" | "none";
    'close': () => Promise<void>;
    /**
    * The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip.
    */
    'content': string;
    'dir': string;
    'open': (ev?: MouseEvent) => Promise<void>;
    /**
    * Which side of the element the tooltip should be shown. `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
    */
    'position': "top" | "bottom" | "start" | "end" | "cursor";
  }
}

declare global {


  interface HTMLHattrickAvatarElement extends Components.HattrickAvatar, HTMLStencilElement {}
  var HTMLHattrickAvatarElement: {
    prototype: HTMLHattrickAvatarElement;
    new (): HTMLHattrickAvatarElement;
  };

  interface HTMLHattrickBarElement extends Components.HattrickBar, HTMLStencilElement {}
  var HTMLHattrickBarElement: {
    prototype: HTMLHattrickBarElement;
    new (): HTMLHattrickBarElement;
  };

  interface HTMLHattrickFlipElement extends Components.HattrickFlip, HTMLStencilElement {}
  var HTMLHattrickFlipElement: {
    prototype: HTMLHattrickFlipElement;
    new (): HTMLHattrickFlipElement;
  };

  interface HTMLHattrickMatchClockElement extends Components.HattrickMatchClock, HTMLStencilElement {}
  var HTMLHattrickMatchClockElement: {
    prototype: HTMLHattrickMatchClockElement;
    new (): HTMLHattrickMatchClockElement;
  };

  interface HTMLHattrickPictureElement extends Components.HattrickPicture, HTMLStencilElement {}
  var HTMLHattrickPictureElement: {
    prototype: HTMLHattrickPictureElement;
    new (): HTMLHattrickPictureElement;
  };

  interface HTMLHattrickProgressArcElement extends Components.HattrickProgressArc, HTMLStencilElement {}
  var HTMLHattrickProgressArcElement: {
    prototype: HTMLHattrickProgressArcElement;
    new (): HTMLHattrickProgressArcElement;
  };

  interface HTMLHattrickRatingElement extends Components.HattrickRating, HTMLStencilElement {}
  var HTMLHattrickRatingElement: {
    prototype: HTMLHattrickRatingElement;
    new (): HTMLHattrickRatingElement;
  };

  interface HTMLHattrickTimerElement extends Components.HattrickTimer, HTMLStencilElement {}
  var HTMLHattrickTimerElement: {
    prototype: HTMLHattrickTimerElement;
    new (): HTMLHattrickTimerElement;
  };

  interface HTMLHattrickTooltipElement extends Components.HattrickTooltip, HTMLStencilElement {}
  var HTMLHattrickTooltipElement: {
    prototype: HTMLHattrickTooltipElement;
    new (): HTMLHattrickTooltipElement;
  };
  interface HTMLElementTagNameMap {
    'hattrick-avatar': HTMLHattrickAvatarElement;
    'hattrick-bar': HTMLHattrickBarElement;
    'hattrick-flip': HTMLHattrickFlipElement;
    'hattrick-match-clock': HTMLHattrickMatchClockElement;
    'hattrick-picture': HTMLHattrickPictureElement;
    'hattrick-progress-arc': HTMLHattrickProgressArcElement;
    'hattrick-rating': HTMLHattrickRatingElement;
    'hattrick-timer': HTMLHattrickTimerElement;
    'hattrick-tooltip': HTMLHattrickTooltipElement;
  }
}

declare namespace LocalJSX {
  interface HattrickAvatar extends JSXBase.HTMLAttributes<HTMLHattrickAvatarElement> {
    /**
    * Set whether or not the background should be shown.
    */
    'background'?: boolean;
    /**
    * the base route to the avatars, can be either a relative or absolute url.
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
    * Set to false to load the avatar directly, as opposed to loading it when it's visible within the viewport.
    */
    'lazy'?: boolean;
    /**
    * How soon before the avatar comes into view should we start loading it? Accepts CSS-like margin value.
    */
    'lazyMargin'?: string;
    /**
    * Let you know when the avatar has finished loading. An array of the images loaded will be provided in the `event.detail`. Real type is `EventEmitter<Array<IAvatarImage>>`, but for TypeScript < 2.7 it needs to be generic.
    * @example ``` <hattrick-avatar onload="avatarLoaded.call(this, event.detail)"></ht-avatar>  avatarLoaded(images) {   console.log("dataUrl: ", this.printToCanvas(images).toDataURL()); } ```
    */
    'onLoad'?: (event: CustomEvent<any>) => void;
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
  interface HattrickBar extends JSXBase.HTMLAttributes<HTMLHattrickBarElement> {
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
    * The level of the bar.
    */
    'level'?: number;
    /**
    * The maximum level the bar should show.
    */
    'max'?: number;
  }
  interface HattrickFlip extends JSXBase.HTMLAttributes<HTMLHattrickFlipElement> {
    /**
    * If the flip container should rotate horizontally (`x`) or vertically (`y`).
    */
    'direction'?: "x" | "y";
    /**
    * If the container should be flipped (showing back) or not.
    */
    'flipped'?: boolean;
  }
  interface HattrickMatchClock extends JSXBase.HTMLAttributes<HTMLHattrickMatchClockElement> {
    /**
    * How many minutes of added time the match has.
    */
    'addedMinutes'?: number;
    'countUpFormat'?: string;
    /**
    * How many minutes break does the match have between first and second half.
    */
    'halftimeBreak'?: number;
    /**
    * If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false.
    */
    'ignoreBreaks'?: boolean;
    /**
    * At what time the match starts.
    */
    'matchdate'?: Date | string | number;
    /**
    * How many minutes break does the match have before overtime starts.
    */
    'overtimeBreak'?: number;
    /**
    * How fast the clock should tick. Defaults to 1. 2 means twice as fast.
    */
    'speed'?: number;
    /**
    * Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match..
    */
    'texts'?: IClockTexts;
  }
  interface HattrickPicture extends JSXBase.HTMLAttributes<HTMLHattrickPictureElement> {
    'alt'?: string;
    'src'?: string;
    'srcset'?: string;
  }
  interface HattrickProgressArc extends JSXBase.HTMLAttributes<HTMLHattrickProgressArcElement> {
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
  interface HattrickRating extends JSXBase.HTMLAttributes<HTMLHattrickRatingElement> {
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
  interface HattrickTimer extends JSXBase.HTMLAttributes<HTMLHattrickTimerElement> {
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
  interface HattrickTooltip extends JSXBase.HTMLAttributes<HTMLHattrickTooltipElement> {
    'alwaysShow'?: boolean;
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

  interface IntrinsicElements {
    'hattrick-avatar': HattrickAvatar;
    'hattrick-bar': HattrickBar;
    'hattrick-flip': HattrickFlip;
    'hattrick-match-clock': HattrickMatchClock;
    'hattrick-picture': HattrickPicture;
    'hattrick-progress-arc': HattrickProgressArc;
    'hattrick-rating': HattrickRating;
    'hattrick-timer': HattrickTimer;
    'hattrick-tooltip': HattrickTooltip;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


