/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@hattrickltd/hattrick-components';


@ProxyCmp({
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


export declare interface HattrickArena extends Components.HattrickArena {}


@ProxyCmp({
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


export declare interface HattrickBar extends Components.HattrickBar {}


@ProxyCmp({
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


export declare interface HattrickField extends Components.HattrickField {}


@ProxyCmp({
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


export declare interface HattrickFlag extends Components.HattrickFlag {}


@ProxyCmp({
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


export declare interface HattrickFlip extends Components.HattrickFlip {}


@ProxyCmp({
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


export declare interface HattrickMatchArena extends Components.HattrickMatchArena {}


@ProxyCmp({
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


export declare interface HattrickMatchClock extends Components.HattrickMatchClock {}


@ProxyCmp({
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


export declare interface HattrickMl extends Components.HattrickMl {}


@ProxyCmp({
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


export declare interface HattrickPicture extends Components.HattrickPicture {}


@ProxyCmp({
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


export declare interface HattrickPlayer extends Components.HattrickPlayer {}


@ProxyCmp({
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


export declare interface HattrickPlayoffTree extends Components.HattrickPlayoffTree {}


@ProxyCmp({
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


export declare interface HattrickProgressArc extends Components.HattrickProgressArc {}


@ProxyCmp({
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


import type { RangeChangeEventDetail as IHattrickRangeRangeChangeEventDetail } from '@hattrickltd/hattrick-components';

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


export declare interface HattrickRating extends Components.HattrickRating {}


@ProxyCmp({
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


export declare interface HattrickReactions extends Components.HattrickReactions {}


@ProxyCmp({
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


export declare interface HattrickTimer extends Components.HattrickTimer {}


@ProxyCmp({
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


export declare interface HattrickTooltip extends Components.HattrickTooltip {}


