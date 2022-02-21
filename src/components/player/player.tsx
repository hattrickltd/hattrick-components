import { Component, h, Host, Listen, Method, Prop, State, Fragment, FunctionalComponent } from "@stencil/core";
import { createPopper, Instance } from "@popperjs/core";
import { currency } from "../../global/utils";

declare const window: any;

@Component({
  tag: "hattrick-player",
  styleUrl: "player.css",
  scoped: true,
})
export class Player {

  private _content: HTMLElement;
  private _tooltip: HTMLElement;

  private _popper: Instance;
  private _loading: Promise<any>;

  @Prop() playerId: number;
  @Prop() countryId: number;
  @Prop() languageId: number = 2;

  @State() private player: any;
  @State() private language: any;
  @State() private country: any;

  private _root = (location.href.includes(".hattrick.local")) ? "/htweb"
                : (location.href.includes("localhost")) ? "https://www.hattrick.org"
                : "";

  @Method()
  @Listen("mouseenter")
  @Listen("focus")
  async show() {
    if (!this._loading) {
      this._loading = Promise.all([
        fetch(`https://m.hattrick.org/api/player/player/${this.playerId}`).then(res => res.json()),
        fetch(`https://laptop-marcus.hattrick.local/api/language/getPlayerTexts/${ this.languageId }?cultureCode=en-US`).then(res => res.json()),
        fetch(`https://laptop-marcus.hattrick.local/api/world/getCountry/${ this.countryId }`).then(res => res.json()),
      ]).then(([player, language, country]) => {
        this.player = player;
        this.language = language;
        this.country = country;
      });
    }

    this._tooltip.setAttribute("show", "");
    this._popper.update();
  }

  @Method()
  @Listen("mouseleave")
  @Listen("blur")
  async hide() {
    this._tooltip.removeAttribute("show");
  }

  componentDidLoad() {
    this._popper = createPopper(this._content, this._tooltip, {
      placement: "top",
    });
  }

  render() {
    return <Host>
      <span ref={el => this._content = el}><slot /></span>
      <div class="playertooltip playerList" aria-hidden="true" ref={el => this._tooltip = el}>
        {this.player ? this.renderPlayer() : this.renderLoading()}
      </div>
    </Host>;
  }

  renderLoading() {
    return <img class="loading" src={ `${ this._root }/Img/Shop/loading.gif` } />;
  }
  
  getBarColorClass(level: number, max: number) {
    let percent = level / max;
    return ["verylow", "low", "high", "veryhigh"][Math.min(Math.floor(percent * 4), 3)];
  }

  renderPlayer() {
    const { player, language, country } = this;
    const texts = language.texts;

    const replacer = new window.HT.TagReplacer();

    return <>
      <h3 class="float_left">
        { 0 < player.playerNumber && player.playerNumber < 100 && `${ player.playerNumber }.` }
        { getFullPlayerName(player) }
        { player.health >= 1 &&
          <i class="icon-injury injury-with-badge" data-injury-length={ player.health === 999 ? "∞" : player.health } role="img"></i>
        }
        
      </h3>
      <span class="float_right">
        <a href={ `${ this._root }/World/Leagues/League.aspx?LeagueID=${ player.leagueId }` } class="flag inner">
          <hattrick-flag leagueId={ player.leagueId } title={ player.leagueName }></hattrick-flag>
        </a>
      </span>
      <br class="clear" />
      
      { player.playerCategoryId > 0 &&
        <div class="player-category float_right">{ texts.playerCategories[player.playerCategoryId * 2] }</div>
      }

      <p>
        {/* TODO: { isTrainer  && <>
          { translate(texts.playerDetails.cochSkillAndTrainerType, {
            "Skill1": () => <DenominationLink level={ this.player.trainerSkill } type="skillshort" text={ texts.labels_skills[this.player.gentleness] } />,
            "TrainerType": texts.public_TrainerTypes[["Defensive", "Offensive", "Balanced"][this.player.trainerType]],
          }) }
        </> } */}

        { jsxReplacer(texts.playerDetails.personality, {
          "Gentleness": () => <Denomination level={ this.player.gentleness } type="gentleness" text={ texts.labels_gentleness[this.player.gentleness] } />,
          "Agressiveness": () => <Denomination level={ this.player.aggressiveness } type="aggressiveness" text={ texts.labels_aggressiveness[this.player.aggressiveness] } />,
          "Honesty": () => <Denomination level={ this.player.honesty } type="honesty" text={ texts.labels_honesty[this.player.honesty] } />,
        }) }

        <br />

        { jsxReplacer(texts.playerDetails.experienceAndLeadership, {
          "Experience": () => <Denomination level={ this.player.experience } type="skill" text={ texts.labels_skills[this.player.experience] } />,
          "Leadership": <Denomination level={ this.player.leadership } type="leadership" text={ texts.labels_skills[this.player.leadership] } />,
        })
        } { jsxReplacer(texts.playerDetails_3.hasLoyalty, {
          "Loyalty": () => <Denomination level={ this.player.loyalty } type="skill" text={ texts.labels_skills[this.player.loyalty] } />,
        }) }
      </p>

      <div class="flex">
        <div class="flex-fixed">
          <hattrick-avatar parts={player.avatar} base={ `${ this._root }/Img/Avatar/` }></hattrick-avatar>
        </div>
        <div class="flex flex-space-between">
          <div class="transferPlayerInformation">
            <table>
              <tbody>
                <tr>
                  <td class="right">{ texts.labels_pagetexts.owner }</td>
                  <td colSpan={2} class="nowrap">
                    <a href="#">{ player.teamname }</a>
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
                  <td colSpan={2}>{ player.tsi }</td>
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
                    <hattrick-bar
                      level={ player.formNumber }
                      max={ 8 }
                      denomination={ texts.labels_skills[player.formNumber] }
                      class={ this.getBarColorClass(player.formNumber, 8) }
                    ></hattrick-bar>
                  </td>
                  <td></td>
                </tr>

                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">{ texts.players.stamina }</td>
                  <td class="nowrap">
                    <hattrick-bar
                      level={ player.staminaSkill }
                      max={ 9 }
                      denomination={ texts.labels_skills[player.staminaSkill] }
                      class={ this.getBarColorClass(player.staminaSkill, 9) }
                    ></hattrick-bar>
                  </td>
                  <td style={{ "width": "50px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>

          { player.isTransferListed &&
            <div class="transferPlayerSkills">
              <table>
                <tbody>
                  <tr>
                    <td class="right">
                      { texts.players.SkillKeeper }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.keeperSkill } denomination={ texts.labels_skills[player.keeperSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillDefending }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.defenderSkill } denomination={ texts.labels_skills[player.defenderSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillPlaymaking }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.playmakerSkill } denomination={ texts.labels_skills[player.playmakerSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillWinger }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.wingerSkill } denomination={ texts.labels_skills[player.wingerSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillPassing }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.passerSkill } denomination={ texts.labels_skills[player.passerSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillScoring }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.scorerSkill } denomination={ texts.labels_skills[player.scorerSkill] }></hattrick-bar>
                    </td>
                  </tr>
                  <tr>
                    <td class="right">
                      { texts.players.SkillSetPieces }
                    </td>
                    <td colSpan={2}>
                      <hattrick-bar level={ player.kickerSkill } denomination={ texts.labels_skills[player.kickerSkill] }></hattrick-bar>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          }

        </div>
      </div>
    </>;
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
