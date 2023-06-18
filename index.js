const puppeteer = require("puppeteer");

(async () => {
  const CRUZEIRO_SEACHED_URL = "https://estrelabet.com/ptb/bet/search/cruzeiro";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(CRUZEIRO_SEACHED_URL);
  await page.setViewport({ width: 1080, height: 1024 });

  const leaguesSelector =
    "div .modul-accordion.sportType > div.modul-content > div.league";
  await page.waitForSelector(leaguesSelector);
  const leagueElements = await page.$$(leaguesSelector);

  const leagues = [];
  for (let leagueElement of leagueElements) {
    const newLeague = await leagueElement.evaluate((leagueEl) => {
      const league = { name: "", matches: [] };
      league.name = leagueEl.querySelector(
        ".modul-header .header-text"
      ).textContent.trim();

      const matchDates = leagueEl.querySelectorAll(".date-row");
      const matchInfos = leagueEl.querySelectorAll(
        ".fixture-body.flex-container"
      );

      for (let matchIndex = 0; matchIndex < matchDates.length; matchIndex++) {
        let match = {
          date: "",
          time: "",
          team1: "",
          team2: "",
          ods: { team1win: "", draw: "", team2win: "" },
        };
        match.date = matchDates[matchIndex].textContent.trim();
        match.time = matchInfos[matchIndex].querySelector(".date").textContent;
        const teamElements =
          matchInfos[matchIndex].querySelectorAll(".flex-item.match a");
        match.team1 = teamElements[0].textContent;
        match.team2 = teamElements[1].textContent;
        const odsElements = matchInfos[matchIndex].querySelectorAll(
          ".bet-type.bt-col-1 a .bet-btn-odd"
        );

        match.ods.team1win = odsElements[0].textContent;
        match.ods.draw = odsElements[1].textContent;
        match.ods.team2win = odsElements[2].textContent;

        league.matches.push(match);
      }

      return league;
    });
    leagues.push(newLeague);
    console.log(newLeague);
  }

  for (let league of leagues) {
    console.log(`\n----- Liga: ${league.name} -----`);
    for (let match of league.matches) {
      console.log(`## Partida:\n${match.date} ${match.time}`);
      console.log(`## Times:\n${match.team1} x ${match.team2}`);
      console.log(`## Ods:\n${match.team1}: ${match.ods.team1win}\nEmpate: ${match.ods.draw}\n${match.team2}: ${match.ods.team2win}\n`);
    }
  }
  await page.waitForTimeout(200000);
  await browser.close();
})();
