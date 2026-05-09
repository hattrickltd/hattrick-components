import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
} from "@angular/core";

import { Components, ReactionEvent } from "@hattrickltd/hattrick-components";

import { ProxyCmp, proxyOutputs } from "./stencil-generated/angular-component-lib/utils";

@ProxyCmp({
  inputs: [
    "amount",
    "ariaLabel",
    "disabled",
    "reaction",
    "reactionTypeId",
    "selected",
    "sourceId",
    "sourceTypeId",
  ],
})
@Component({
  selector: "hattrick-reaction",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: [
    "amount",
    "ariaLabel",
    "disabled",
    "reaction",
    "reactionTypeId",
    "selected",
    "sourceId",
    "sourceTypeId",
  ],
  outputs: ["reactionChange: reaction"],
  standalone: false,
})
export class HattrickReaction {
  protected el: HTMLHattrickReactionElement;

  @Output() reactionChange = new EventEmitter<CustomEvent<ReactionEvent>>();

  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone,
  ) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["reaction"]);
  }
}

export interface HattrickReaction extends Components.HattrickReaction {
  reactionChange: EventEmitter<CustomEvent<ReactionEvent>>;
}
