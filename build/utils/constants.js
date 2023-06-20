"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TEAM_SEARCH = exports.SELECTORS = exports.ESTRELABET_SEACH_URL = void 0;
exports.ESTRELABET_SEACH_URL = "https://estrelabet.com/ptb/bet/search/";
exports.SELECTORS = {
    LEAGUE_CONTAINER: {
        $: "div .modul-accordion.sportType > div.modul-content > div.league",
        LEAGUE_NAME: { $: ".modul-header .header-text" },
        MATCH_DATES: { $: ".date-row" },
        MATCH_INFO_CONTAINERS: {
            $: ".fixture-body.flex-container",
            MATCH_ODS: { $: ".bet-type.bt-col-1 a .bet-btn-odd" },
            MATCH_TEAMS: { $: ".flex-item.match a" },
            MATCH_TIME: { $: ".date" },
        },
    },
    LEAGUES_NOT_FOUND_MESSAGE: { $: '[content="MESSAGES.NO_DATA_FOUND"]' },
};
exports.DEFAULT_TEAM_SEARCH = "cruzeiro";
