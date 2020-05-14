import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { Fragment } from "../../global/fragment";


@Component({
  tag: "hattrick-playoff-tree",
  styleUrl: "playoff-tree.css",
  shadow: true,
})
export class PlayoffTree {

  @Prop() playoff: any; //Array<IPlayoffMatch>;
  @Prop() expand: "expand" | "auto" | "none" = "auto";

  @State() upper: IPlayoffStages;
  @State() lower: IPlayoffStages;

  @State() totalRounds: number;

  @State() hasElements = false;

  @State() highlightTeamId: number = -1;

  @State() expandStage: number = -1;

  private isDouble = false;
  private currentStage: number = 1;
  private noLogo = "https://m.hattrick.org/assets/imgs/no-logo.png";

  componentWillLoad() {
    this.prepareData();
  }

  @Watch("playoff")
  private prepareData() {
    let matches: Array<IPlayoffMatch> = this.playoff;

    if (typeof matches === "string") matches = JSON.parse(matches);

    if (matches) {
      this.upper = matches.filter(x => x.bracket === Bracket.Upper).reduce(this.groupByStage.bind(this), []);
      this.lower = matches.filter(x => x.bracket === Bracket.Lower).reduce(this.groupByStage.bind(this), []);

      this.currentStage = matches.filter(x => x.homeTeamId + x.awayTeamId > 0).pop()?.matchRound || 1;
      this.expandStage = this.currentStage;

      this.isDouble = this.lower.length > 0;

      for (let idx = 0; idx < this.upper.length; idx++) {
        if (!this.upper[idx]) this.upper[idx] = [];
      }
      this.lower[0] = [];

      this.totalRounds = this.upper.length;
    }
  }

  private groupByStage(stages: IPlayoffStages, match: IPlayoffMatch) {
    let idx = match.matchRound - 1;
    if (!stages[idx]) stages[idx] = [];
    stages[idx].push(match);
    return stages;
  }

  componentDidLoad() {
    this.hasElements = !!this.playoff;
  }
  componentDidUpdate() {
    this.hasElements = !!this.playoff;
  }

  private getStageTitle(stage: IPlayoffMatch[], stageIdx: number): string {
    if (stage.length === 0) return "";

    let isUpperBracket = stage[0]?.bracket === Bracket.Upper;

    if (isUpperBracket) {
      let stages = this.upper.filter(x => x.length > 0);
      let upperRounds = stages.length;
      let upperRound = stages.indexOf(stage) + 1;

      // console.log(upperRound, upperRounds, upperRounds - upperRound);

      let title = ["GF2", "GF", "UF", "USF", "UQF"][upperRounds - upperRound];
      if (title) return title;
    } else {
      let stages = this.lower.filter(x => x.length > 0);
      let lowerRounds = stages.length;
      let lowerRound = stages.indexOf(stage) + 1;

      // console.log(lowerRound, lowerRounds, lowerRounds - lowerRound);

      let title = ["LF", "LSF", "LQF"][lowerRounds - lowerRound];
      if (title) return title;
    }

    return `Round ${ stageIdx + 1 }`;
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
  private getEntries(match: IPlayoffMatch, bracket: IPlayoffStages, stageIdx: number, matchIdx: number): IPlayoffMatch[] {
    if (this._cachedEntries.hasOwnProperty(match.matchId)) return this._cachedEntries[match.matchId];

    if (match.matchRound > 1) {
      let isUpperBracket: boolean = match.bracket === Bracket.Upper;
      let prevStage = bracket[stageIdx - 1];
      if (prevStage?.length === 0) prevStage = bracket[stageIdx - 2];

      if (isUpperBracket) {
        if (match.matchRound === this.totalRounds - 1) { // first grand final
          return this._cachedEntries[match.matchId] = [
            prevStage[0],
            this.lower[stageIdx - 1][0],
          ];
        } else if (match.matchRound === this.totalRounds) { // second grand final
          return this._cachedEntries[match.matchId]  = [
            prevStage[0]
          ];
        } else {
          return this._cachedEntries[match.matchId]  = [
            prevStage[matchIdx * 2],
            prevStage[matchIdx * 2 + 1],
          ];
        }
      } else {
        if (stageIdx % 2 === 0) { // new teams from the upper bracket
          return this._cachedEntries[match.matchId]  = [
            this.upper[stageIdx - 1][matchIdx],
            this.lower[stageIdx - 1][matchIdx],
          ];
        } else {
          return this._cachedEntries[match.matchId]  = [
            this.lower[stageIdx - 1][matchIdx * 2],
            this.lower[stageIdx - 1][matchIdx * 2 + 1],
          ];
        }
      }
    } else {
      return this._cachedEntries[match.matchId] = undefined;
    }
  }

  render() {
    return <Host>
      { this.isDouble &&
        <h2>Winner bracket</h2>
      }
      <div class="stages upper">
        { this.upper.map((stage, stageIdx) =>
          <div class={{
            "stage": true,
            "hide-names": stageIdx !== this.expandStage - 1, //(isUpperBracket && match.matchRound > 1) || (!isUpperBracket && match.matchRound > 2),
            "hide-next-names": stageIdx !== this.expandStage - 2,
            "expanded": this.expand === "expand" || (this.expand === "auto" && this.expandStage - 1 === stageIdx),
            "expanded-next": this.expand === "expand" || (this.expand === "auto" && this.expandStage - 2 === stageIdx),
          }}
          onMouseOver={ _ => this.trySetExpandedStage(stageIdx + 1) }
          onMouseLeave={ _ => this.unsetExpandedStage() }>
            <div class="header">
              { this.getStageTitle(stage, stageIdx) }
            </div>
            <div class="matches">
              { stage.map((match, matchIdx) =>
                this.renderMatch(match, this.upper, stageIdx, matchIdx)
              )}
            </div>
          </div>
        ) }
      </div>

      { this.isDouble &&
        <Fragment>
          <h2>Loser bracket</h2>
          <div class="stages lower">
            { this.lower.map((stage, stageIdx) =>
              <div class={{
                "stage": true,
                "hide-names": stageIdx !== this.expandStage - 1, //(isUpperBracket && match.matchRound > 1) || (!isUpperBracket && match.matchRound > 2),
                "hide-next-names": stageIdx !== this.expandStage - 2,
                "expanded": this.expand === "expand" || (this.expand === "auto" && this.expandStage - 1 === stageIdx),
                "expanded-next": this.expand === "expand" || (this.expand === "auto" && this.expandStage - 2 === stageIdx),
              }}
              onMouseOver={ _ => this.trySetExpandedStage(stageIdx + 1) }
              onMouseLeave={ _ => this.unsetExpandedStage() }>
                <div class="header">
                  { this.getStageTitle(stage, stageIdx) }
                </div>
                <div class="matches">
                  { stage.map((match, matchIdx) =>
                    this.renderMatch(match, this.lower, stageIdx, matchIdx)
                  )}
                </div>
              </div>
            ) }
          </div>
        </Fragment>
      }
    </Host>;
  }

  private renderMatch(match: IPlayoffMatch, bracket: IPlayoffStages, stageIdx: number, matchIdx: number) {

    let isUpperBracket: boolean = match.bracket === Bracket.Upper;
    let isUpperHalf: boolean = matchIdx % 2 === 0;
    let isActualMatch: boolean = match.homeTeamId > 0 && match.awayTeamId > 0;
    let exit: IPlayoffMatch;

    let thisStage = bracket[stageIdx];
    let nextStage = bracket[stageIdx + 1];
    let nextIsUp: boolean;

    let homeWon = match.homeGoals > match.awayGoals;
    let isFinal = match.matchRound >= this.totalRounds - 1;


    if (thisStage.length === nextStage?.length) { // lower round with entries (except first round)
      isUpperHalf = true; // just go with it... :)
      exit = nextStage?.[matchIdx];
    }
    else {
      if (nextStage?.length === 0) nextStage = bracket[stageIdx + 2]; // in upper bracket next stage can sometimes be empty, so skip to next
      exit = nextStage?.[Math.floor(matchIdx / 2)];
    }

    let entries: IPlayoffMatch[] = this.getEntries(match, bracket, stageIdx, matchIdx);

    console.log(match.matchId, entries);

    if (isUpperBracket) {
      if (thisStage.length === nextStage?.length || !isUpperHalf) {
        nextIsUp = true;
      } else {
        nextIsUp = false;
      }
    } else {
      nextIsUp = !isUpperHalf;
    }

    return (
      <div class="match-wrapper" data-match-id={ match.matchId }>
        { !isUpperBracket && (thisStage.length !== nextStage?.length || match.matchRound === 2) &&
          <div class={{ "lower-entry": true, "up": true, "start": match.matchRound === 2, "highlight": this.highlightTeamId === match.homeTeamId }}></div>
        }
        { !isUpperBracket && match.matchRound === 2 &&
          <div class={{ "lower-entry": true, "down": true, "start": match.matchRound === 2, "highlight": this.highlightTeamId === match.awayTeamId }}></div>
        }
        <div class="match" ref={ el => match.element = el }>
          <div data-team-id={ match.homeTeamId } class={{
            "team": true,
            "winner": match.isPlayed && homeWon,
            "loser": match.isPlayed && !homeWon,
            "highlight": this.highlightTeamId === match.homeTeamId,
          }}
          title={ match.homeTeamName }
          onMouseOver={ _ => this.setHighlightedTeam(match.homeTeamId) }
          onMouseLeave={ _ => this.setHighlightedTeam(-1) }>
            { isActualMatch &&
              <img class="logo" src={ match.homeLogoUrl } />
            }
            { !isActualMatch && entries.length > 0 && entries[0].homeLogoUrl &&
              <Fragment>
                <img class="logo" src={ entries[0].homeLogoUrl } />
                /
                <img class="logo" src={ entries[0].awayLogoUrl } />
              </Fragment>
            }

            { isActualMatch &&
              <Fragment>
                <div class="name">{ match.homeTeamName }</div>
                { isActualMatch && match.isPlayed && this.isDouble && isUpperBracket && !isFinal && !homeWon && <div class="demoted">⬇</div> }
                { isActualMatch && match.isPlayed && this.isDouble && (!isUpperBracket || isFinal) && !homeWon && <div>☠</div> }
                <div class="goals">{ match.isPlayed ? match.homeGoals : "" }</div>
              </Fragment>
            }
          </div>

          <div data-team-id={ match.awayTeamId } class={{
            "team": true,
            "winner": match.isPlayed && !homeWon,
            "loser": match.isPlayed && homeWon,
            "highlight": this.highlightTeamId === match.awayTeamId,
          }}
          title={ match.awayTeamName }
          onMouseOver={ _ => this.setHighlightedTeam(match.awayTeamId) }
          onMouseLeave={ _ => this.setHighlightedTeam(-1) }>
          { isActualMatch &&
            <img class="logo" src={ match.awayLogoUrl } />
          }
          { !isActualMatch && entries.length > 1 && entries[1].homeLogoUrl &&
            <Fragment>
              <img class="logo" src={ entries[1].homeLogoUrl } />
              /
              <img class="logo" src={ entries[1].awayLogoUrl } />
            </Fragment>
          }

            { isActualMatch &&
              <Fragment>
                <div class="name">{ match.awayTeamName }</div>
                { isActualMatch && match.isPlayed && this.isDouble && isUpperBracket && !isFinal && homeWon && <div class="demoted">⬇</div> }
                { isActualMatch && match.isPlayed && this.isDouble && (!isUpperBracket || isFinal) && homeWon && <div>☠</div> }
                <div class="goals">{ match.isPlayed ? match.awayGoals : "" }</div>
              </Fragment>
            }
          </div>
        </div>
        { exit?.element &&
          <div class={{
            "exit": true,
            "up": nextIsUp && match.matchRound !== this.totalRounds - 1, // except for first grand final
            "down": !nextIsUp,
            "long": exit.matchRound > match.matchRound + 1,
            "highlight": match.isPlayed && ((this.highlightTeamId === match.homeTeamId && homeWon) || (this.highlightTeamId === match.awayTeamId && !homeWon))
          }} style={{ "height": this.getExitHeight(match, exit) + "px" }}>
            <div class="entry"></div>
          </div>
        }
        { match.bracket === Bracket.Lower && !exit && // lower final
          <div class={{
            "exit": true,
            "up": true,
            "promoted": true,
            "highlight": (this.highlightTeamId === match.homeTeamId && homeWon) || (this.highlightTeamId === match.awayTeamId && !homeWon)
          }}></div>
        }
      </div>
    );
  }

  private getExitHeight(match: IPlayoffMatch, exit: IPlayoffMatch): number {
    let matchRect = match.element.getBoundingClientRect();
    let exitRect = exit.element.getBoundingClientRect();

    // if ([8].indexOf(match?.matchId) > -1) console.log(matchRect, exitRect);

    if (exit.matchRound === this.totalRounds) return 0;

    let diff = Math.abs(matchRect.top - exitRect.top);

    if (diff === 0) {
      return diff + matchRect.height * 0.25;
    } else {
      return diff - matchRect.height * 0.25;
    }
  }
}

type IPlayoffStages = Array<Array<IPlayoffMatch>>;

interface IPlayoffMatch {
  matchId: number;
  matchRound: number;
  bracket: Bracket;
  randomPosition: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  homeLogoUrl: string;
  awayLogoUrl: string;
  isPlayed: boolean;
  homeGoals: number;
  awayGoals: number;
  element?: HTMLElement;
}

const enum Bracket {
  Upper = 1,
  Lower = 2,
}
