const banner = [
  "     _____   _  _    ______  _____     _____    ",
  "    /&#92;__  _&#92; /&#92; &#92;_&#92; &#92;   /&#92;  == &#92; /&#92;  ___&#92;   /&#92;___  &#92;   ",
  "    &#92;/_/&#92; &#92;/ &#92; &#92;____ &#92;  &#92; &#92;  _-/ &#92; &#92;  __&#92;   &#92;/_/  /__  ",
  "       &#92; &#92;_&#92;  &#92;/&#92;_____&#92;  &#92; &#92;_&#92;    &#92; &#92;_____&#92;   /&#92;_____&#92; ",
  "        &#92;/_/   &#92;/_____/   &#92;/_/     &#92;/_____/   &#92;/_____/ ",

  "Welcome to typez, use <a>'help'</a> to see the available commands",
];

const space = "&nbsp&nbsp";

const delay = async (ms: number) => {
  return new Promise((res: Function, rej) => {
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
const help = [
  "<a>help</a> : Show all available commands",
  "<a>login</a> : Login to the server",
  "<a>logout</a> : Logout from the server",
  "<a>whoami</a> : Show your account information",
  "<a>test</a> : Quick typing test",
  "<a>clear || cls</a> : Clear the terminal",
  "<a>settings</a> : Show settings",
]
export { banner, space, delay, keyboard, help };
