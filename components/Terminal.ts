import { loopLines, pushLine } from "./terminal_lines";
import * as CONSTANTS from "../constants";
import ITerminal from "../Interfaces/ITerminal";
import styles from "../styles/Loader.module.css";
import { NextRouter } from "next/router";
import {getSession, signOut} from 'next-auth/react'
import updInputBefore from "../hooks/updInputBefore";
let value = "";

const clsInputValue: ITerminal["clsInputValue"] = (setInput: any) => {
  value = "";
  setInput(value);
};
const commandHandler: ITerminal["commandHandler"] = async (
  command: string,
  router: NextRouter
) => {
  const user = await getSession().then(session => session?.user);
  switch (command) {
    case "help":
      loopLines(CONSTANTS.help, 0, 100);
      return true;
    case "login":
      if(user) {
        pushLine(`You are already logged in as ${user.email}`,true);
      }else{
        router.push("/?login");
      }
      
      return true;
    case "logout":
      if(!user){
        pushLine(`You are not logged in`,true);
      }else{
        signOut({callbackUrl: '/'}).then(()=>{updInputBefore()});
      }
      return true;
    case "cls" || "clear":
      document.getElementById("terminal_lines")!.innerHTML = "";
      loopLines(CONSTANTS.banner, 0, 100, true);
      return true;
    case "whoami":
      let userArr:string[] = [];
      if(user){
        userArr.push(user?.email as string, user?.name as string);
        loopLines(userArr, 0, 100);
      }else{
        pushLine("You are not logged in",true);
      }
      return true
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
