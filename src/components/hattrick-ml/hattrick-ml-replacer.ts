export class HattrickMlReplacer {
  base: string = "";
  internalLinkTarget: string = "_self";

  getLink(url: string, text: string): string {
    if (url[0] === "/" && !url.startsWith("//:")) {
      url = "/" + this.base + url;
    }
    return `<a href="${url}" target="_blank">${text}</a>`;
  }
  getPlayerId(playerId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Players/Player.aspx?playerId=${playerId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getTeamId(teamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/?TeamID=${teamId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getNtTeamId(teamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/NationalTeam/NationalTeam.aspx?teamId=${teamId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getUserId(userId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Manager/?userId=${userId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=Hattrick" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getTournamentMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=HTOIntegrated" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getLeagueId(leagueId: number | string, text: string): string {
    return `<a href="${this.base}/World/Series/?LeagueLevelUnitID=${leagueId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getYouthTeamId(youthTeamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Youth/?YouthTeamID=${youthTeamId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getYouthPlayerId(youthPlayerId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Players/YouthPlayer.aspx?YouthPlayerID=${youthPlayerId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getYouthMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=Youth" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getYouthLeagueId(youthLeagueId: number | string, text: string): string {
    return `<a href="${this.base}/World/Series/YouthSeries.aspx?YouthLeagueId=${youthLeagueId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getPost(
    threadId: number | string,
    postnumber: number | string,
    text: string,
  ): string {
    return `<a href="${this.base}/Forum/Read.aspx?t=${threadId}&n=${postnumber}&mr=0" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getArticleId(articleIdId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Press/?ArticleID=${articleIdId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getFederationId(federationId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Federations/Federation.aspx?AllianceID=${federationId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getTournamentId(tournamentId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Tournaments/Tournament.aspx?tournamentId=${tournamentId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getKitId(kitId: number | string, text: string): string {
    return `<a href="${this.base}/Community/KitSearch/?KitID=${kitId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getRegionId(regionId: number | string, text: string): string {
    return `<a href="${this.base}/World/Regions/Region.aspx?RegionID=${regionId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getHattrickLeagueId(leagueId: number | string, text: string): string {
    return `<a href="${this.base}/World/Leagues/League.aspx?LeagueID=${leagueId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getStadiumId(stadiumId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Stadium/?stadiumId=${stadiumId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
  getForumId(forumId: number | string, text: string): string {
    return `<a href="${this.base}/Forum/Overview.aspx?f=${forumId}" target="${this.internalLinkTarget}">${text}</a>`;
  }
}
