/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone, NgModule } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from '@hattrickltd/hattrick-components/components';

import { defineCustomElement as defineHattrickArena } from '@hattrickltd/hattrick-components/components/hattrick-arena.js';
import { defineCustomElement as defineHattrickAvatar } from '@hattrickltd/hattrick-components/components/hattrick-avatar.js';
import { defineCustomElement as defineHattrickBar } from '@hattrickltd/hattrick-components/components/hattrick-bar.js';
import { defineCustomElement as defineHattrickField } from '@hattrickltd/hattrick-components/components/hattrick-field.js';
import { defineCustomElement as defineHattrickFlag } from '@hattrickltd/hattrick-components/components/hattrick-flag.js';
import { defineCustomElement as defineHattrickFlip } from '@hattrickltd/hattrick-components/components/hattrick-flip.js';
import { defineCustomElement as defineHattrickMatchArena } from '@hattrickltd/hattrick-components/components/hattrick-match-arena.js';
import { defineCustomElement as defineHattrickMatchClock } from '@hattrickltd/hattrick-components/components/hattrick-match-clock.js';
import { defineCustomElement as defineHattrickMl } from '@hattrickltd/hattrick-components/components/hattrick-ml.js';
import { defineCustomElement as defineHattrickPicture } from '@hattrickltd/hattrick-components/components/hattrick-picture.js';
import { defineCustomElement as defineHattrickPlayer } from '@hattrickltd/hattrick-components/components/hattrick-player.js';
import { defineCustomElement as defineHattrickPlayoffTree } from '@hattrickltd/hattrick-components/components/hattrick-playoff-tree.js';
import { defineCustomElement as defineHattrickProgressArc } from '@hattrickltd/hattrick-components/components/hattrick-progress-arc.js';
import { defineCustomElement as defineHattrickRange } from '@hattrickltd/hattrick-components/components/hattrick-range.js';
import { defineCustomElement as defineHattrickRating } from '@hattrickltd/hattrick-components/components/hattrick-rating.js';
import { defineCustomElement as defineHattrickReactions } from '@hattrickltd/hattrick-components/components/hattrick-reactions.js';
import { defineCustomElement as defineHattrickTimer } from '@hattrickltd/hattrick-components/components/hattrick-timer.js';
import { defineCustomElement as defineHattrickTooltip } from '@hattrickltd/hattrick-components/components/hattrick-tooltip.js';
@ProxyCmp({
  defineCustomElementFn: defineHattrickArena,
  inputs: ['arenaId', 'arenaImageType', 'capacity', 'forceUploadReload', 'resourceUrl', 'weather']
})
@Component({
  selector: 'hattrick-arena',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'arenaId', required: true }, 'arenaImageType', 'capacity', 'forceUploadReload', 'resourceUrl', 'weather'],
  standalone: false
})
export class HattrickArena {
  protected el: HTMLHattrickArenaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickArena],
  exports: [HattrickArena]
})
export class HattrickArenaModule { }


export declare interface HattrickArena extends Components.HattrickArena {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickAvatar,
  inputs: ['background', 'base', 'composed', 'facecard', 'injury', 'kitId', 'lazy', 'lazyMargin', 'parts', 'round', 'square'],
  methods: ['printToCanvas']
})
@Component({
  selector: 'hattrick-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'base', 'composed', 'facecard', 'injury', 'kitId', 'lazy', 'lazyMargin', 'parts', 'round', 'square'],
  outputs: ['load'],
  standalone: false
})
export class HattrickAvatar {
  protected el: HTMLHattrickAvatarElement;
  @Output() load = new EventEmitter<CustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickAvatar],
  exports: [HattrickAvatar]
})
export class HattrickAvatarModule { }


export declare interface HattrickAvatar extends Components.HattrickAvatar {
  /**
   * Let you know when the avatar has finished loading.
An array of the images loaded will be provided in the `event.detail`.
Real type is `EventEmitter<Array<IAvatarImage>>`, but for TypeScript < 2.7 it needs to be generic. @example ```
<hattrick-avatar onload="avatarLoaded.call(this, event.detail)"></ht-avatar>

avatarLoaded(images) {
  console.log("dataUrl: ", this.printToCanvas(images).toDataURL());
}
```
   */
  load: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  defineCustomElementFn: defineHattrickBar,
  inputs: ['cap', 'denomination', 'isCap', 'level', 'max']
})
@Component({
  selector: 'hattrick-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cap', 'denomination', 'isCap', 'level', 'max'],
  standalone: false
})
export class HattrickBar {
  protected el: HTMLHattrickBarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickBar],
  exports: [HattrickBar]
})
export class HattrickBarModule { }


export declare interface HattrickBar extends Components.HattrickBar {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickField,
  inputs: ['flipped', 'ratingNoStar', 'ratingPositions', 'size', 'trainingPositions']
})
@Component({
  selector: 'hattrick-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['flipped', 'ratingNoStar', 'ratingPositions', 'size', 'trainingPositions'],
  standalone: false
})
export class HattrickField {
  protected el: HTMLHattrickFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickField],
  exports: [HattrickField]
})
export class HattrickFieldModule { }


export declare interface HattrickField extends Components.HattrickField {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickFlag,
  inputs: ['leagueId']
})
@Component({
  selector: 'hattrick-flag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['leagueId'],
  standalone: false
})
export class HattrickFlag {
  protected el: HTMLHattrickFlagElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickFlag],
  exports: [HattrickFlag]
})
export class HattrickFlagModule { }


export declare interface HattrickFlag extends Components.HattrickFlag {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickFlip,
  inputs: ['direction', 'flipped']
})
@Component({
  selector: 'hattrick-flip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['direction', 'flipped'],
  standalone: false
})
export class HattrickFlip {
  protected el: HTMLHattrickFlipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickFlip],
  exports: [HattrickFlip]
})
export class HattrickFlipModule { }


export declare interface HattrickFlip extends Components.HattrickFlip {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickMatchArena,
  inputs: ['amount', 'arenaId', 'awayColor', 'capacity', 'forceUploadReload', 'homeColor', 'resourceUrl']
})
@Component({
  selector: 'hattrick-match-arena',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['amount', { name: 'arenaId', required: true }, 'awayColor', 'capacity', 'forceUploadReload', 'homeColor', 'resourceUrl'],
  standalone: false
})
export class HattrickMatchArena {
  protected el: HTMLHattrickMatchArenaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickMatchArena],
  exports: [HattrickMatchArena]
})
export class HattrickMatchArenaModule { }


export declare interface HattrickMatchArena extends Components.HattrickMatchArena {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickMatchClock,
  inputs: ['addedMinutes', 'countUpFormat', 'finishedDate', 'halftimeBreak', 'ignoreBreaks', 'matchdate', 'overtimeBreak', 'skipPauseTimers', 'speed', 'texts'],
  methods: ['pause', 'resume']
})
@Component({
  selector: 'hattrick-match-clock',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['addedMinutes', 'countUpFormat', 'finishedDate', 'halftimeBreak', 'ignoreBreaks', 'matchdate', 'overtimeBreak', 'skipPauseTimers', 'speed', 'texts'],
  standalone: false
})
export class HattrickMatchClock {
  protected el: HTMLHattrickMatchClockElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickMatchClock],
  exports: [HattrickMatchClock]
})
export class HattrickMatchClockModule { }


export declare interface HattrickMatchClock extends Components.HattrickMatchClock {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickMl,
  inputs: ['allowCustomContent', 'base', 'currencyName', 'currencyRate', 'internalLinkTarget', 'spoilerText', 'text']
})
@Component({
  selector: 'hattrick-ml',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowCustomContent', 'base', 'currencyName', 'currencyRate', 'internalLinkTarget', 'spoilerText', 'text'],
  standalone: false
})
export class HattrickMl {
  protected el: HTMLHattrickMlElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickMl],
  exports: [HattrickMl]
})
export class HattrickMlModule { }


export declare interface HattrickMl extends Components.HattrickMl {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickPicture,
  inputs: ['alt', 'lazyMargin', 'src', 'srcset']
})
@Component({
  selector: 'hattrick-picture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'lazyMargin', 'src', 'srcset'],
  standalone: false
})
export class HattrickPicture {
  protected el: HTMLHattrickPictureElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickPicture],
  exports: [HattrickPicture]
})
export class HattrickPictureModule { }


export declare interface HattrickPicture extends Components.HattrickPicture {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickPlayer,
  inputs: ['avatarSet', 'countryId', 'debounce', 'hideNumbersAfterDenominations', 'languageId', 'playerId', 'skillPresentation', 'token'],
  methods: ['show', 'hide']
})
@Component({
  selector: 'hattrick-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['avatarSet', 'countryId', 'debounce', 'hideNumbersAfterDenominations', 'languageId', 'playerId', 'skillPresentation', 'token'],
  standalone: false
})
export class HattrickPlayer {
  protected el: HTMLHattrickPlayerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickPlayer],
  exports: [HattrickPlayer]
})
export class HattrickPlayerModule { }


export declare interface HattrickPlayer extends Components.HattrickPlayer {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickPlayoffTree,
  inputs: ['baseUrl', 'bracket', 'estimateNextRound', 'expand', 'fromRound', 'hideCollapsedLive', 'hideCollapsedNames', 'links', 'matchRoundsBeforePlayoff', 'navControls', 'playoff', 'pyjamas', 'showRounds', 'texts'],
  methods: ['forceUpdate']
})
@Component({
  selector: 'hattrick-playoff-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['baseUrl', 'bracket', 'estimateNextRound', 'expand', 'fromRound', 'hideCollapsedLive', 'hideCollapsedNames', 'links', 'matchRoundsBeforePlayoff', 'navControls', 'playoff', 'pyjamas', 'showRounds', 'texts'],
  standalone: false
})
export class HattrickPlayoffTree {
  protected el: HTMLHattrickPlayoffTreeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickPlayoffTree],
  exports: [HattrickPlayoffTree]
})
export class HattrickPlayoffTreeModule { }


export declare interface HattrickPlayoffTree extends Components.HattrickPlayoffTree {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickProgressArc,
  inputs: ['angle', 'circumference', 'complete', 'counterClockwise', 'size']
})
@Component({
  selector: 'hattrick-progress-arc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['angle', 'circumference', 'complete', 'counterClockwise', 'size'],
  standalone: false
})
export class HattrickProgressArc {
  protected el: HTMLHattrickProgressArcElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickProgressArc],
  exports: [HattrickProgressArc]
})
export class HattrickProgressArcModule { }


export declare interface HattrickProgressArc extends Components.HattrickProgressArc {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickRange,
  inputs: ['debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'snaps', 'step', 'ticks', 'value']
})
@Component({
  selector: 'hattrick-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['debounce', 'disabled', 'dualKnobs', 'max', 'min', 'name', 'pin', 'snaps', 'step', 'ticks', 'value'],
  outputs: ['ionChange', 'ionFocus', 'ionBlur'],
  standalone: false
})
export class HattrickRange {
  protected el: HTMLHattrickRangeElement;
  @Output() ionChange = new EventEmitter<CustomEvent<IHattrickRangeRangeChangeEventDetail>>();
  @Output() ionFocus = new EventEmitter<CustomEvent<void>>();
  @Output() ionBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickRange],
  exports: [HattrickRange]
})
export class HattrickRangeModule { }


import type { RangeChangeEventDetail as IHattrickRangeRangeChangeEventDetail } from '@hattrickltd/hattrick-components/components';

export declare interface HattrickRange extends Components.HattrickRange {
  /**
   * Emitted when the value property has changed.
   */
  ionChange: EventEmitter<CustomEvent<IHattrickRangeRangeChangeEventDetail>>;
  /**
   * Emitted when the range has focus.
   */
  ionFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the range loses focus.
   */
  ionBlur: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineHattrickRating,
  inputs: ['noStar', 'rating', 'size', 'stamina', 'staminaLabel']
})
@Component({
  selector: 'hattrick-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['noStar', 'rating', 'size', 'stamina', 'staminaLabel'],
  standalone: false
})
export class HattrickRating {
  protected el: HTMLHattrickRatingElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickRating],
  exports: [HattrickRating]
})
export class HattrickRatingModule { }


export declare interface HattrickRating extends Components.HattrickRating {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickReactions,
  inputs: ['disabled', 'placement', 'reactions', 'sourceId', 'sourceTypeId', 'texts', 'token']
})
@Component({
  selector: 'hattrick-reactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'placement', 'reactions', 'sourceId', 'sourceTypeId', 'texts', 'token'],
  standalone: false
})
export class HattrickReactions {
  protected el: HTMLHattrickReactionsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickReactions],
  exports: [HattrickReactions]
})
export class HattrickReactionsModule { }


export declare interface HattrickReactions extends Components.HattrickReactions {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickTimer,
  inputs: ['daysText', 'deadline', 'keepCounting', 'maxHours', 'pattern']
})
@Component({
  selector: 'hattrick-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['daysText', 'deadline', 'keepCounting', 'maxHours', 'pattern'],
  standalone: false
})
export class HattrickTimer {
  protected el: HTMLHattrickTimerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickTimer],
  exports: [HattrickTimer]
})
export class HattrickTimerModule { }


export declare interface HattrickTimer extends Components.HattrickTimer {}


@ProxyCmp({
  defineCustomElementFn: defineHattrickTooltip,
  inputs: ['alwaysShow', 'arrow', 'content', 'dir', 'disabled', 'position'],
  methods: ['open', 'close']
})
@Component({
  selector: 'hattrick-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alwaysShow', 'arrow', 'content', 'dir', 'disabled', 'position'],
  standalone: false
})
export class HattrickTooltip {
  protected el: HTMLHattrickTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


@NgModule({
  declarations: [HattrickTooltip],
  exports: [HattrickTooltip]
})
export class HattrickTooltipModule { }


export declare interface HattrickTooltip extends Components.HattrickTooltip {}


