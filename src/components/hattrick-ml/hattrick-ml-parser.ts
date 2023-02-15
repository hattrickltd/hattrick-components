import { HattrickMlReplacer } from "./hattrick-ml-replacer";
import { currency } from "../../global/utils";

export class HattrickMlParser {

  static replacer: HattrickMlReplacer;

  private regex = /\[(link|img|b|i|u|ul|ol|li|quote|q|br|hr|playerid|youthplayerid|matchid|youthmatchid|teamid|youthteamid|ntteamid|leagueid|youthleagueid|message|post|allianceid|federationid|userid|articleid|spoiler|tournamentid|tournamentmatchid|kitid|table|money)(?:=([^\]]*?)| ([a-z]*?=[^\]]*?)?)?\](?:(?!.*?\[\1[=.*?|\]]*?\]))(?:(.*?)(\[\/\1\]))?/gi;
  private requireClosing = ["img", "b", "i", "u", "ul", "ol", "li", "quote", "q", "spoiler", "td", "th", "tr", "table", "money"];
  private gotoLink = "https://www.hattrick.org/goto.ashx?path=";

  spoilerText: string;
  currencyRate: number;
  currencyName: string;

  private doesRequireClosing(tag: string): boolean {
    return (this.requireClosing.indexOf(tag) > -1);
  }

  getTags(tag: string): any {
    if (tag)
      return TAGS[tag];
    else return TAGS;
  }

  private removeNonVisibleBrs(input: string): string { // TODO: I was here, try removing the ? again and fixing the \s
    let brBetweenTrRegex = /\[\/tr\]\s*?(?:\[br\])*?\s*?\[tr/gi,
        brBetweenTdRegex = /\[\/(td|th)\]\s*?(?:\[br\])*?\s*?\[(td|th)/gi,
        brBetweenTrAndTdRegex = /(\[tr.*?\])\s*?(?:\[br\])*?\s*?\[(td|th)/gi,
        brBetweenTdAndTrRegex = /\[\/(td|th)\]\s*?(?:\[br\])*?\s*?\[\/tr/gi;

    input = input.trim();
    input = input.replace(brBetweenTrRegex, "[/tr][tr");
    input = input.replace(brBetweenTdRegex, "[/$1][$2");
    input = input.replace(brBetweenTrAndTdRegex, "$1[$2");
    input = input.replace(brBetweenTdAndTrRegex, "[/$1][/tr");

    // remove leading and trailing br
    if (input.startsWith("<br/>")) input = input.slice(5);
    if (input.endsWith("<br/>")) input = input.slice(0, input.length - 5);

    return input;
  }

  private replaceTable(input: string): string {

    input = this.removeNonVisibleBrs(input);

    let rowRegex = /\[(tr)\](.*?)\[\/\1\]/i,
      cellRegex = /\[(td|th)((?:\s\w+=\w+)*?)\](.*?)\[\/\1\]/i;

    let recursive = (str: string, tag: string) => {
      let recRegex;
      if (tag === "table") {
        recRegex = rowRegex;
      } else if (tag === "tr") {
        recRegex = cellRegex;
      }

      let res;
      while ((res = recRegex.exec(str)) !== null) {
        let regMatch = res[0],
          regTag = res[1],
          regAttrs = (res.length >= 4) ? res[2] : undefined, // there are only attributes if there's at least 4 groups
          regContent = res[res.length - 1]; // always last

        if (tag === "table") {
          regContent = recursive(regContent, "tr");
        }

        let attributes = "";
        if (regAttrs) {
          let attrs = regAttrs.split(" ");

          for (let i = 1; i < attrs.length; i++) {
            let parts = attrs[i].split("="),
              attr = parts[0],
              value = parts[1];

            if (attr === "align") {
              if (value === "left") attributes += ` class="left"`;
              if (value === "right") attributes += ` class="right"`;
              if (value === "center") attributes += ` class="center"`;
            }
            if (attr === "colspan") attributes += ` colspan="${value}"`;
            if (attr === "rowspan") attributes += ` rowspan="${value}"`;
          }
        }

        let rs = `<${regTag}${attributes}>${regContent}</${regTag}>`;

        // replace str for sake of while loop.
        // We can only replace the first occurence here otherwise the result += below won't work if there are identical parts of the table
        str = this.replaceFirst(str, regMatch, rs);
      }

      return str;
    };

    input = recursive(input, "table");

    return input;
  }

  /**
   * Replaces all tags within a text.
   * Also escapes all `<`, `>`, `\r\n` with `&lt;`, `&rt;`, `<br/>`.
   *
   * @param str The string which we should do replacements on.
   * @param allowCustomContent If tags can override the default content.
   *
   * @example
   * `hattrickMlProvider.replace("Link to user [userid=8248727]");"` => `Link to user <a>(8248727)</a>`
   * `hattrickMlProvider.replace("Link to user [userid=8248727]HT-Bodin[/userid]", true);` => `Link to user <a>HT-Bodin</a>`
   */
  replace(str: string, allowCustomContent: boolean = false): string {
    if (!str) return str;
    str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;")
             .replace(/\r/g, "").replace(/\n/g, "<br/>")
             .trim();

    let res: RegExpExecArray;

    while ((res = this.regex.exec(str)) !== null) {
      let match = res[0],
        tag = res[1],
        id = res[2],
        attributes = this.parseAttributes(res[3]),
        text = res[4],
        closing = res[5],
        restart = true;

      if (this.doesRequireClosing(tag) && closing === undefined) {
        restart = false;
      } else if (id && (id.indexOf("[") > -1 || id.indexOf("]") > -1)) {
        restart = false;
      } else {
        try {
          switch (tag.toLowerCase()) {
            case "img":
              if (allowCustomContent) {
                let styles = { "display": "block", "max-width": "100%" };
                let classes = ["htMlImage"];

                if (attributes["width"]) {
                  let width = +attributes["width"];
                  if (!Number.isNaN(width)) {
                    if (width < 1 || width > 100) width = 100;
                    styles["max-width"] = width.toString() + "%";
                  }
                }

                let align = attributes["align"];
                if (align === "left") classes.push("float_left");
                if (align === "right") classes.push("float_right");
                if (align === "center") styles["margin"] = "auto";

                let styleAttr = Object.keys(styles).map(x => `${x}:${styles[x]}`).join(";");
                let classAttr = classes.join(" ");

                text = this.xss(text);

                str = str.replace(match, `<img src="${text}" style="${ styleAttr }" class="${ classAttr }" />`);
              } else {
                str = str.replace(match, `[link=${text}]`);
              }
              break;
            case "link":
              if (id) {
                let url = id;
                if (url[0] === "/") {
                  url = this.gotoLink + encodeURIComponent(id);
                }
                url = this.xss(url);
                if (!allowCustomContent || !text) text = `(${this.truncateLinkText(id)})`;

                str = str.replace(match, HattrickMlParser.replacer.getLink(url, text));
              } else {
                str = str.replace(match, match.replace("[", "&lbrack;").replace("]", "&rbrack;")); // replace brackets
              }
              break;
            case "b":
              str = str.replace(match, `<b>${text}</b>`);
              break;
            case "i":
              str = str.replace(match, `<i>${text}</i>`);
              break;
            case "u":
              str = str.replace(match, `<u>${text}</u>`);
              break;
            case "ul":
              str = str.replace(match, `<ul>${text}</ul>`);
              break;
            case "ol":
              str = str.replace(match, `<ol>${text}</ol>`);
              break;
            case "li":
              str = str.replace(match, `<li>${text}</li>`);
              break;
            case "q":
            case "quote":
              if (id) {
                str = str.replace(match, `<blockquote class="quote"><b>${id}:</b><br />${text}</blockquote>`);
              } else {
                str = str.replace(match, `<blockquote class="quote">${text}</blockquote>`);
              }
              break;
            case "br":
              str = str.replace(match, "<br/>");
              break;
            case "hr":
              str = str.replace(match, "<hr/>");
              break;
            case "playerid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getPlayerId(id, text));
              break;
            case "teamid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getTeamId(id, text));
              break;
            case "ntteamid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getNtTeamId(id, text));
              break;
            case "userid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getUserId(id, text));
              break;
            case "matchid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getMatchId(id, text));
              break;
            case "tournamentmatchid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getTournamentMatchId(id, text));
              break;
            case "leagueid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getLeagueId(id, text));
              break;
            case "youthteamid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getYouthTeamId(id, text));
              break;
            case "youthplayerid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getYouthPlayerId(id, text));
              break;
            case "youthmatchid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getYouthMatchId(id, text));
              break;
            case "youthleagueid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getYouthLeagueId(id, text));
              break;
            case "post":
            case "message":
              id = this.xss(id);
              let post = id.split(".");
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getPost(post[0], post[1], text));
              break;
            case "spoiler":
              let spoilerText = (this.spoilerText || "").replace("[link]", "").replace("[/link]", "");

              str = str.replace(match, `
                <blockquote onclick="this.children[0].hidden = !this.children[0].hidden; this.children[1].hidden = !this.children[1].hidden;" class="spoiler">
                  <div><i>${spoilerText}</i></div>
                  <div hidden="true">${text}</div>
                </blockquote>
              `);
              
              // str = str.replace(match, `<ht-ml-spoiler spoiler-text="'${spoiler.text}'">${text}</ht-ml-spoiler>`);
              break;
            case "articleid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getArticleId(id, text));
              break;
            case "allianceid":
            case "federationid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getFederationId(id, text));
              break;
            case "tournamentid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getTournamentId(id, text));
              break;
            case "kitid":
              id = this.xss(id);
              if (!allowCustomContent || !text) text = `(${id})`;
              str = str.replace(match, HattrickMlParser.replacer.getKitId(id, text));
              break;
            case "table":
              text = this.replaceTable(text);
              str = str.replace(match, `<table class="htMlTable">${text}</table>`);
              break;
            case "money":
              let cash = +(text.replace(",", "."));
              if (id) {
                id = id.replace(",", ".")
                let postersCurrencyRate = 1 / (+id / 10) // We're doing 1 / X because the rate in the database is inverted from how it's shown in the interface.
                cash = cash * postersCurrencyRate;
              }
              str = str.replace(match, currency(cash, (this.currencyRate || 10), (this.currencyName || "€"), true));
              break;
            default:
              str = str.replace(match, match.replace("[", "&lbrack;").replace("]", "&rbrack;")); // replace brackets
              restart = false;
          }
        } catch (ex) {
          str = str.replace(match, match.replace("[", "&lbrack;").replace("]", "&rbrack;")); // replace brackets
        }
      }

      if (restart) {
        this.regex.lastIndex = 0; // Restart search from beginning of line. Since we change the string it's unsafe to search again from the middle of the line.
      }
    }
    return str;
  }

  createTag(tag: string, type: string, id: string, content: string): string {
    switch (type) {
      case "id": return `[${tag}=${id || "xxx"}]`;
      case "close": return `[/${tag}]`;
      case "content": return `[${tag}]${content}[/${tag}]`;
      case "idcontent": return `[${tag}=${id}]${content}[/${tag}]`;

      case "open":
      default:
        return `[${tag}]`;
    }
  }

  nl2br = nl2br;
  br2nl = br2nl;

  /**
   * Prevents XSS by for example end a string and inject `onmouseover="some malicious code"`.
   */
  private xss(str: string): string {
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  private replaceFirst(text: string, oldValue: string, newValue: string) {
    let pos = text.indexOf(oldValue);
    if (pos < 0) return text;
    return text.substring(0, pos) + newValue + text.substring(pos + oldValue.length);
  }

  private truncateLinkText(url: string): any {
    let truncateTo = 50;

    if (url.length > truncateTo) {
      if (truncateTo < 11) {
          return url.substring(0, truncateTo) + "..."; // add text and ... at the end
      } else if (url.length < truncateTo + 3) {
          return url.substring(0, truncateTo - 3) + "..."; // add text and ... at the end
      } else {
          return url.substring(0, truncateTo - 5) + "..." + url.substring(url.length - 5);
      }
    }
    return url;
  }

  private parseAttributes(str: string): { [attribute: string]: string } {
    if (!str) return {};

    let attrs: { [attribute: string]: string } = {};

    str.split(" ").forEach((s) => {
      s = s.trim();
      let kv = s.split("=");

      if (kv.length !== 2) return;

      attrs[kv[0].toLowerCase()] = kv[1].toLowerCase();
    });

    return attrs;
  }
}

const TAGS = {
  "b": { name: "bold", tag: "b", canHaveContent: true, requireId: false, url: "/images/forum-tags/bold.png" },
  "i": { name: "italic", tag: "i", canHaveContent: true, requireId: false, url: "/images/forum-tags/italic.png" },
  "u": { name: "underline", tag: "u", canHaveContent: true, requireId: false, url: "/images/forum-tags/underline.png" },
  "q": { name: "quote", tag: "q", canHaveContent: true, requireId: undefined, url: "/images/forum-tags/quote.png" }, // requireId = undefined => can have, but isn't required.
  "quote": { name: "quote", tag: "quote", canHaveContent: true, requireId: undefined },
  "reply": { name: "reply", tag: "quote", canHaveContent: true, requireId: true },
  "spoiler": { name: "spoiler", tag: "spoiler", canHaveContent: true, requireId: false },
  "br": { name: "br", tag: "br", canHaveContent: false, requireId: false },
  "hr": { name: "hr", tag: "hr", canHaveContent: false, requireId: false, url: "/images/forum-tags/hr.png" },
  "playerid": { name: "playerid", tag: "playerid", canHaveContent: false, requireId: true, url: "/images/forum-tags/player.png" },
  "youthplayerid": { name: "youthplayerid", tag: "youthplayerid", canHaveContent: false, requireId: true },
  "matchid": { name: "matchid", tag: "matchid", canHaveContent: false, requireId: true, url: "/images/forum-tags/match.png" },
  "youthmatchid": { name: "youthmatchid", tag: "youthmatchid", canHaveContent: false, requireId: true },
  "teamid": { name: "teamid", tag: "teamid", canHaveContent: false, requireId: true, url: "/images/forum-tags/team.png" },
  "youthteamid": { name: "youthteamid", tag: "youthteamid", canHaveContent: false, requireId: true },
  "leagueid": { name: "leagueid", tag: "leagueid", canHaveContent: false, requireId: true },
  "youthleagueid": { name: "youthleagueid", tag: "youthleagueid", canHaveContent: false, requireId: true },
  "post": { name: "post", tag: "post", canHaveContent: false, requireId: true, url: "/images/forum-tags/post.png" },
  "message": { name: "post", tag: "message", canHaveContent: false, requireId: true },
  "allianceid": { name: "federationid", tag: "allianceid", canHaveContent: false, requireId: true },
  "federationid": { name: "federationid", tag: "federationid", canHaveContent: false, requireId: true, url: "/images/forum-tags/federation.png" },
  "link": { name: "link", tag: "link", canHaveContent: false, requireId: true, url: "/images/forum-tags/link.png" },
  "userid": { name: "userid", tag: "userid", canHaveContent: false, requireId: true },
  "articleid": { name: "articleid", tag: "articleid", canHaveContent: false, requireId: true },
  "tournamentid": { name: "tournamentid", tag: "tournamentid", canHaveContent: false, requireId: true },
  "tournamentmatchid": { name: "tournamentmatchid", tag: "tournamentmatchid", canHaveContent: false, requireId: true },
  "kitid": { name: "kitid", tag: "kitid", canHaveContent: false, requireId: true },
  "table": { name: "table", tag: "table", canHaveContent: true, requireId: false },


  //    //"table": { tag: "table", canHaveContent: true, requireId: false, children: {
  //    //    "tr": { tag: "tr", canHaveContent: true, requireId: false, children: {
  //    //        "td": { tag: "td", canHaveContent: true, requireId: false },
  //    //        "th": { tag: "th", canHaveContent: true, requireId: false },
  //    //    } }
  //    //} }
};

export function nl2br(text: string): string {
  return text.replace(/\r\n|\r|\n/g, "[br]");
}

export function br2nl(text: string): string {
  return text.replace(/\[br\]/g, "\n");
}
