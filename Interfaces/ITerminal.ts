import { NextRouter } from "next/router";

export default interface ITerminal {
  updInputValue: (key: string, setInput: any) => void;
  remInputValue: (setInput: any) => void;
  clsInputValue: (setInput: any) => void;
  commandHandler: (command: string, router: NextRouter) => boolean;
  init: (setInput: any) => void;
  terminalInputListener: (setInput: any) => (event: KeyboardEvent) => void;
}
