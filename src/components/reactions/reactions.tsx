import {
  Component,
  Element,
  h,
  Host,
  Prop,
  Fragment,
  Listen,
  forceUpdate,
} from "@stencil/core";
import {
  computePosition,
  flip,
  shift,
  limitShift,
  offset,
} from "@floating-ui/dom";

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

  componentWillLoad() {
    let availableReactions = this.reactions.split(",").map((r) => {
      const [_, reactionId, emoji] = /(\d*)(.*)/.exec(r.trim());
      return {
        reactionId: +reactionId,
        emoji: emoji,
      };
    });

    let usedReactions = Array.from(this.host.children).map(
      (x: HTMLHattrickReactionElement) => ({
        reactionId: +x.reactionId,
      })
    );

    this._unusedReactions = availableReactions.filter(
      (x) => !usedReactions.find((y) => y.reactionId === x.reactionId)
    );

    console.log(this._unusedReactions);
  }

  componentDidUpdate() {
    this.refreshFloating();
  }

  @Listen("click", { target: "window" })
  onOutsideClick(_ev) {
    this._addDropdown.hidden = true;
  }

  private async refreshFloating() {
    const { x, y } = await computePosition(this._addButton, this._addDropdown, {
      placement: "bottom-start",
      middleware: [
        flip(),
        shift({ limiter: limitShift() }),
        offset({ mainAxis: 5 }),
      ],
    });

    Object.assign(this._addDropdown.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  private openDropdown(ev) {
    this._addDropdown.hidden = false;
    ev.stopPropagation();
    forceUpdate(this);
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

    this._unusedReactions = this._unusedReactions.filter(
      (x) => x.reactionId !== reaction.reactionId
    );
    forceUpdate(this);
  }

  render() {
    return (
      <Host>
        <slot />

        {this._unusedReactions.length > 0 && (
          <>
            <button
              part="add-button"
              class="add-button"
              ref={(el) => (this._addButton = el)}
              onClick={(ev) => this.openDropdown(ev)}
            >
              ➕
            </button>
            <div
              part="dropdown"
              class="reaction-dropdown"
              hidden
              style={{ position: "absolute", width: "max-content" }}
              ref={(el) => (this._addDropdown = el)}
            >
              {this._unusedReactions.map((x) => (
                <button
                  part="dropdown-button"
                  onClick={(_) => this.addReaction(x)}
                >
                  {x.emoji}
                </button>
              ))}
            </div>
          </>
        )}
      </Host>
    );
  }
}

interface IReaction {
  reactionId: number;
  emoji?: string;
}
