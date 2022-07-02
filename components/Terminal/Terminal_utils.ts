import { loopLines, pushLine } from "./terminal_lines";
import * as CONSTANTS from "../../constants";
import ITerminal_utils from "@interfaces/ITerminal_utils";
import styles from "@styles/Loader.module.css";
import { NextRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import updInputBefore from "@hooks/updInputBefore";
import ProfileCard from "@components/Ascii/profileAsciiCard";
import {
  getAverageWPM,
  getLastGameRecord,
} from "../../services/gamerecords.service";
import asciiGameRecord from "../Ascii/asciiGameRecord";
import IUserSession from "@interfaces/IUser";
let value = "";

const clsInputValue: ITerminal_utils["clsInputValue"] = (setInput: any) => {
  value = "";
  setInput(value);
};
const commandHandler: ITerminal_utils["commandHandler"] = async (
  command: string,
  router: NextRouter
) => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );

  if (
    command.substring(0, 3) === "cd " &&
    RegExp(/[a-zA-Z]/).test(command.slice(3))
  ) {
    let username = command.slice(3);
    router.push(username);
    return true;
  }
  switch (command.toLowerCase()) {
    case "hello":
      pushLine(`Hello ${user ? user.username : "guest"}.`);
      return true;
    case "help":
      loopLines(
        user ? CONSTANTS.help_logged : CONSTANTS.help_not_logged,
        0,
        100
      );
      return true;
    case "login":
      if (user) {
        pushLine(`You are already logged in as ${user.email}`, true);
      } else {
        router.push("/login");
      }

      return true;
    case "logout":
      if (!user) {
        pushLine(`You are not logged in`, true);
      } else {
        signOut().then(() => {
          updInputBefore();
        });
      }
      return true;
    case "cls":
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
      router.push("/test");
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
        return true;
      }
    case "me":
      if (user) {
        router.push(user.username);
      } else {
        pushLine("You are not logged in.", true);
      }
      break;
    case "config":
      if (user) {
        pushLine(`${user.username} wants to change config file.`);
      } else {
        pushLine("You must be logged in to see config file.", true);
      }
      return true;

    default:
      {
        command !== "" &&
          pushLine(
            `"${command}" is not a typez command. Use help to see all available commands.`
          );
      }

      return false;
  }
};

export { clsInputValue, commandHandler, styles };
