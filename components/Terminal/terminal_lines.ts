import * as CONSTANTS from "../../constants";
const scrollToLastLine = () => {
  const lines = document.getElementsByClassName("line");
  let last_line = lines[lines.length - 1]!;
  last_line?.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};
const loopLines = (
  lines: string[],
  index: number,
  time: number,
  isBanner: boolean = false
) => {
  const terminal = document.getElementById("terminal_lines")!;

  if (index < lines.length) {
    let line = lines[index];
    let new_line = "";
    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") {
        new_line += CONSTANTS.space;
      } else {
        new_line += line[i];
      }
    }

    setTimeout(() => {
      if (terminal) {
        terminal.innerHTML += isBanner
          ? `<span class='banner'> <p>${new_line} </p> </span>`
          : `<p class='line'>` + new_line + "</p>";
        scrollToLastLine();
      }

      loopLines(lines, index + 1, time, isBanner);
    }, time);
  } else {
    terminal.innerHTML += "<br/>";
  }
};

const pushLine = (line: string, isAdmin: boolean = false) => {
  const terminal = document.getElementById("terminal_lines")!;
  isAdmin
    ? (terminal.innerHTML += "<p class='admin line'> typez: " + line + "</p>")
    : (terminal.innerHTML += `<p class='line'>${line}</p>`);
  scrollToLastLine();
};

export { loopLines, pushLine };
