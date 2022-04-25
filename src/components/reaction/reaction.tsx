import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "hattrick-reaction",
  styleUrl: "reaction.css",
  shadow: true,
})
export class Reaction {

  @Prop() sourceTypeId: number;
  @Prop() sourceId: number;
  @Prop() reactionId: number;
  @Prop() reaction: string;
  @Prop({ mutable: true }) amount: number;

  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  @Event({ eventName: "reaction" }) onReaction: EventEmitter<boolean>;

  private checkbox: HTMLInputElement;

  private changed() {
    this.selected = this.checkbox.checked;
    this.amount = (this.amount || 0) + (this.selected ? 1 : -1);

    this.onReaction.emit(this.selected);
  }

  render() {
    return <Host>
      <input
        id="checkbox"
        part="checkbox"
        ref={ el => this.checkbox = el}
        type="checkbox"
        role="switch"
        disabled={ this.disabled }
        checked={ this.selected } onChange={ _ => this.changed() } 
      />
      <label htmlFor="checkbox" part="label">
        <span class="reaction" part="reaction">{ this.reaction }</span>
        { typeof this.amount !== "undefined" &&
          <span class="amount" part="amount">{ this.amount }</span>
        }
      </label>
    </Host>;
  }
}
