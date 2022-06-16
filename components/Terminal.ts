import { loopLines, pushLine } from "./terminal_lines";
import * as CONSTANTS from "../constants";
import ITerminal from "../Interfaces/ITerminal";
import styles from "../styles/Loader.module.css";
import { NextRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import updInputBefore from "../hooks/updInputBefore";
import ProfileCard from "./profileAsciiCard";
import {
  getAverageWPM,
  getLastGameRecord,
} from "../services/gamerecords.service";
import asciiGameRecord from "./asciiGameRecord";
let value = "";
const clsInputValue: ITerminal["clsInputValue"] = (setInput: any) => {
  value = "";
  setInput(value);
};
const commandHandler: ITerminal["commandHandler"] = async (
  command: string,
  router: NextRouter
) => {
  const user = await getSession().then((session) => session?.user);
  switch (command) {
    case "help":
      loopLines(CONSTANTS.help, 0, 100);
      return true;
    case "login":
      if (user) {
        pushLine(`You are already logged in as ${user.email}`, true);
      } else {
        router.push("/?login");
      }

      return true;
    case "logout":
      if (!user) {
        pushLine(`You are not logged in`, true);
      } else {
        signOut({ callbackUrl: "/" }).then(() => {
          updInputBefore();
        });
      }
      return true;
    case "cls" || "clear":
      document.getElementById("terminal_lines")!.innerHTML = "";
      loopLines(CONSTANTS.banner, 0, 100, true);
      return true;
    case "whoami":
      if (user) {
        let payload = {
          name: typeof user.name === "string" ? user.name : "",
          email: typeof user.email === "string" ? user.email : "",
          image: typeof user.image === "string" ? user.image : "",
        };
        loopLines(ProfileCard(payload), 0, 100);
      } else {
        pushLine("You are not logged in", true);
      }
      return true;
    case "test":
      router.push("/?test");
      return true;
    case "settings":
      router.push("/?settings");
      return true;
    case "lr":
      if (user) {
        let lastRecord = await getLastGameRecord();
        loopLines(asciiGameRecord(lastRecord), 0, 100);
        return true;
      } else {
        pushLine("You are not logged in", true);
        return true;
      }
    case "avg":
      if (user) {
        loopLines([`Your average WPM is ${await getAverageWPM()}`], 0, 100);
        return true;
      } else {
        pushLine("You are not logged in", true);
      }

    default:
      {
        command !== "" && pushLine(command);
      }

      return false;
  }
};

export { clsInputValue, commandHandler, styles };
