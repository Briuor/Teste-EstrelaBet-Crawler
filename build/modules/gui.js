"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const Table = require("cli-table");
class GUI {
    constructor() {
        this.table = new Table({ colWidths: [20, 15, 15, 15, 15] });
        console.log(`\r\n  ___    _           _      ___     _   \r\n | __|__| |_ _ _ ___| |__ _| _ )___| |_ \r\n | _|(_-|  _| \'_\/ -_| \/ _' | _ \/ -_|  _|\r\n |___\/__\/\\__|_| \\___|_\\__,_|___\\___|\\__|\r\n  \/ __|_ _ __ ___ __ _| |___ _ _        \r\n | (__| \'_\/ _' \\ V  V | \/ -_| \'_|       \r\n  \\___|_| \\__,_|\\_\/\\_\/|_\\___|_|         \r\n                                        \r\n`);
    }
    loading(text) {
        this.spinner = (0, ora_1.default)(text).start();
    }
    stopLoading() {
        this.spinner.stop();
    }
    displayLeagues(leagues) {
        for (let league of leagues) {
            this.table.push([league.name, " ", " ", " ", " "]);
            for (let match of league.matches) {
                const date = match.date.split(" ");
                this.table.push([
                    `${date[0]}\n${date[1]} ${match.time}`,
                    `${match.team1}\n${match.team2}`,
                    `${match.ods.team1win}\n${match.team1}`,
                    `${match.ods.draw}\nEmpate`,
                    `${match.ods.team2win}\n${match.team2}`,
                ]);
            }
        }
        console.log(this.table.toString());
    }
}
exports.default = GUI;
