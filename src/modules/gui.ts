import ora, { Ora } from "ora";
const Table = require("cli-table");

import { League } from "../types/types";

export default class GUI {
  table = new Table();
  spinner: Ora;

  constructor() {
    console.log(
      `  ___    _           _      ___      _      ___                 _         \r\n | __|__| |_ _ _ ___| |__ _| _ ) ___| |_   \/ __|_ _ __ ___ __ _| |___ _ _ \r\n | _|(_-<  _| \'_\/ -_) \/ _' | _ \\\/ -_)  _| | (__| \'_\/ _' \\ V  V \/ \/ -_) \'_|\r\n |___\/__\/\\__|_| \\___|_\\__,_|___\/\\___|\\__|  \\___|_| \\__,_|\\_\/\\_\/|_\\___|_|  \r\n                                                                          `
    );
  }

  loading(text: string) {
    this.spinner = ora(text).start();
  }

  stopLoading() {
    this.spinner.stop();
  }

  displayLeagues(leagues: League[]) {
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
