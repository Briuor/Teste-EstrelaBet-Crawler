import { SELECTORS } from "./utils/constants";

export interface League {
  name: string;
  matches: any[];
}

export interface Match {
  date: string;
  time: string;
  team1: string;
  team2: string;
  ods: {
    team1win: string;
    draw: string;
    team2win: string;
  };
}

export type SELECTORS_TYPE = typeof SELECTORS;
