import { Component, h, Host, Listen, Method, Prop, State, Fragment, FunctionalComponent } from "@stencil/core";
import { createPopper, Instance } from "@popperjs/core";
import { grouped } from "../../global/utils";

const tempDenominations = {
  0: "obefintlig",
  1: "katastrofal",
  2: "usel",
  3: "dålig",
  4: "hyfsad",
  5: "bra",
  6: "ypperlig",
  7: "enastående",
  8: "fenomenal",
  9: "unik",
  10: "legendarisk",
  11: "gudabenådad",
  12: "övernaturlig",
  13: "oförglömlig",
  14: "himmelsk",
  15: "titanisk",
  16: "utomjordisk",
  17: "mytomspunnen",
  18: "magisk",
  19: "utopisk",
  20: "gudomlig"
};

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

  @State() private player: any;

  private _root = (location.href.includes(".hattrick.local")) ? "/htweb"
                : (location.href.includes("localhost")) ? "https://www.hattrick.org"
                : "";

  @Method()
  @Listen("mouseenter")
  @Listen("focus")
  async show() {
    if (!this._loading) {
      this._loading = fetch(`https://m.hattrick.org/api/player/player/${this.playerId}`).then(async res => {
        return this.player = await res.json();
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
    const { player } = this;

    return <>
      <h3 class="float_left">
        { 0 < player.playerNumber && player.playerNumber < 100 && `${ player.playerNumber }.` }
        { getFullPlayerName(player) }
        { player.health >= 1 &&
          <i class="icon-injury injury-with-badge" data-injury-length={ player.health === 999 ? "∞" : player.health } title="Förväntas inte återhämta sig" aria-label="Förväntas inte återhämta sig" role="img"></i>
        }
        
      </h3>
      <span class="float_right">
        <a href={ `${ this._root }/World/Leagues/League.aspx?LeagueID=${ player.leagueId }` } class="flag inner">
          <hattrick-flag leagueId={ player.leagueId }></hattrick-flag>
        </a>
      </span>
      <br class="clear" />
      
      { player.playerCategoryId > 0 &&
        <div title="Målvakt" class="player-category float_right">MV</div>
      }

      <p>
        Har <SkillLink level={ 20 } /> rutin och <SkillLink level={ 2 } max={ 7 } type="leadership" /> ledarförmåga.
        Har <SkillLink level={ 20 } /> klubbkänsla.
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
                  <td class="right">Ålder</td>
                  <td colSpan={2} class="nowrap">{ player.years } år och { player.days } dagar</td>
                </tr>

                <tr>
                  <td class="right"> TSI</td>
                  <td colSpan={2}>{ player.tsi }</td>
                </tr>


                <tr>
                  <td class="right">Lön</td>
                  <td colSpan={2} class="nowrap">{ grouped(player.salary) } kr/vecka</td>
                </tr>


                <tr>
                  <td class="right">Specialitet</td>
                  <td colSpan={2}>-</td>
                </tr>
                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">
                    Form
                  </td>
                  <td class="nowrap">
                    <hattrick-bar
                      level={ player.formNumber }
                      max={ 8 }
                      denomination={ tempDenominations[player.formNumber] }
                      class={ this.getBarColorClass(player.formNumber, 8) }
                    ></hattrick-bar>
                  </td>
                  <td></td>
                </tr>

                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">
                    Kondition
                  </td>
                  <td class="nowrap">
                    <hattrick-bar
                      level={ player.staminaSkill }
                      max={ 9 }
                      denomination={ tempDenominations[player.staminaSkill] }
                      class={ this.getBarColorClass(player.staminaSkill, 9) }
                    ></hattrick-bar>
                  </td>
                  <td style={{ "width": "50px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="transferPlayerSkills" style={{ "display": "none" }}>
            <table>
              <tbody>
                <tr>
                  <td class="right">
                    Målvakt
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.keeper } denomination={ tempDenominations[player.keeper] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Försvar
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.defending } denomination={ tempDenominations[player.defending] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Spelupplägg
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.playmaking } denomination={ tempDenominations[player.playmaking] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Ytter
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.winger } denomination={ tempDenominations[player.winger] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Framspel
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.passing } denomination={ tempDenominations[player.passing] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Målgörare
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.scorer } denomination={ tempDenominations[player.scorer] }></hattrick-bar>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Fasta sit.
                  </td>
                  <td colSpan={2}>
                    <hattrick-bar level={ player.kicker } denomination={ tempDenominations[player.kicker] }></hattrick-bar>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

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

interface ISkillLinkProps {
  level: number;
  max?: number;
  type?: string;
  showNumber?: boolean;
}
const SkillLink: FunctionalComponent<ISkillLinkProps> = (props, _children) => <>
  <a
    href={ `/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=${ props.level }#${ props.type || "skill" }` }
    title={ `${ props.level }/${ props.max || 20 }` }
    class="skill"
  >
    { tempDenominations[props.level] }
  </a>
  { props.showNumber !== false &&
    <span class="shy denominationNumber">({ props.level })</span>
  }
</>;