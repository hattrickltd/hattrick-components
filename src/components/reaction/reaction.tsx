import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
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

  @Prop() token: string = (window as any).HT?.ngHattrick?.userToken;

  @State() users: Array<string>;

  @Event({ eventName: "reaction" }) onReaction: EventEmitter<ReactionEvent>;

  private checkbox: HTMLInputElement;

  @Method()
  async toggle(value?: boolean) {
    if (this.disabled) return;

    if (typeof value === "undefined") {
      this.selected = !this.selected;
    }

    this.selected = value;
    this.checkbox.checked = value;
    this.amount = (this.amount || 0) + (value ? 1 : -1);
  }

  private changed() {
    if (this.disabled) return;

    this.selected = this.checkbox.checked;
    this.amount = (this.amount || 0) + (this.selected ? 1 : -1);

    this.onReaction.emit({
      sourceTypeId: this.sourceTypeId,
      sourceId: this.sourceId,
      reactionTypeId: this.reactionTypeId,
      selected: this.selected,
    });
  }

  render() {
    return (
      <Host>
        <input
          id="checkbox"
          part="checkbox"
          ref={(el) => (this.checkbox = el)}
          type="checkbox"
          role="switch"
          disabled={this.disabled}
          checked={this.selected}
          onChange={(_) => this.changed()}
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
