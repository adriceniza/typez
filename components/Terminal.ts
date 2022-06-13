import { loopLines, pushLine } from "./terminal_lines";
import * as AUTH from "../services/auth.service";
import * as COMMANDS from "../constants/commands";
import * as CONSTANTS from "../constants/constants";
import ITerminal from "../Interfaces/ITerminal";
import styles from "../styles/Loader.module.css";
import { NextRouter } from "next/router";
let value = "";

const clsInputValue: ITerminal["clsInputValue"] = (setInput: any) => {
  value = "";
  setInput(value);
};
const commandHandler: ITerminal["commandHandler"] = (
  command: string,
  router: NextRouter
) => {
  switch (command) {
    case "help":
      loopLines(COMMANDS.help, 0, 100);
      return true;
    case "login":
      router.push("/?login");
      return true;
    case "logout":
      AUTH.logout();
      return true;
    case "cls" || "clear":
      document.getElementById("terminal_lines")!.innerHTML = "";
      loopLines(CONSTANTS.banner, 0, 100, true);
      return true;
    case "exit":
      window.close();
      return true;
    case "test":
      router.push("/?test");
      return true;
    case "settings":
      router.push("/?settings");
      return true;

    default:
      {
        command !== "" && pushLine(command);
      }

      return false;
  }
};

export { clsInputValue, commandHandler, styles };
