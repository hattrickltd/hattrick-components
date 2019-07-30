export class HattrickMlReplacer {

  base: string = "";

  getLink(url: string, text: string): string {
    if (url[0] === "/" && !url.startsWith("//:")) {
      url = "/" + this.base + url;
    }
    return `<a href="${url}" target="_blank">${text}</a>`;
  }
  getPlayerId(playerId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Players/Player.aspx?playerId=${playerId}">${text}</a>`;
  }
  getTeamId(teamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/?TeamID=${teamId}">${text}</a>`;
  }
  getNtTeamId(teamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/NationalTeam/NationalTeam.aspx?teamId=${teamId}">${text}</a>`;
  }
  getUserId(userId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Manager/?userId=${userId}">${text}</a>`;
  }
  getMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=Hattrick">${text}</a>`;
  }
  getTournamentMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=HTOIntegrated">${text}</a>`;
  }
  getLeagueId(leagueId: number | string, text: string): string {
    return `<a href="${this.base}/World/Series/?LeagueLevelUnitID=${leagueId}">${text}</a>`;
  }
  getYouthTeamId(youthTeamId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Youth/?YouthTeamID=${youthTeamId}">${text}</a>`;
  }
  getYouthPlayerId(youthPlayerId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Players/Player.aspx?playerId=${youthPlayerId}">${text}</a>`;
  }
  getYouthMatchId(matchId: number | string, text: string): string {
    return `<a href="${this.base}/Club/Matches/Match.aspx?matchID=${matchId}&SourceSystem=Youth">${text}</a>`;
  }
  getYouthLeagueId(youthLeagueId: number | string, text: string): string {
    return `<a href="${this.base}/World/Series/YouthSeries.aspx?YouthLeagueId=${youthLeagueId}">${text}</a>`;
  }
  getPost(threadId: number | string, postnumber: number | string, text: string): string {
    return `<a href="${this.base}/Forum/Read.aspx?t=${threadId}&n=${postnumber}&mr=0">${text}</a>`;
  }
  getArticleId(articleIdId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Press/?ArticleID=${articleIdId}">${text}</a>`;
  }
  getFederationId(federationId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Federations/Federation.aspx?AllianceID=${federationId}">${text}</a>`;
  }
  getTournamentId(tournamentId: number | string, text: string): string {
    return `<a href="${this.base}/Community/Tournaments/Tournament.aspx?tournamentId=${tournamentId}">${text}</a>`;
  }
  getKitId(kitId: number | string, text: string): string {
    return `<a href="${this.base}/Community/KitSearch/?KitID=${kitId}">${text}</a>`;
  }
}
