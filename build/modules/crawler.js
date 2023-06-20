"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const constants_1 = require("../utils/constants");
const functions_1 = require("../utils/functions");
class Crawler {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
    }
    static async initialize(options) {
        try {
            const browser = await puppeteer_1.default.launch(options);
            const page = await browser.newPage();
            await page.setViewport({ width: 1080, height: 1024 });
            return new Crawler(browser, page);
        }
        catch (e) {
            console.log(e);
            (0, functions_1.stopExecution)("Erro ao inicializar browser, tente novamente");
        }
    }
    async checkLeaguesNotFound() {
        try {
            const checkTimeout = 3000;
            await this.page.waitForSelector(constants_1.SELECTORS.LEAGUES_NOT_FOUND_MESSAGE.$, {
                timeout: checkTimeout,
            });
            (0, functions_1.stopExecution)(`Nehuma partida encontrada no momento`);
        }
        catch (e) {
            /* leagues found */
        }
    }
    async getLeagueContainerElements() {
        this.checkLeaguesNotFound();
        await this.page.waitForSelector(constants_1.SELECTORS.LEAGUE_CONTAINER.$);
        const $leagueElements = await this.page.$$(constants_1.SELECTORS.LEAGUE_CONTAINER.$);
        return $leagueElements;
    }
    async extractLeagueInfos($leagueElement) {
        const league = await $leagueElement.evaluate(($leagueEl, SELECTORS) => {
            const elText = (element) => { var _a, _b; return (_b = (_a = element === null || element === void 0 ? void 0 : element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : ""; };
            const $leagueName = $leagueEl.querySelector(SELECTORS.LEAGUE_CONTAINER.LEAGUE_NAME.$);
            const league = {
                name: elText($leagueName),
                matches: [],
            };
            const matchDates = $leagueEl.querySelectorAll(SELECTORS.LEAGUE_CONTAINER.MATCH_DATES.$);
            const matchInfos = $leagueEl.querySelectorAll(SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.$);
            for (let matchIndex = 0; matchIndex < matchDates.length; matchIndex++) {
                const odsElements = matchInfos[matchIndex].querySelectorAll(SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_ODS.$);
                const teamElements = matchInfos[matchIndex].querySelectorAll(SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_TEAMS.$);
                const $time = matchInfos[matchIndex].querySelector(SELECTORS.LEAGUE_CONTAINER.MATCH_INFO_CONTAINERS.MATCH_TIME.$);
                let match = {
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
        }, constants_1.SELECTORS);
        return league;
    }
    async searchTeamMatches(team) {
        try {
            const leagues = [];
            await this.page.goto(`${constants_1.ESTRELABET_SEACH_URL}${team}`);
            const $leagueElements = await this.getLeagueContainerElements();
            for (let $leagueElement of $leagueElements) {
                const league = await this.extractLeagueInfos($leagueElement);
                leagues.push(league);
            }
            return leagues;
        }
        catch (e) {
            (0, functions_1.stopExecution)("Erro ao extrair dados, tente novamente");
        }
    }
    async close() {
        var _a;
        await ((_a = this.browser) === null || _a === void 0 ? void 0 : _a.close());
    }
}
exports.default = Crawler;
