#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argv = require("minimist")(process.argv.slice(0));
const constants_1 = require("./utils/constants");
const crawler_1 = __importDefault(require("./modules/crawler"));
const gui_1 = __importDefault(require("./modules/gui"));
(async () => {
    var _a;
    const gui = new gui_1.default();
    gui.loading("Inicializando navegador\n");
    const crawler = await crawler_1.default.initialize({
        headless: argv.s ? false : "new",
    });
    gui.stopLoading();
    gui.loading("Extraindo dados das partidas\n");
    const leagues = await crawler.searchTeamMatches((_a = argv.t) !== null && _a !== void 0 ? _a : constants_1.DEFAULT_TEAM_SEARCH);
    gui.stopLoading();
    gui.displayLeagues(leagues);
    await crawler.close();
})();
