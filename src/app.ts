const argv = require("minimist")(process.argv.slice(0));
import { DEFAULT_TEAM_SEARCH } from "./utils/constants";
import Crawler from "./modules/crawler";
import GUI from "./modules/gui";

try {
  (async () => {
    const gui = new GUI();

    gui.loading(" Inicializando navegador");
    const crawler = await Crawler.initialize({
      headless: argv.s ? false : "new",
    });
    gui.stopLoading();

    gui.loading(" Extraindo dados das partidas");
    const leagues = await crawler.searchTeamMatches(
      argv.t ?? DEFAULT_TEAM_SEARCH
    );
    gui.stopLoading();

    gui.displayLeagues(leagues);

    await crawler.close();
  })();
} catch (e) {
  console.error(e.message);
}
