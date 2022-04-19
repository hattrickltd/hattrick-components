import { Component, h, Host, Listen, Method, Prop, State, Fragment, FunctionalComponent, Element } from "@stencil/core";
import { createPopper, Instance } from "@popperjs/core";
import { currency, grouped } from "../../global/utils";

declare const window: any;

@Component({
  tag: "hattrick-player",
  styleUrl: "player.css",
  scoped: true,
})
export class Player {

  @Element() host: HTMLHattrickPlayerElement;

  private _content: HTMLElement;
  private _tooltip: HTMLElement;

  private _popper: Instance;
  private _loading: Promise<any>;

  @Prop() playerId: number;
  @Prop() countryId: number;
  @Prop() languageId: number = 2;
  @Prop() skillPresentation: number = 2;
  @Prop() hideNumbersAfterDenominations: boolean = false;
  @Prop() avatarSet: string = "Avatar";
  @Prop() token?: string;
  @Prop() debounce: number = 300;

  @State() private player: any;
  @State() private language: any;
  @State() private country: any;
  @State() private retiredMessage: string;

  private _root = (location.href.includes(".hattrick.local")) ? "/htweb"
                : (location.href.includes("localhost")) ? "https://www.hattrick.org"
                : "";

  private _apiRoot = (location.href.includes("localhost"))
                  //  ? "https://m.hattrick.org/api"
                   ? "https://laptop-marcus.hattrick.local/api"
                   : `${location.protocol}//${location.hostname.replace("www", "m")}/api/v99999`
                      .replace("stage", "mstage")
                      .replace("production", "mproduction");

  private timeout: any;

  @Method()
  @Listen("mouseenter")
  @Listen("focus")
  async show() {
    if (this.timeout) return;

    this.timeout = setTimeout(() => {
      this.timeout = undefined;

      if (!this._loading) {
        let init: RequestInit;

        if (this.token) {
          init = { headers: { "hattrick-auth-token": this.token } };
        }

        this._loading = fetch(`${ this._apiRoot }/popup/player/${this.playerId}?languageId=${this.languageId}&countryId=${this.countryId}`, init)
          .then(res => res.json())
          .then(({ player, language, country, retired }) => {
            this.player = player;
            this.language = language;
            this.country = country;
            this.retiredMessage = retired;
          });
      }

      this._tooltip.removeAttribute("hidden");
      this._popper.update();
    }, this.debounce);
  }

  @Method()
  @Listen("mouseleave")
  @Listen("blur")
  async hide() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = undefined;
    this._tooltip.setAttribute("hidden", "");
  }

  componentDidLoad() {
    this._popper = createPopper(this._content, this._tooltip, {
      placement: "top",
    });
  }

  render() {
    return <Host>
      <span ref={el => this._content = el}><slot /></span>
      <div class="playertooltip playerList" hidden aria-hidden="true" ref={el => this._tooltip = el}>
        { this.retiredMessage
          ? <div class="retired">{ this.retiredMessage }</div>
          : <>
            { this.player ? this.renderPlayer() : this.renderLoading() }
            </>
        }
      </div>
    </Host>;
  }

  renderLoading() {
    return <img class="loading" src={ `${ this._root }/Img/Shop/loading.gif` } />;
  }
  
  getBarColorClass(level: number, max: number) {
    const a = ["verylow", "low", "high", "veryhigh"];
    let percent = level / max;
    return a[Math.min(Math.floor(percent * a.length), a.length - 1)];
  }

  renderPlayer() {
    const { player, language, country, skillPresentation, hideNumbersAfterDenominations } = this;
    const texts = language.texts;

    const showSkillBar = (skillPresentation === SkillPresentation.OnlyBar || skillPresentation === SkillPresentation.BarAndText);
    const showSkillBarTextDenomination = (showSkillBar && skillPresentation === SkillPresentation.BarAndText);

    const replacer = new window.HT.TagReplacer();

    return <>
      <h3 class="float_left">
        { 0 < player.playerNumber && player.playerNumber < 100 && `${ player.playerNumber }.`
        } { getFullPlayerName(player)
        } { player.health >= 1 &&
          <i class="icon-injury injury-with-badge" data-injury-length={ player.health === 999 ? "∞" : player.health } role="img"></i>
        }
        
      </h3>
      <span class="float_right">
        <a href={ `${ this._root }/World/Leagues/League.aspx?LeagueID=${ player.leagueId }` } class="flag inner" tabIndex={ -1 }>
          <hattrick-flag leagueId={ player.leagueId } title={ player.leagueName }></hattrick-flag>
        </a>
      </span>
      <br class="clear" />
      
      { player.playerCategoryId > 0 &&
        <div class="player-category float_right">{ texts.playerCategories[player.playerCategoryId * 2] }</div>
      }

      <p class="player-information">
        { player.trainerLevel > 0  && <>
          { jsxReplacer(texts.playerDetails.cochSkillAndTrainerType, {
            "Skill1": () => <Denomination level={ player.trainerSkill } type="skillshort" text={ texts.labels_skills[player.trainerSkill] } showNumber={ !hideNumbersAfterDenominations } />,
            "TrainerType": texts.public_TrainerTypes[["Defensive", "Offensive", "Balanced"][player.trainerType]],
          }) }
          <br />
        </> }

        { jsxReplacer(texts.playerDetails.personality, {
          "Gentleness": () => <Denomination level={ player.gentleness } type="gentleness" text={ texts.labels_gentleness[player.gentleness] } showNumber={ false } />,
          "Agressiveness": () => <Denomination level={ player.aggressiveness } type="aggressiveness" text={ texts.labels_aggressiveness[player.aggressiveness] } showNumber={ false } />,
          "Honesty": () => <Denomination level={ player.honesty } type="honesty" text={ texts.labels_honesty[player.honesty] } showNumber={ false } />,
        }) }

        <br />

        { jsxReplacer(texts.playerDetails.experienceAndLeadership, {
          "Experience": () => <Denomination level={ player.experience } type="skill" text={ texts.labels_skills[player.experience] } showNumber={ !hideNumbersAfterDenominations } />,
          "Leadership": <Denomination level={ player.leadership } type="leadership" text={ texts.labels_skills[player.leadership] } showNumber={ !hideNumbersAfterDenominations } />,
        })
        } { jsxReplacer(texts.playerDetails_3.hasLoyalty, {
          "Loyalty": () => <Denomination level={ player.loyalty } type="skill" text={ texts.labels_skills[player.loyalty] } showNumber={ !hideNumbersAfterDenominations } />,
        }) }
      </p>

      <div class="flex">
        <div class="flex-fixed">
          { this.avatarSet &&
            <hattrick-avatar parts={player.avatar} base={ `${ this._root }/Img/${ this.avatarSet }/` } facecard={ false }></hattrick-avatar>
          }
        </div>
        <div class="flex flex-space-between">
          <div class="transferPlayerInformation">
            <table>
              <tbody>
                <tr>
                  <td class="right">{ texts.labels_pagetexts.owner }</td>
                  <td colSpan={2} class="nowrap">
                    <a href="#" tabIndex={ -1 }>{ player.teamname }</a>
                  </td>
                </tr>

                <tr>
                  <td class="right">{ texts.players.age }</td>
                  <td colSpan={2} class="nowrap">
                    { replacer.replace(texts.mobilePlayers.ageYearsAndDays, language.languagePluralRule, {
                      "years": player.years,
                      "days": player.days,
                    }) }
                  </td>
                </tr>

                <tr>
                  <td class="right">{ texts.players.tsi }</td>
                  <td colSpan={2}>{ grouped(player.tsi) }</td>
                </tr>

                <tr>
                  <td class="right">{ texts.labels_pagetexts.wage }</td>
                  <td colSpan={2} class="nowrap">
                    { replacer.replace(texts.labels_pagetexts.salaryperweek, language.languagePluralRule, {
                      "salary": currency(player.salary, country.currencyRate, country.currencyName),
                    }) }
                  </td>
                </tr>

                <tr>
                  <td class="right">{ texts.transferList.specialty.replace(":", "") }</td>
                  <td colSpan={2}>
                    { player.specialty > 0
                      ? <><i class={ `icon-speciality-${ player.specialty }` } /> { texts.labels_specialty[player.specialty - 1] }</>
                      : "-"
                    }
                  </td>
                </tr>

                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">{ texts.playerDetails.form }</td>
                  <td class="nowrap">
                    { showSkillBar && <>
                      <hattrick-bar
                        level={ player.formNumber }
                        max={ 8 }
                        denomination={ skillPresentation === 2 && texts.labels_skills[player.formNumber] || null }
                        class={ this.getBarColorClass(player.formNumber, 8) }
                      ></hattrick-bar>
                      { (!hideNumbersAfterDenominations || skillPresentation === SkillPresentation.OnlyBar) &&
                        <span class="denominationNumber">{ player.formNumber }</span>
                      }
                    </> }
                    { skillPresentation === 3 &&
                      <Denomination level={ player.formNumber } type="skill" text={ texts.labels_skills[player.formNumber] } max={ 8 } showNumber={ !hideNumbersAfterDenominations }></Denomination>
                    }
                  </td>
                </tr>

                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">{ texts.players.stamina }</td>
                  <td class="nowrap">
                    { skillPresentation < 3 && <>
                      <hattrick-bar
                        level={ player.staminaSkill }
                        max={ 9 }
                        denomination={ skillPresentation === 2 && texts.labels_skills[player.staminaSkill] || null }
                        class={ this.getBarColorClass(player.staminaSkill, 9) }
                      ></hattrick-bar>
                      { (!hideNumbersAfterDenominations || skillPresentation === 1) &&
                        <span class="denominationNumber">{ player.staminaSkill }</span>
                      }
                    </> }
                    { skillPresentation === 3 &&
                      <Denomination level={ player.staminaSkill } type="skill" text={ texts.labels_skills[player.staminaSkill] } max={ 9 } showNumber={ !hideNumbersAfterDenominations }></Denomination>
                    }
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          { ("keeperSkill" in player) &&
            <div class="transferPlayerSkills">
              <table>
                <tbody>
                  { this.renderSkillRow(texts.players.SkillKeeper, player.keeperSkill) }
                  { this.renderSkillRow(texts.players.SkillDefending, player.defenderSkill) }
                  { this.renderSkillRow(texts.players.SkillPlaymaking, player.playmakerSkill) }
                  { this.renderSkillRow(texts.players.SkillWinger, player.wingerSkill) }
                  { this.renderSkillRow(texts.players.SkillPassing, player.passerSkill) }
                  { this.renderSkillRow(texts.players.SkillScoring, player.scorerSkill) }
                  { this.renderSkillRow(texts.players.SkillSetPieces, player.kickerSkill) }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </>;
  }

  renderSkillRow(title: string, level: number) {
    const { language, skillPresentation, hideNumbersAfterDenominations } = this;
    const labels = language.texts.labels_skills;

    const showSkillBar = (skillPresentation === SkillPresentation.OnlyBar || skillPresentation === SkillPresentation.BarAndText);
    const showSkillBarTextDenomination = (skillPresentation === SkillPresentation.BarAndText);
    const showLevelColumn = (showSkillBar && (skillPresentation === SkillPresentation.OnlyBar || !hideNumbersAfterDenominations))

    return (
      <tr>
        <td class="right">
          { title }
        </td>
        <td colSpan={2}>
          { showSkillBar
            ? <hattrick-bar level={ level } denomination={ showSkillBarTextDenomination && labels[level] || "" }></hattrick-bar>
            : <Denomination level={ level } type="skill" text={ labels[level] } showNumber={ !hideNumbersAfterDenominations }></Denomination>
          }
        </td>
        { showLevelColumn && <>
          <td>
            { level }
          </td>
        </>}
      </tr>
    );
  }
}

function getFullPlayerName(player: any): string {
  if (!player) return "";

  let names = fixPlayerNames(player);

  if (!names.nickName && !names.firstName) {
    return names.lastName;
  } else if (!names.nickName) {
    return names.firstName + " " + names.lastName;
  } else {

    let nicknameDisplay;

    if (names.nickName.length === 2 && names.nickName.substring(1, 2) === ".") {
      nicknameDisplay = names.nickName;
    } else {
      nicknameDisplay = `'${names.nickName}'`;
    }

    return names.firstName + " " + nicknameDisplay + " " + names.lastName;

  }
}

function fixPlayerNames(player) {
  return {
    firstName: player.firstName || player.firstname,
    lastName: player.lastName || player.lastname,
    nickName: player.nickName || player.nickname,
  };
}

const enum SkillPresentation {
  OnlyBar = 1,
  BarAndText = 2,
  OnlyText = 3,
}

interface IDenominationProps {
  level: number;
  text: string;
  max?: number;
  type?: string;
  showNumber?: boolean;
}
const Denomination: FunctionalComponent<IDenominationProps> = (props, _children) => <>
  <a
    href={ `/Help/Rules/AppDenominations.aspx?lt=${ props.type || "skill" }&amp;ll=${ props.level }#${ props.type || "skill" }` }
    title={ `${ props.level }/${ props.max || 20 }` }
    class="skill"
    tabIndex={ -1 }
  >
    { props.text }
  </a>
  { props.showNumber !== false &&
    <span class="shy denominationNumber">({ props.level })</span>
  }
</>;

function jsxReplacer(text: string, context: { [tag: string]: string | (() => string) }) {

  let tagRegex = /\[#?(.*?)\]/gi;
  let tagResult;

  let parts = text.replace(/\[#?.*?\]/gi, "¤").split("¤");
  
  let tags = [];
  while (tagResult = tagRegex.exec(text)) tags.push(tagResult[1]);

  let allParts = [];

  for (let i = 0; i < parts.length; i++) {
    allParts.push(parts[i]);
    
    let value = context[tags[i]];
    if (value) {
      allParts.push(typeof value === "function" ? value() : value);
    }
  }

  return allParts.map(x => x);
}
