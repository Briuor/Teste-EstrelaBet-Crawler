export const ESTRELABET_SEACH_URL = "https://estrelabet.com/ptb/bet/search/";

export const SELECTORS = {
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
};

export const DEFAULT_TEAM_SEARCH = "cruzeiro";
