import puppeteer, {
  Browser,
  ElementHandle,
  Page,
  PuppeteerLaunchOptions,
} from "puppeteer";
import { ESTRELABET_SEACH_URL, SELECTORS } from "../utils/constants";
import { League, Match, SELECTORS_TYPE } from "../types/types";

export default class Crawler {
  browser: Browser;
  page: Page;

  private constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  static async initialize(options: PuppeteerLaunchOptions) {
    try {
      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      return new Crawler(browser, page);
    } catch (e) {
      throw new Error("Erro ao inicializar browser");
    }
  }

  private async getLeagueContainerElements(): Promise<
    ElementHandle<any>[] | []
  > {
    await this.page.waitForSelector(SELECTORS.LEAGUE_CONTAINER.$);
    const $leagueElements = await this.page.$$(SELECTORS.LEAGUE_CONTAINER.$);
    return $leagueElements;
  }

  private async extractLeagueInfos(
    $leagueElement: ElementHandle
  ): Promise<League> {
    const league = await $leagueElement.evaluate(
      ($leagueEl, SELECTORS: SELECTORS_TYPE) => {
        const elText = (element: Element) => element?.textContent?.trim() ?? "";

        const $leagueName = $leagueEl.querySelector(
          SELECTORS.LEAGUE_CONTAINER.LEAGUE_NAME.$
        );

        const league: League = {
          name: elText($leagueName),
          matches: [],
        };

        const matchDates = $leagueEl.querySelectorAll(
          SELECTORS.LEAGUE_CONTAINER.MATCH_DATES.$
        );
        const matchInfos = $leagueEl.querySelectorAll(
          SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.$
        );

        for (let matchIndex = 0; matchIndex < matchDates.length; matchIndex++) {
          const odsElements = matchInfos[matchIndex].querySelectorAll(
            SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_ODS.$
          );
          const teamElements = matchInfos[matchIndex].querySelectorAll(
            SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_TEAMS.$
          );

          const $time = matchInfos[matchIndex].querySelector(
            SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_TIME.$
          );

          let match: Match = {
            date: elText(matchDates[matchIndex]),
            time: elText($time),
            team1: elText(teamElements[0]),
            team2: elText(teamElements[1]),
            ods: {
              team1win: elText(odsElements[0]),
              draw: elText(odsElements[1]),
              team2win: elText(odsElements[2]),
            },
          };

          league.matches.push(match);
        }

        return league;
      },
      SELECTORS
    );

    return league;
  }

  async searchTeamMatches(team: string): Promise<League[]> {
    try {
      const leagues: League[] = [];

      await this.page.goto(`${ESTRELABET_SEACH_URL}${team}`);

      const $leagueElements = await this.getLeagueContainerElements();

      for (let $leagueElement of $leagueElements) {
        const league = await this.extractLeagueInfos($leagueElement);
        leagues.push(league);
      }

      return leagues;
    } catch (e) {
      throw new Error("Erro ao extrair dados");
    }
  }

  public async close() {
    await this.browser?.close();
  }
}
