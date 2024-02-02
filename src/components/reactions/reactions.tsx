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
  Placement,
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
  @Prop() placement: Placement = "bottom-start";

  @Prop() texts = {
    pluralRule: 1,
    clickToReact: "Click to send this reaction",
    youReacted: "You already sent this reaction",
    one: "[#user] reacted with [#reaction]",
    few: "[#firsts] and [#last] reacted with [#reaction]",
    more: "[#users] and [#remaining>>other|others] reacted with [#reaction]",
  };

  @Prop() token: string = (window as any).HT?.ngHattrick?.userToken;

  @State() showUsersForReaction: IReaction;

  private tagReplacer = new (window as any).HT.TagReplacer();

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

    this.host.addEventListener("reaction", (e: CustomEvent<ReactionEvent>) =>
      this.onReaction(e.detail)
    );
  }

  componentDidUpdate() {
    if (this._addDropdown) this.refreshFloating();
  }

  @Listen("click", { target: "window" })
  onOutsideClick() {
    if (this._addDropdown) this._addDropdown.hidden = true;
  }

  private onReaction(detail: ReactionEvent) {
    const { reactionTypeId, selected } = detail;

    const reaction = this.reactions.find(
      (x) => x.reactionTypeId === reactionTypeId
    );

    reaction.userReacted = selected;
    reaction.amount += selected ? 1 : -1;
    forceUpdate(this);

    fetch(`${this._apiRoot}/emoteReaction/toggleReaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "hattrick-auth-token": `${this.token}`,
      },
      body: JSON.stringify({
        sourceTypeId: this.sourceTypeId,
        sourceId: this.sourceId,
        reactionTypeId: reactionTypeId,
        selected: selected,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
      })
      .catch(() => {
        reaction.userReacted = !selected;
        reaction.amount -= selected ? 1 : -1;
        forceUpdate(this);
      });
  }

  private async refreshFloating() {
    const { x, y } = await computePosition(this._addButton, this._addDropdown, {
      placement: this.placement,
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
    this.reactions.push({
      reactionTypeId: reaction.reactionTypeId,
      _users: [],

      // onReaction will toggle amount and userReacted
      amount: 0,
      userReacted: false,
    });

    this._unusedReactions = this._unusedReactions.filter(
      (x) => x.reactionTypeId !== reaction.reactionTypeId
    );

    this.onReaction({
      reactionTypeId: reaction.reactionTypeId,
      selected: true,
      sourceTypeId: this.sourceTypeId,
      sourceId: this.sourceId,
    });
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
            let r = reactionsMap.get(user.reactionTypeId);
            if (r) (r._users ??= []).push(user);
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
              onMouseEnter={() => this.showUsers(x)}
            />

            <div slot="content">{this.getTooltipText(x)}</div>
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

  private getTooltipText(reaction: IReaction) {
    if (!reaction._users?.length) return <></>;

    const listedAmount = reaction._users.length;
    const remaining = reaction.amount - listedAmount;

    const firsts = reaction._users.slice(0, listedAmount - 1);
    const last = reaction._users[listedAmount - 1];

    const emoji = this.reactionTypes[reaction.reactionTypeId].emoji;

    const { one, few, more, pluralRule } = this.texts;

    if (listedAmount === 1) {
      return (
        <>
          {this.tagReplacer.replace(one, pluralRule, {
            user: last.loginname,
            reaction: emoji,
          })}
        </>
      );
    } else if (remaining === 0) {
      return (
        <>
          {this.tagReplacer.replace(few, pluralRule, {
            firsts: firsts.map((x) => x.loginname).join(", "),
            last: last.loginname,
            reaction: emoji,
          })}
        </>
      );
    } else {
      return (
        <>
          {this.tagReplacer.replace(more, pluralRule, {
            users: reaction._users.map((x) => x.loginname).join(", "),
            remaining: remaining,
            reaction: emoji,
          })}
        </>
      );
    }
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
