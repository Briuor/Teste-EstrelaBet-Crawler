const argv = require('minimist')(process.argv.slice(0));
import { DEFAULT_TEAM_SEARCH } from "./utils/constants";
import Crawler from "./crawler";

(async () => {
  const crawler = await Crawler.initialize({ headless: argv.show ? false : 'new' });
  const leagues = await crawler.searchTeamMatches(argv.t ?? DEFAULT_TEAM_SEARCH);
  console.log({leagues});
  
  await crawler.close();
})();
