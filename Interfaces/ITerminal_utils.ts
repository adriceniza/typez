import { NextRouter } from "next/router";

export default interface ITerminal_utils {
  updInputValue: (key: string, setInput: any) => void;
  remInputValue: (setInput: any) => void;
  clsInputValue: (setInput: any) => void;
  commandHandler: (
    command: string,
    router: NextRouter,
    close?: () => void
  ) => Promise<boolean | undefined>;
  init: (setInput: any) => void;
  terminalInputListener: (setInput: any) => (event: KeyboardEvent) => void;
}
