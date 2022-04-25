import { createPopper, Instance } from "@popperjs/core";
import { Component, Element, h, Host, Prop, Fragment, Listen, forceUpdate } from "@stencil/core";

@Component({
  tag: "hattrick-reactions",
  styleUrl: "reactions.css",
  shadow: true,
})
export class Reactions {

  @Element() host: HTMLHattrickReactionsElement;

  @Prop() sourceTypeId: number;
  @Prop() sourceId: number;
  @Prop() reactions: string;

  private _unusedReactions: Array<IReaction>;
  private _addButton: HTMLElement;
  private _addDropdown: HTMLElement;
  private _popper: Instance;

  componentWillLoad() {
    let availableReactions = this.reactions.split(",").map(r => {
      const [_, reactionId, emoji] = /(\d*)(.*)/.exec(r.trim());
      return {
        reactionId: +reactionId,
        emoji: emoji,
      };
    });

    let usedReactions = Array.from(this.host.children).map((x: HTMLHattrickReactionElement) => ({
      reactionId: +x.reactionId,
    }));

    this._unusedReactions = availableReactions.filter(x => !usedReactions.find(y => y.reactionId === x.reactionId));

    console.log(this._unusedReactions);
  }

  componentDidLoad() {
    this._popper = createPopper(this._addButton, this._addDropdown, {
      placement: "bottom-start",
    });
  }

  componentDidUpdate() {
    this._popper?.update();
  }

  @Listen("click", { target: "window" })
  onOutsideClick(ev) {
    this._addDropdown.hidden = true;
  }

  private openDropdown(ev) {
    this._addDropdown.hidden = false;
    ev.stopPropagation();
  }

  private addReaction(reaction: IReaction) {
    let element = document.createElement("hattrick-reaction");
    element.sourceTypeId = this.sourceTypeId;
    element.sourceId = this.sourceId;
    element.reactionId = reaction.reactionId;
    element.reaction = reaction.emoji;
    element.amount = 1;
    element.selected = true;

    this.host.appendChild(element);

    this._unusedReactions = this._unusedReactions.filter(x => x.reactionId !== reaction.reactionId);
    forceUpdate(this);
  }

  render() {
    return <Host>
        <slot/>

      { this._unusedReactions.length > 0 && <>
        <button part="add-button" class="add-button" ref={ el => this._addButton = el } onClick={ ev => this.openDropdown(ev) }>
          ➕
        </button>
        <div part="dropdown" class="reaction-dropdown" hidden ref={ el => this._addDropdown = el }>
          { this._unusedReactions.map(x =>
            <button part="dropdown-button" onClick={ _ => this.addReaction(x) }>{ x.emoji }</button>
          )}
        </div>
      </>}
    </Host>;
  }
}

interface IReaction {
  reactionId: number;
  emoji?: string;
}