import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from "@stencil/core";

@Component({
  tag: "hattrick-reaction",
  styleUrl: "reaction.css",
  shadow: true,
})
export class Reaction {
  @Prop() sourceTypeId: number;
  @Prop() sourceId: number;
  @Prop() reactionTypeId: number;
  @Prop() reaction: string;
  @Prop({ mutable: true }) amount: number;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;
  @Prop() ariaLabel: string;

  @Prop() token: string = (window as any).HT?.ngHattrick?.userToken;

  @State() users: Array<string>;

  @Event({ eventName: "reaction" }) onReaction: EventEmitter<ReactionEvent>;

  private changed(ev: Event) {
    if (this.disabled) return;

    this.onReaction.emit({
      sourceTypeId: this.sourceTypeId,
      sourceId: this.sourceId,
      reactionTypeId: this.reactionTypeId,
      selected: (ev.target as HTMLInputElement).checked,
    });
  }

  render() {
    return (
      <Host>
        <input
          id="checkbox"
          part="checkbox"
          type="checkbox"
          role="switch"
          disabled={this.disabled}
          checked={this.selected}
          onChange={(ev) => this.changed(ev)}
        />
        <label htmlFor="checkbox" part="label">
          <span class="reaction" part="reaction">
            {this.reaction}
          </span>
          {typeof this.amount !== "undefined" && (
            <span class="amount" part="amount">
              {this.amount}
            </span>
          )}
        </label>
      </Host>
    );
  }
}

export interface ReactionEvent {
  sourceTypeId: number;
  sourceId: number;
  reactionTypeId: number;
  selected: boolean;
}
