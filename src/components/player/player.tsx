import { Component, h, Host, Listen, Method, Prop, State } from "@stencil/core";
import { createPopper, Instance } from "@popperjs/core";
import { Fragment } from "../../global/fragment";

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

  renderPlayer() {
    const { player } = this;

    return <Fragment>
      <h3 class="float_left">
        1. <a href={ `${ this._root }/Club/Players/Player.aspx?playerId=381029290&amp;BrowseIds=381029290,338118913,366780987,357797739,354035584,373440282,376212134,373226030,411260844,420734612,416806193,396875493,400746060,376143522,284908781,431238309,416158688,425360362,420123206,431776579,419927801,431849019,457669484` } title="Alfa Diallo">Alfa Diallo</a>&nbsp;<i class="icon-injury injury-with-badge" data-injury-length="∞" title="Förväntas inte återhämta sig" aria-label="Förväntas inte återhämta sig" role="img"></i>
      </h3>
      <span class="float_right"><a href={ `${ this._root }/World/Leagues/League.aspx?LeagueID=121` } class="flag inner"><img src={ `${ this._root }/Img/Icons/transparent.gif` } style={{ "background": `transparent url(${ this._root }/Img/Flags/flags.gif) no-repeat -2420px 0` }} alt="Senegal" title="Senegal" /></a></span>
      <br class="clear" />
      <div title="Målvakt" class="player-category float_right">MV</div>

      <p style={{ "padding-top": "5px", "padding-bottom": "9px", "max-height": "999999px" }}>Har <a href={ `${ this._root }/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=20#skill` } title="20/20" class="skill">gudomlig</a><span class="shy denominationNumber">(20)</span> rutin och <a href={ `${ this._root }/Help/Rules/AppDenominations.aspx?lt=leadership&amp;ll=2#leadership` } title="2/7" class="skill">usel</a><span class="shy denominationNumber">(2)</span> ledarförmåga. Har <a href={ `${ this._root }/Help/Rules/AppDenominations.aspx?lt=skill&amp;ll=20#skill` } title="20/20" class="skill">gudomlig</a><span class="shy denominationNumber">(20)</span> klubbkänsla.</p>

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
                  <td colSpan={2} class="nowrap">43 år och 44 dagar</td>
                </tr>

                <tr>
                  <td class="right"> TSI</td>
                  <td colSpan={2}>50</td>
                </tr>


                <tr>
                  <td class="right">Lön</td>
                  <td colSpan={2} class="nowrap">3&nbsp;840&nbsp;<span title="3&nbsp;200&nbsp;kr/vecka, undantaget 20% bonus">kr/vecka</span></td>
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
                    <div class="ht-bar" {...{ level: 3, max: 8, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">dålig</span></div><div title="dålig" class="bar-level low" style={{ "width": "38%" }}><span class="bar-denomination">dålig</span></div></div><span style={{ "position": "absolute" }}><span class="denominationNumber" title="3/8">&nbsp;3</span></span>
                  </td>
                  <td></td>
                </tr>

                <tr class="playerSkillsTableFormAndStamina">
                  <td class="right">
                    Kondition
                  </td>
                  <td class="nowrap">
                    <div class="ht-bar" {...{ level: 2, max: 9, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">usel</span></div><div title="usel" class="bar-level verylow" style={{ "width": "22%" }}><span class="bar-denomination">usel</span></div></div><span style={{ "position": "absolute" }}><span class="denominationNumber" title="2/9">&nbsp;2</span></span>
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
                    <div class="ht-bar" {...{ level: 5, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">bra</span></div><div title="bra" class="bar-level" style={{ width: "25%" }}><span class="bar-denomination">bra</span></div></div></td><td class="right"><span class="denominationNumber" title="5/20">&nbsp;5</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Försvar
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 0, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">obefintlig</span></div></div></td><td class="right"><span class="denominationNumber" title="0/20">&nbsp;0</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Spelupplägg
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 0, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">obefintlig</span></div></div></td><td class="right"><span class="denominationNumber" title="0/20">&nbsp;0</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Ytter
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 0, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">obefintlig</span></div></div></td><td class="right"><span class="denominationNumber" title="0/20">&nbsp;0</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Framspel
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 0, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">obefintlig</span></div></div></td><td class="right"><span class="denominationNumber" title="0/20">&nbsp;0</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Målgörare
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 0, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">obefintlig</span></div></div></td><td class="right"><span class="denominationNumber" title="0/20">&nbsp;0</span>
                  </td>
                </tr>
                <tr>
                  <td class="right">
                    Fasta sit.
                  </td>
                  <td colSpan={2}>
                    <div class="ht-bar" {...{ level: 13, max: 20, cap: -1, isCap: 0 }}><div class="bar-max"><span class="bar-denomination">oförglömlig</span></div><div title="oförglömlig" class="bar-level" style={{ width: "65%" }}><span class="bar-denomination">oförglömlig</span></div></div></td><td class="right"><span class="denominationNumber" title="13/20">13</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </Fragment>;
  }
}
