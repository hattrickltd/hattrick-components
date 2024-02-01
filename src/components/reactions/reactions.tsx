import {
  Component,
  Element,
  h,
  Host,
  Prop,
  Fragment,
  Listen,
  forceUpdate,
  Build,
  State,
} from "@stencil/core";
import {
  computePosition,
  flip,
  shift,
  limitShift,
  offset,
} from "@floating-ui/dom";
import { ReactionEvent } from "../reaction/reaction";

@Component({
  tag: "hattrick-reactions",
  styleUrl: "reactions.css",
  shadow: true,
})
export class Reactions {
  @Element() host: HTMLHattrickReactionsElement;

  @Prop() sourceTypeId: number;
  @Prop() sourceId: number;
  @Prop() reactions: Array<IReaction>;

  @Prop() disabled: boolean = false;
  @Prop() firstReactionText?: string;

  @Prop() token: string = (window as any).HT?.ngHattrick?.userToken;

  @State() showUsersForReaction: IReaction;

  private reactionTypes = {
    1: { reactionTypeId: 1, emoji: "👍" },
    2: { reactionTypeId: 2, emoji: "❤️" },
    3: { reactionTypeId: 3, emoji: "😂" },
    4: { reactionTypeId: 4, emoji: "🥳" },
    5: { reactionTypeId: 5, emoji: "😮" },
  };

  private _apiRoot =
    location.href.includes("localhost") && Build.isDev
      ? "https://localhost/api"
      : `${location.protocol}//${location.hostname.replace(
          "www",
          "m"
        )}/api/v99999`
          .replace("stage", "mstage")
          .replace("production", "mproduction");

  private _unusedReactions: Array<IReactionType>;
  private _addButton: HTMLElement;
  private _addDropdown: HTMLElement;

  componentWillLoad() {
    this._unusedReactions = Object.keys(this.reactionTypes)
      .filter(
        (reactionTypeId) =>
          !this.reactions.find((y) => y.reactionTypeId === +reactionTypeId)
      )
      .map((x) => this.reactionTypes[x]);

    this.host.addEventListener("reaction", (ev: CustomEvent<ReactionEvent>) => {
      const target: HTMLHattrickReactionElement = ev.target as any;

      fetch(`${this._apiRoot}/emoteReaction/toggleReaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "hattrick-auth-token": `${this.token}`,
        },
        body: JSON.stringify({
          sourceTypeId: ev.detail.sourceTypeId,
          sourceId: ev.detail.sourceId,
          reactionTypeId: ev.detail.reactionTypeId,
          selected: ev.detail.selected,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
        })
        .catch(() => {
          target.toggle(!ev.detail.selected);
        });
    });
  }

  componentDidUpdate() {
    if (this._addDropdown) this.refreshFloating();
  }

  @Listen("click", { target: "window" })
  onOutsideClick(_ev) {
    if (this._addDropdown) this._addDropdown.hidden = true;
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

  private addNewReaction(reaction: IReactionType) {
    let element = document.createElement("hattrick-reaction");
    element.sourceTypeId = this.sourceTypeId;
    element.sourceId = this.sourceId;
    element.reactionTypeId = reaction.reactionTypeId;
    element.reaction = reaction.emoji;
    element.amount = 1;
    element.selected = true;

    this.host.appendChild(element);

    this._unusedReactions = this._unusedReactions.filter(
      (x) => x.reactionTypeId !== reaction.reactionTypeId
    );
    forceUpdate(this);
  }

  async showUsers(reaction: IReaction) {
    if (!reaction._users) {
      await fetch(
        `${this._apiRoot}/emoteReaction/getReactedUsers?` +
          new URLSearchParams({
            sourceTypeId: this.sourceTypeId.toString(),
            sourceId: this.sourceId.toString(),
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "hattrick-auth-token": this.token,
          },
        }
      )
        .then((res) => res.json())
        .then((users: Array<IReactionUser>) => {
          // add an array to all reactions, this is the identifier that the data has been fetched
          this.reactions.forEach((x) => (x._users = []));

          let reactionsMap = new Map(
            this.reactions.map((element) => [element.reactionTypeId, element])
          );

          users.forEach((user) => {
            (reactionsMap.get(user.reactionTypeId)._users ??= []).push(user);
          });
        });
    }

    this.showUsersForReaction = reaction;
  }

  render() {
    return (
      <Host>
        {this.reactions.map((x) => (
          <hattrick-tooltip
            position="top"
            disabled={this.showUsersForReaction !== x || !x._users?.length}
          >
            <hattrick-reaction
              sourceTypeId={this.sourceTypeId}
              sourceId={this.sourceId}
              reactionTypeId={x.reactionTypeId}
              reaction={this.reactionTypes[x.reactionTypeId].emoji}
              amount={x.amount}
              selected={x.userReacted}
              disabled={this.disabled}
              aria-label={`Click to react with ${
                this.reactionTypes[x.reactionTypeId].emoji
              }`}
              onMouseEnter={() => this.showUsers(x)}
            />

            <div slot="content">
              {x._users?.map((user, idx) => (
                <>
                  {idx > 0 && ", "}
                  {user.loginname}
                </>
              ))}{" "}
              and {x.amount - x._users.length} others reacted with{" "}
              {this.reactionTypes[x.reactionTypeId].emoji}
            </div>
          </hattrick-tooltip>
        ))}

        {this._unusedReactions.length > 0 && (
          <>
            <button
              part="add-button"
              class="add-button"
              ref={(el) => (this._addButton = el)}
              onClick={(ev) => this.openDropdown(ev)}
            >
              {(this._unusedReactions.length ===
                Object.keys(this.reactionTypes).length &&
                this.firstReactionText) ||
                "➕"}
            </button>
            {!this.disabled && (
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
                    onClick={(_) => this.addNewReaction(x)}
                  >
                    {x.emoji}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </Host>
    );
  }
}

interface IReactionType {
  reactionTypeId: number;
  emoji?: string;
}

export interface IReaction {
  reactionTypeId: number;
  amount: number;
  userReacted: boolean;

  /** @private */
  _users?: Array<IReactionUser>;
}

interface IReactionUser {
  reactionTypeId: number;
  userId: number;
  loginname: string;
}
