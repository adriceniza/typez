const banner = [
  "     _____   _  _    ______  _____     _____    ",
  "    /&#92;__  _&#92; /&#92; &#92;_&#92; &#92;   /&#92;  == &#92; /&#92;  ___&#92;   /&#92;___  &#92;   ",
  "    &#92;/_/&#92; &#92;/ &#92; &#92;____ &#92;  &#92; &#92;  _-/ &#92; &#92;  __&#92;   &#92;/_/  /__  ",
  "       &#92; &#92;_&#92;  &#92;/&#92;_____&#92;  &#92; &#92;_&#92;    &#92; &#92;_____&#92;   /&#92;_____&#92; ",
  "        &#92;/_/   &#92;/_____/   &#92;/_/     &#92;/_____/   &#92;/_____/ ",
  " ",
  "Welcome, type <a>help</a> to see the available commands",
  " ",
  `Version ${process.env.TYPEZ_VERSION}`
];

const listpages = [
    "Available pages",
    " - terminal",
    " - test",
    " - login",
    " - leaderboards",
    " - keyboard",
]

const space = "&nbsp&nbsp";

const delay = async (ms: number) => {
  return new Promise((res: Function, req) => {
    setTimeout(() => res(), ms);
  });
};
const keyboard = [
  ["VOLUME", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "?", "¿", "<-"],
  ["->", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "/", "+"],
  ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "Enter"],
  ["Shift", "<", "z", "x", "c", "v", "b", "n", "m", ",", ".", "-"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "FN", "Ctrl"],
];
const help_logged = [
  "<a>help</a> : Show all available commands.",
  "<a>cd</a> : Command to change current page.",
  "<a>listpages</a> or <a>lp</a> : List all available pages.",
  "<a>me</a> : Go to your profile page.",
  "<a>whoami</a> : Show your account information.",
  "<a>test</a> : Quick typing test.",
  "<a>lr</a> : Show your last game record.",
  "<a>avg</a> : Show your average typing speed.",
  "<a>config</a> : See config file.",
  "<a>logout</a> : Logout from the server.",
  "<a>clear</a> or <a>cls</a> : Clear the terminal.",
];
const help_not_logged = [
    "<a>help</a> : Show all available commands.",
    "<a>cd</a> : Command to change current location.",
    "<a>listpages</a> or <a>lp</a> : List all available pages.",
    "<a>login</a> : Login to the server.",
    "<a>test</a> : Quick typing test.",
    "<a>config</a> : See config file.",
    "<a>clear</a> or <a>cls</a> : Clear the terminal.",
];
const available_commands =[
    "help",
    "cd",
    "listpages",
    "me",
    "whoami",
    "test",
    "lr",
    "avg",
    "config",
    "logout",
    "clear",
    "lp",
    "cls"
]
export { banner, space, keyboard, help_logged, help_not_logged, listpages, available_commands, delay };
