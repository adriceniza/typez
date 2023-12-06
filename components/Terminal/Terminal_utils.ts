// @ts-ignore
import { loopLines, pushLine } from "@components/Terminal/Terminal_lines";
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
} from "@services/gamerecords.service";
import asciiGameRecord from "@components/Ascii/asciiGameRecord";
import IUserSession from "@interfaces/IUser";
let value = "";

const clsInputValue: ITerminal_utils["clsInputValue"] = (setInput: any) => {
  value = "";
  setInput(value);
};
const commandHandler: ITerminal_utils["commandHandler"] = async (

  command: string,
  router: NextRouter,
  close?: () => void

) => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );
  if (
    command.substring(0, 3) === "cd " &&
    RegExp(/[a-zA-Z]/).test(command.slice(3))
  ) {
    let username = command.slice(3);
    await router.push(username);
    close && close();
    return true;
  }
  if (
    command.substring(0, 5) === "test " &&
    RegExp(/[0-9]/).test(command.slice(4))
  ) {
    let duration = command.slice(4).replace(" ", "");
    const testTimes = ["15", "30", "60", "120"];
    if (testTimes.includes(duration)) {
      const testRegex = new RegExp("^test*");
      const location = window.location.pathname.slice(1);
      if (testRegex.test(location)) {
        pushLine("This change will take effect on the next test or if you restart");
        await router.push(`test?duration=${duration}`);
      } else {
        await router.push(`test?duration=${duration}`);
      }
    } else {
      pushLine("Test durations available : 15, 30, 60, 120");
    }
    return true;
  }
  switch (command.toLowerCase()) {
    case "hello":
      pushLine(`tus muertos ${user ? user.username : "guest"}.`);
      return true;
    case "help":
      loopLines(
        user ? CONSTANTS.help_logged : CONSTANTS.help_not_logged,
        0,
        50
      );
      return true;
    case "login":
      if (user) {
        pushLine(`You are already logged in as ${user.email}`, true);
      } else {
        await router.push("/login");
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
    case "clear":
      document.getElementById("terminal_lines")!.innerHTML = "";
      loopLines(CONSTANTS.banner, 0, 50, true);
      return true;
    case "whoami":
      if (user) {
        let payload = {
          name: typeof user.name === "string" ? user.name : "",
          email: typeof user.email === "string" ? user.email : "",
          image: typeof user.image === "string" ? user.image : "",
        };
        loopLines(ProfileCard(payload), 0, 50);
      } else {
        pushLine("You are not logged in", true);
      }
      return true;
    case "test":
      await router.push(`test?duration=15`);
      return true;
    case "lr":
      if (user) {
        let lastRecord = await getLastGameRecord();
        loopLines(asciiGameRecord(lastRecord), 0, 50);
        return true;
      } else {
        pushLine("You are not logged in", true);
        return true;
      }
    case "avg":
      if (user) {
        loopLines(
          [`Your average WPM is ${await getAverageWPM(user.username)}`],
          0,
          50
        );
        return true;
      } else {
        pushLine("You are not logged in", true);
        return true;
      }
    case "me":
      if (user) {
        await router.push(user.username);
        close && close();
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
    case "ls":
      loopLines(CONSTANTS.listpages, 0, 50)
      break;

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
