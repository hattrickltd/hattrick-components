import {
  Component,
  h,
  Host,
  Prop,
  State,
  Watch,
  Fragment,
  forceUpdate,
  Method,
} from "@stencil/core";

declare const window: any;

@Component({
  tag: "hattrick-playoff-tree",
  styleUrl: "playoff-tree.css",
  shadow: true,
})
export class PlayoffTree {
  @Prop() playoff: Array<IPlayoffMatch>;
  @Prop() expand: "expand" | "auto" | "none" = "auto";
  @Prop() hideCollapsedNames: boolean = true;
  @Prop() hideCollapsedLive: boolean = true;
  @Prop() estimateNextRound: boolean = false;

  @Prop() texts: IPlayoffTexts;
  @Prop() links: ILinks;
  @Prop() baseUrl: string;

  @Prop() matchRoundsBeforePlayoff: number = 0;
  @Prop() fromRound: number = 1;
  @Prop() showRounds: number = 0;
  @Prop() bracket: number = 1;

  @Prop() navControls: boolean | undefined = undefined;

  @Prop({ reflect: true }) pyjamas: boolean = false;

  private allUpper: IPlayoffStages;
  private allLower: IPlayoffStages;

  @State() stages: IPlayoffStages;
  @State() upper: IPlayoffStages;
  @State() lower: IPlayoffStages;

  @State() totalRounds: number;

  @State() hasElements = false;

  @State() highlightTeamId: number = -1;

  @State() expandStage: number = -1;

  private isDouble = false;
  private currentStage: number = 1;

  componentWillLoad() {
    this.prepareData();
  }

  @Method()
  async forceUpdate() {
    forceUpdate(this);
  }

  @Watch("playoff")
  @Watch("fromRound")
  @Watch("showRounds")
  @Watch("bracket")
  private prepareData() {
    let matches: Array<IPlayoffMatch> = this.playoff;

    if (this.fromRound < 1) this.fromRound = 1;
    if (this.bracket < 1) this.bracket = 1;

    let toRound = this.fromRound + (this.showRounds || 99);
    if (typeof matches === "string") matches = JSON.parse(matches);

    if (matches) {
      this.stages = Array.from(
        matches.reduce(this.groupByStage.bind(this), [])
      );
      this.upper = Array.from(
        matches
          .filter((x) => x.bracket === Bracket.Upper)
          .reduce(this.groupByStage.bind(this), [])
      );
      this.lower = Array.from(
        matches
          .filter((x) => x.bracket === Bracket.Lower)
          .reduce(this.groupByStage.bind(this), [])
      );

      this.allUpper = this.upper.filter((x) => !!x);
      this.allLower = this.lower.filter((x) => !!x);

      let skipEmptyStage = true;
      for (let idx = 0; idx < this.upper.length; idx++) {
        if (!this.upper[idx]) {
          if (!skipEmptyStage) {
            this.upper[idx] = [];
          }
        } else skipEmptyStage = false;
      }
      if (this.lower.length > 0) {
        this.isDouble = true;
        this.lower[0] = [];
      }

      while (!this.upper[0]) {
        this.upper.splice(0, 1);
      }

      // for (let i = 0; i < this.lower.length; i++) {
      //   let nrOfMatches = Math.pow(2, i + 1);
      //   let startFrom = nrOfMatches * this.bracket;

      //   this.lower[this.lower.length - i] = this.lower[this.lower.length - i].slice(startFrom, nrOfMatches);
      // }

      this.currentStage =
        matches.filter((x) => x.matchId > 0)?.pop()?.matchRound ||
        toRound + this.matchRoundsBeforePlayoff;
      this.currentStage -= this.matchRoundsBeforePlayoff;
      this.expandStage = this.currentStage;

      this.totalRounds = this.upper.length;

      if (this.showRounds > 0) {
        if (!this.isDouble) {
          this.upper = this.upper.slice(this.fromRound - 1, toRound - 1);

          for (let i = 1; i <= this.upper.length; i++) {
            let nrOfMatches = Math.pow(2, i) / 2;
            let startFrom = nrOfMatches * (this.bracket - 1);

            this.upper[this.upper.length - i] = this.upper[
              this.upper.length - i
            ].slice(startFrom, startFrom + nrOfMatches);
          }

          // console.debug(this.upper);
        } else {
          this.upper = this.upper.slice(this.fromRound - 1, toRound - 1);
          this.lower = this.lower.slice(this.fromRound - 1, toRound - 1);

          let upperOffset = 0;

          for (let i = 1; i <= this.upper.length; i++) {
            let idx = this.upper.length - i;

            let nrOfMatches = Math.pow(2, i - upperOffset) / 2;
            let startFrom = nrOfMatches * (this.bracket - 1);

            if (this.upper[idx].length === 0) {
              upperOffset += 1;
              continue;
            }

            this.upper[idx] = this.upper[idx].slice(
              startFrom,
              startFrom + nrOfMatches
            );
          }

          for (let i = 1; i <= this.lower.length; i++) {
            let idx = this.upper.length - i;

            let nrOfMatches = this.upper[idx].length; // lower bracket has same amount of matches as upper bracket

            if (nrOfMatches === 0 && idx > 0) {
              // no upper bracket had no matches, amount of matches is same as last round in upper bracket
              nrOfMatches = this.upper[idx - 1].length;
            }

            let startFrom = nrOfMatches * (this.bracket - 1);

            this.lower[this.lower.length - i] = this.lower[
              this.lower.length - i
            ].slice(startFrom, startFrom + nrOfMatches);
          }
        }
      }
    }
  }

  private groupByStage(stages: IPlayoffStages, match: IPlayoffMatch) {
    let idx = match.matchRound - 1;
    if (!stages[idx]) stages[idx] = [];
    stages[idx].push(match);
    return stages;
  }

  componentDidLoad() {
    this.hasElements = this.playoff.some((x) => x.element);
  }
  componentDidUpdate() {
    this.hasElements = this.playoff.some((x) => x.element);
  }

  private getStageTitle(
    stage: IPlayoffMatch[],
    _stageIdx: number,
    long: boolean
  ): string {
    if (stage.length === 0) return "";

    let isUpperBracket = stage[0].bracket === Bracket.Upper;
    let matchRound = stage[0].matchRound;

    let tagReplacer = new window.HT.TagReplacer();
    tagReplacer.addTag("nrOfTeams", Math.pow(2, stage[0].matchRoundsLeft + 1));

    if (!this.isDouble) {
      let title =
        this.texts.single[long ? "round" : "roundShort"][
          this.totalRounds - matchRound + this.matchRoundsBeforePlayoff
        ];
      if (title) return tagReplacer.replace(title);
    } else if (isUpperBracket && this.texts.upper) {
      let upperRounds = this.allUpper.length;
      let upperRound =
        this.allUpper.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;

      let title =
        this.texts.upper[long ? "round" : "roundShort"][
          upperRounds - upperRound
        ];
      if (title) return tagReplacer.replace(title);
    } else if (!isUpperBracket && this.texts.lower) {
      let lowerRounds = this.allLower.length;
      let lowerRound =
        this.allLower.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;

      let title =
        this.texts.lower[long ? "round" : "roundShort"][
          lowerRounds - lowerRound
        ];
      if (title) return tagReplacer.replace(title);
    } else if (this.texts.double) {
      let rounds = this.stages.length;
      let round =
        this.stages.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;

      let title =
        this.texts.double[long ? "round" : "roundShort"][rounds - round];
      if (title) return tagReplacer.replace(title);
    }

    if (!this.isDouble) {
      matchRound =
        this.allUpper.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;
      tagReplacer.addTag("matchRound", matchRound);
      return tagReplacer.replace(
        this.texts.single[long ? "roundX" : "roundXShort"]
      );
    } else if (isUpperBracket && this.texts.lower) {
      matchRound =
        this.allUpper.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;
      tagReplacer.addTag("matchRound", matchRound);
      return tagReplacer.replace(
        this.texts.upper[long ? "roundX" : "roundXShort"]
      );
    } else if (!isUpperBracket && this.texts.lower) {
      matchRound =
        this.allLower.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;
      tagReplacer.addTag("matchRound", matchRound);
      return tagReplacer.replace(
        this.texts.lower[long ? "roundX" : "roundXShort"]
      );
    } else if (this.texts.double) {
      matchRound =
        this.stages.findIndex((x) => x?.[0]?.matchRound === matchRound) + 1;
      tagReplacer.addTag("matchRound", matchRound);
      return tagReplacer.replace(
        this.texts.double[long ? "roundX" : "roundXShort"]
      );
    }
  }

  private trySetExpandedStage(matchRound: number) {
    if (matchRound <= this.currentStage) {
      this.expandStage = matchRound;
    }
  }
  private unsetExpandedStage() {
    this.expandStage = this.currentStage;
  }

  private setHighlightedTeam(teamId: number) {
    if (teamId !== 0) {
      this.highlightTeamId = teamId;
    }
  }

  private _cachedEntries: { [matchId: number]: IPlayoffMatch[] } = {};
  private getEntries(
    match: IPlayoffMatch,
    bracket: IPlayoffStages,
    stageIdx: number,
    matchIdx: number
  ): IPlayoffMatch[] {
    if (this._cachedEntries.hasOwnProperty(match.matchId))
      return this._cachedEntries[match.matchId];

    if (match.matchRound > 1) {
      let isUpperBracket: boolean = match.bracket === Bracket.Upper;
      let prevStage = bracket[stageIdx - 1];
      if (prevStage?.length === 0) prevStage = bracket[stageIdx - 2];

      if (isUpperBracket) {
        if (match.matchRound === this.totalRounds - 1) {
          // first grand final
          return (this._cachedEntries[match.matchId] = [
            prevStage[0],
            this.lower[stageIdx - 1][0],
          ]);
        } else if (match.matchRound === this.totalRounds) {
          // second grand final
          return (this._cachedEntries[match.matchId] = [prevStage[0]]);
        } else {
          return (this._cachedEntries[match.matchId] = [
            prevStage[matchIdx * 2],
            prevStage[matchIdx * 2 + 1],
          ]);
        }
      } else {
        if (stageIdx % 2 === 0) {
          // new teams from the upper bracket
          return (this._cachedEntries[match.matchId] = [
            this.upper[stageIdx - 1][matchIdx],
            this.lower[stageIdx - 1][matchIdx],
          ]);
        } else {
          return (this._cachedEntries[match.matchId] = [
            this.lower[stageIdx - 1][matchIdx * 2],
            this.lower[stageIdx - 1][matchIdx * 2 + 1],
          ]);
        }
      }
    } else {
      return (this._cachedEntries[match.matchId] = undefined);
    }
  }

  private move(dir: "up" | "down" | "leftup" | "leftdown" | "right") {
    switch (dir) {
      case "up":
        this.bracket -= 1;
        break;
      case "down":
        this.bracket += 1;
        break;
      case "leftup":
        this.fromRound -= 1;
        // in double elimiation we might want to step two steps so first round is never empty.
        if (
          this.playoff.some(
            (m) => m.bracket === 2 && m.matchRound === this.fromRound
          )
        )
          this.fromRound -= 1;
        this.bracket = this.bracket * 2 - 1;
        break;
      case "leftdown":
        this.fromRound -= 1;
        // in double elimiation we might want to step two steps so first round is never empty.
        if (
          this.playoff.some(
            (m) => m.bracket === 2 && m.matchRound === this.fromRound
          )
        )
          this.fromRound -= 1;
        this.bracket *= 2;
        break;
      case "right":
        this.fromRound += 1;
        // in double elimiation we might want to step two steps so first round is never empty.
        if (
          this.fromRound > 2 &&
          this.playoff.some(
            (m) => m.bracket === 2 && m.matchRound === this.fromRound
          )
        )
          this.fromRound += 1;
        this.bracket = Math.ceil(this.bracket / 2);
        break;
    }

    // in double elimination stepping twice above may cause us to step one step too far past the last grand final
    // for this case we step back one step and show the first round empty anyway.
    if (this.fromRound > this.totalRounds - this.showRounds)
      this.fromRound = this.totalRounds - this.showRounds + 1;

    this.hasElements = false;
    this.playoff.forEach((x) => (x.element = undefined));
  }

  private getMatchLink(match: IPlayoffMatch): string | null {
    if (!match.matchId) return null;
    return this.links.match.replace("{0}", match.matchId.toString());
  }
  private getLiveLink(stage: IPlayoffMatch[]): string | null {
    if (!stage?.filter((x) => x.matchId).length) return null;
    return this.links.live.replace(
      "{0}",
      stage.map((x) => x.matchId).join(",")
    );
  }

  render() {
    if (!this.playoff) return;

    return (
      <Host>
        {this.isDouble && <slot name="winners-bracket-title" />}

        {this.showRounds > 0 && this.navControls !== false && (
          <div class="controls">
            <div
              class="control-left-up"
              onClick={(_) => this.move("leftup")}
              hidden={this.fromRound <= 1}
            ></div>
            <div
              class="control-left-down"
              onClick={(_) => this.move("leftdown")}
              hidden={this.fromRound <= 1}
            ></div>
            <div
              class="control-up"
              onClick={(_) => this.move("up")}
              hidden={this.bracket <= 1}
            ></div>
            <div
              class="control-down"
              onClick={(_) => this.move("down")}
              hidden={
                this.bracket >=
                this.allUpper[this.fromRound - 1].length / this.upper[0].length
              }
            ></div>
            <div
              class="control-right"
              onClick={(_) => this.move("right")}
              hidden={this.fromRound > this.totalRounds - this.showRounds}
            ></div>

            {/* <div class="control-left-up" onClick={ _ => this.move(-1, 0) } hidden={ this.fromRound <= 1 }></div>
          <div class="control-left-down" onClick={ _ => this.moveStep(-1, 1) } hidden={ this.fromRound <= 1 }></div>
          <div class="control-up" onClick={ _ => this.moveStep(0, -1) } hidden={ this.bracket <= 1 }></div>
          <div class="control-down" onClick={ _ => this.moveStep(0, 1) } hidden={ this.bracket >= this.allUpper[0].length / this.upper[0].length }></div>
          <div class="control-right" onClick={ _ => this.moveStep(1, Math.floor(this.bracket / 2) - this.bracket) } hidden={ this.fromRound > this.totalRounds - this.showRounds }></div> */}

            <div class="stages upper">
              {this.upper.map((stage, stageIdx) =>
                this.renderStage(stage, stageIdx, true)
              )}
            </div>
          </div>
        )}
        {(this.showRounds === 0 || this.navControls === false) && (
          <div class="stages upper">
            {this.upper.map((stage, stageIdx) =>
              this.renderStage(stage, stageIdx, true)
            )}
          </div>
        )}

        {this.isDouble && (
          <>
            <slot name="losers-bracket-title" />
            <div class="stages lower">
              {this.lower.map((stage, stageIdx) =>
                this.renderStage(stage, stageIdx, false)
              )}
            </div>
          </>
        )}
      </Host>
    );
  }

  private renderStage(
    stage: IPlayoffMatch[],
    stageIdx: number,
    isUpper: boolean
  ) {
    // let stageRound = stage[0]?.matchRound - this.matchRoundsBeforePlayoff;
    let stageRound = stageIdx + this.fromRound;

    // let currentStage = stageIdx + this.fromRound;
    let isCurrentStage = stageRound === this.currentStage;
    let isHighlightedStage = stageRound === this.expandStage;
    let hideNames = this.hideCollapsedNames && stageRound !== this.expandStage; //(isUpperBracket && match.matchRound > 1) || (!isUpperBracket && match.matchRound > 2);
    let hideNamesNext =
      this.hideCollapsedNames && stageRound !== this.expandStage - 1;

    let expandIsFutureStage = this.expandStage > this.currentStage;

    let expanded =
      this.expand === "expand" ||
      (this.expand === "auto" &&
        !expandIsFutureStage &&
        this.expandStage === stageRound) ||
      (this.expand === "auto" &&
        !expandIsFutureStage &&
        this.expandStage > stageRound &&
        stageIdx === this.showRounds - 1) ||
      (expandIsFutureStage && stageIdx === this.currentStage - 1);

    let expandedNext =
      this.expand === "expand" ||
      (this.expand === "auto" &&
        !expandIsFutureStage &&
        this.expandStage - 1 === stageRound) ||
      (this.expand === "auto" &&
        !expandIsFutureStage &&
        this.expandStage > stageRound &&
        stageIdx === this.showRounds - 2);

    let liveLink = this.getLiveLink(stage);

    let formattedDate: string = stage[0]?.formattedMatchDate;
    let shortDate: string = formattedDate || "";

    if (!expanded) {
      shortDate = shortDate.split(" ")[0];
    }

    return (
      <div
        class={{
          stage: true,
          "current-stage": isCurrentStage,
          "highlight-stage": isHighlightedStage,
          "empty-stage": stage.length === 0,
          "hide-names": hideNames,
          "hide-next-names": hideNamesNext,
          expanded: expanded,
          "expanded-next": expandedNext,
        }}
        onMouseOver={(_) => this.trySetExpandedStage(stageRound)}
        onMouseLeave={(_) => this.unsetExpandedStage()}
      >
        <div
          class="header"
          title={
            this.getStageTitle(stage, stageIdx, true) +
            (formattedDate ? ` (${formattedDate})` : "")
          }
        >
          <div>
            <b>
              {this.getStageTitle(stage, stageIdx, expanded) || <>&nbsp;</>}
            </b>
            <a
              href={liveLink}
              style={{
                visibility:
                  liveLink && (expanded || !this.hideCollapsedLive)
                    ? null
                    : "hidden",
              }}
            >
              <img
                src={this.baseUrl + "img/icons/addToLive.png"}
                title={this.texts.addToLive}
              />
            </a>
          </div>
          <span>{shortDate || <>&nbsp;</>}</span>
        </div>
        <div class="matches">
          {stage.map((match, matchIdx) =>
            this.renderMatch(
              match,
              isUpper ? this.upper : this.lower,
              stageIdx,
              matchIdx
            )
          )}
        </div>
      </div>
    );
  }

  private renderMatch(
    match: IPlayoffMatch,
    bracket: IPlayoffStages,
    stageIdx: number,
    matchIdx: number
  ) {
    let isUpperBracket: boolean =
      (match.bracket || Bracket.Upper) === Bracket.Upper;
    let isUpperHalf: boolean = matchIdx % 2 === 0;
    let isActualMatch: boolean = match.homeTeamId > 0 && match.awayTeamId > 0;
    let exit: IPlayoffMatch;

    let thisStage = bracket[stageIdx];
    let nextStage = bracket[stageIdx + 1];
    let nextIsUp: boolean;

    let homeWon = match.homeGoals > match.awayGoals;
    let awayWon = match.homeGoals < match.awayGoals;

    let isFinal = match.matchRound >= this.totalRounds - 1;

    if (thisStage.length === nextStage?.length) {
      // lower round with entries (except first round)
      isUpperHalf = true; // just go with it... :)
      exit = nextStage?.[matchIdx];
    } else {
      if (nextStage?.length === 0) nextStage = bracket[stageIdx + 2]; // in upper bracket next stage can sometimes be empty, so skip to next
      exit = nextStage?.[Math.floor(matchIdx / 2)];
    }

    let entries: IPlayoffMatch[] =
      this.estimateNextRound &&
      this.getEntries(match, bracket, stageIdx, matchIdx);

    // console.log(match.matchId, entries);

    if (isUpperBracket) {
      if (thisStage.length === nextStage?.length || !isUpperHalf) {
        nextIsUp = true;
      } else {
        nextIsUp = false;
      }
    } else {
      nextIsUp = !isUpperHalf;
    }

    let hasExit =
      (isUpperBracket && match.matchRoundsLeft > 0) ||
      (!isUpperBracket && match.matchRoundsLeft !== 1);

    let Tag = match.matchId ? "a" : "div";

    return (
      <div class="match-wrapper" data-match-id={match.matchId}>
        {!isUpperBracket &&
          (thisStage.length !== nextStage?.length ||
            match.matchRound === 2) && (
            <div
              class={{
                "lower-entry": true,
                up: true,
                start: match.matchRound === 2,
                highlight: this.highlightTeamId === match.homeTeamId,
              }}
            ></div>
          )}
        {!isUpperBracket && match.matchRound === 2 && (
          <div
            class={{
              "lower-entry": true,
              down: true,
              start: match.matchRound === 2,
              highlight: this.highlightTeamId === match.awayTeamId,
            }}
          ></div>
        )}
        <Tag
          class="match"
          ref={(el) => (match.element = el)}
          href={this.getMatchLink(match)}
        >
          <div
            data-team-id={match.homeTeamId}
            class={{
              team: true,
              winner: match.isFinished && homeWon,
              loser: match.isFinished && awayWon,
              highlight: this.highlightTeamId === match.homeTeamId,
            }}
            title={match.homeTeamName}
            onMouseOver={(_) => this.setHighlightedTeam(match.homeTeamId)}
            onMouseLeave={(_) => this.setHighlightedTeam(-1)}
          >
            {this.estimateNextRound &&
              !isActualMatch &&
              entries.length > 0 &&
              entries[0].homeLogo && (
                <>
                  {this.renderLogo(entries[0].homeLogo)}/
                  {this.renderLogo(entries[0].awayLogo)}
                </>
              )}

            {match.homeLogo && this.renderLogo(match.homeLogo)}
            {match.homeTeamName && (
              <div class={{ name: true, shy: match.homeTeamId <= 0 }}>
                {match.homeTeamName}
              </div>
            )}
            {isActualMatch &&
              match.isFinished &&
              this.isDouble &&
              isUpperBracket &&
              !isFinal &&
              !homeWon && <div class="demoted">⬇</div>}
            {/* { isActualMatch && match.isFinished && this.isDouble && (!isUpperBracket || isFinal) && !homeWon && <div>☠</div> } */}
            <div class="goals">{match.hasStarted ? match.homeGoals : ""}</div>
          </div>

          <div
            data-team-id={match.awayTeamId}
            class={{
              team: true,
              winner: match.isFinished && awayWon,
              loser: match.isFinished && homeWon,
              highlight: this.highlightTeamId === match.awayTeamId,
            }}
            title={match.awayTeamName}
            onMouseOver={(_) => this.setHighlightedTeam(match.awayTeamId)}
            onMouseLeave={(_) => this.setHighlightedTeam(-1)}
          >
            {this.estimateNextRound &&
              !isActualMatch &&
              entries.length > 1 &&
              entries[1].homeLogo && (
                <>
                  {this.renderLogo(entries[1].homeLogo)}/
                  {this.renderLogo(entries[1].awayLogo)}
                </>
              )}

            {match.awayLogo && this.renderLogo(match.awayLogo)}
            {match.awayTeamName && (
              <div class={{ name: true, shy: match.awayTeamId <= 0 }}>
                {match.awayTeamName}
              </div>
            )}
            {isActualMatch &&
              match.isFinished &&
              this.isDouble &&
              isUpperBracket &&
              !isFinal &&
              homeWon && <div class="demoted">⬇</div>}
            {/* { isActualMatch && match.isFinished && this.isDouble && (!isUpperBracket || isFinal) && homeWon && <div>☠</div> } */}
            <div class="goals">{match.hasStarted ? match.awayGoals : ""}</div>
          </div>
        </Tag>
        {hasExit && (
          <div
            class={{
              exit: true,
              up:
                exit?.element &&
                nextIsUp &&
                (!this.isDouble || match.matchRound !== this.totalRounds - 2), // except for first grand final
              down: exit?.element && !nextIsUp,
              long:
                (!exit || exit.matchRound > match.matchRound + 1) &&
                stageIdx < bracket.length - 1,
              highlight:
                exit?.element &&
                match.isFinished &&
                ((this.highlightTeamId === match.homeTeamId && homeWon) ||
                  (this.highlightTeamId === match.awayTeamId && awayWon)),
            }}
            style={{ height: this.getExitHeight(match, exit) + "px" }}
          >
            <div class="entry"></div>
          </div>
        )}
        {match.bracket === Bracket.Lower &&
          match.matchRoundsLeft === 1 && ( // lower final
            <div
              class={{
                exit: true,
                up: true,
                promoted: true,
                highlight:
                  (this.highlightTeamId === match.homeTeamId && homeWon) ||
                  (this.highlightTeamId === match.awayTeamId && awayWon),
              }}
            ></div>
          )}
      </div>
    );
  }

  private renderLogo(logo: string | ILogo) {
    if (typeof logo === "string") {
      return <img class="logo" src={logo} />;
    } else {
      return (
        <img
          class="logo"
          src={logo.imageUrl}
          style={{
            background: `url('${logo.backgroundUrl}') no-repeat ${logo.backgroundOffset}px 0`,
            ...logo.style,
          }}
        />
      );
    }
  }

  private getExitHeight(match: IPlayoffMatch, exit: IPlayoffMatch): number {
    if (!match?.element || !exit?.element) return 0;

    let matchRect = match.element.getBoundingClientRect();
    let exitRect = exit.element.getBoundingClientRect();

    // if ([8].indexOf(match?.matchId) > -1) console.log(matchRect, exitRect);

    if (this.isDouble && exit.matchRound === this.totalRounds) return 0;

    let diff = Math.abs(matchRect.top - exitRect.top);

    if (diff === 0) {
      return diff + matchRect.height * 0.25;
    } else {
      return diff - matchRect.height * 0.25;
    }
  }
}

type IPlayoffStages = Array<Array<IPlayoffMatch>>;

export interface IPlayoffMatch {
  matchId: number;
  formattedMatchDate: string;
  matchRound: number;
  matchRoundsLeft: number;
  bracket: Bracket;
  randomPosition: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  homeLogo: string | ILogo;
  awayLogo: string | ILogo;
  hasStarted: boolean;
  isFinished: boolean;
  homeGoals: number;
  awayGoals: number;
  element?: HTMLElement;
}

export interface ILogo {
  imageUrl: string;
  backgroundUrl?: string;
  backgroundOffset?: number;
  style: { [key: string]: any };
}

const enum Bracket {
  Upper = 1,
  Lower = 2,
}

export interface IPlayoffTexts {
  single: IPlayoffBracketTexts;
  double?: IPlayoffBracketTexts;
  upper?: IPlayoffBracketTexts;
  lower?: IPlayoffBracketTexts;
  addToLive: string;
}

export interface IPlayoffBracketTexts {
  roundX: string;
  roundXShort: string;
  round: Array<string>;
  roundShort: Array<string>;
}

export interface ILinks {
  match: string;
  live: string;
}
