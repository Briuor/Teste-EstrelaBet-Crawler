#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(0));
import { DEFAULT_TEAM_SEARCH } from "./utils/constants";
import Crawler from "./modules/crawler";
import GUI from "./modules/gui";

(async () => {
  const gui = new GUI();

  gui.loading("Inicializando navegador\n");
  const crawler = await Crawler.initialize({
    headless: argv.show ? false : "new",
  });
  gui.stopLoading();

  gui.loading("Extraindo dados das partidas\n");
  const leagues = await crawler.searchTeamMatches(
    argv.t ?? DEFAULT_TEAM_SEARCH
  );
  gui.stopLoading();

  gui.displayLeagues(leagues);

  await crawler.close();
})();
