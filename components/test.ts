import words, * as rdmw from "random-words";
import { delay } from "../constants";
import styles from "../styles/Test.module.css";

let characters = 0;
let WORDS: string[] | any[];
let next_words: string[] = [];
let lastKey = "";
let value = "";
let word_index: any = 0;
let mistakes = 0;
let testTime = 30;
let timeElapsed = 0;
let countdownStarted: boolean = false;
let writedWords: string[] = [];

const generateWords = (n: number) => {
  let words: string[] = [];
  for (let i = 0; i < n; i++) {
    let temp_word =
      rdmw.wordList[Math.floor(Math.random() * (rdmw.wordList.length - 1) + 1)];

    !words.includes(temp_word) ? words.push(temp_word) : i--;
  }
  return words;
};

const missedWords = (words: string[], word_index: number, from: number) => {
  let current_word = words[word_index];
  for (let i = from; i < current_word.length; i++) {
    document
      .getElementById(`${current_word}_${current_word.charAt(i)}_${i}`)!
      .classList.add(styles.letterMissed);
  }
};

const checkLetter = (
  letter: string,
  words: string[],
  word_index: number,
  word_letter_index: number
) => {
  let current_word = words[word_index];
  let current_word_letter = current_word.charAt(word_letter_index);

  try {
    if (letter === current_word_letter) {
      document
        .getElementById(
          `${current_word}_${current_word_letter}_${word_letter_index}`
        )!
        .classList.add(styles.letterSuccess);
      characters++;
    } else if (letter !== current_word_letter) {
      mistakes++;
      document
        .getElementById(
          `${current_word}_${current_word_letter}_${word_letter_index}`
        )!
        .classList.add(styles.letterMistake);
    }
    return letter === words[word_index].charAt(word_letter_index);
  } catch (error) {
    return false;
  }
};

const moveCursor = (element: HTMLElement) => {
  const bounds = element?.getBoundingClientRect();
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2 - 12;
  const cursor = document.getElementById("cursor")!;
  const width = element.offsetWidth;
  cursor.style.left = `${x - width / 2 - 5}px`;
  cursor.style.top = `${y + 25}px`;
  cursor.style.width = width + "px";
  return true;
};

const calcWPM = (characters: number = 0) => {
  return Math.floor(characters / 5 / (timeElapsed / 60));
};

const calcAccuracy = () => {
  console.log(characters, mistakes);
  return Math.floor(((characters - mistakes) / characters) * 100);
};

const countDown = async (sec: number) => {
  console.log("countdown started", sec);
  const app = document.getElementById("terminal_test")!;
  const countdown = document.createElement("div");
  countdown.className = styles.countdown;
  countdown.id = "countdown";
  countdown.innerHTML = sec.toString();
  app.appendChild(countdown);

  for (let i = sec; i > 0; i--) {
    await delay(1000);
    timeElapsed++;
    countdown.innerHTML = (sec - timeElapsed).toString();
    if (timeElapsed === sec) {
      countdown.style.opacity = "0";
      setTimeout(() => {
        countdown.remove();
      }, 300);
      finishTest(characters);
    }
  }
};

const printWords = (
  words: string[],
  container: HTMLElement,
  trackable: boolean = false
) => {
  container.innerHTML = "";
  words.forEach((word) => {
    const word_container = document.createElement("div");
    word_container.className = `${styles.word_container} ${styles.wordInactive}`;
    for (let i = 0; i < word.length; i++) {
      const letter = document.createElement("div");
      letter.className = styles.letter;
      if (trackable) {
        word_container.id = `${word}`;
        letter.id = `${word}_${word.charAt(i)}_${i}`;
      }
      letter.innerHTML = word.charAt(i);
      word_container.appendChild(letter);
    }

    container.appendChild(word_container);
  });
};

const lastWordsPrintAnimated = (words: string[], container: HTMLElement) => {
  container.style.marginTop = "0";
  setTimeout(() => {
    container.style.marginTop = "-15vh";
    printWords(words, container);
  }, 100);
};
const testEventListener = async (e: { key: string }) => {
  const abc =
    "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
  const blackList_keys = [
    "Shift",
    "Alt",
    "Meta",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "CapsLock",
    "AltGraph",
    "ContextMenu",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
  ];

  if (blackList_keys.includes(e.key) && !abc.includes(e.key)) {
    return;
  }

  //Control + Z
  if (lastKey === "Control" && e.key === "z") {
    finishTest(characters);
    return;
  }

  //Control + B
  if (lastKey === "Control" && e.key === "b") {
    window.location.href = "/?";
    return;
  }

  //Enter or space
  if (e.key === "Enter" || e.key === " ") {
    if (WORDS[word_index].length > value.length) {
      missedWords(WORDS, word_index, value.length);
    }
    writedWords.push(WORDS[word_index]);
    if (WORDS.length - 1 === word_index) {
      const words_container = document.getElementById("words_container")!;
      WORDS = next_words;
      printWords(WORDS, words_container, true);
      moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
      word_index = 0;
      value = "";
      lastWordsPrintAnimated(
        writedWords,
        document.getElementById("last_words")!
      );
      writedWords = [];
      next_words = generateWords(10);

      printWords(next_words, document.getElementById("next_words")!);
    } else {
      word_index++;
    }
    moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
    document
      .getElementById(`${WORDS[word_index]}`)!
      .classList.add(styles.wordActive);
    value = "";

    //Backspace
  } else if (e.key === "Backspace") {
    value = value.slice(0, -1);
    let letter = document.getElementById(
      `${WORDS[word_index]}_${WORDS[word_index].charAt(value.length)}_${
        value.length
      }`
    )!;
    letter.classList.remove(styles.letterSuccess);
    letter.classList.remove(styles.letterMistake);
    letter.classList.remove(styles.letterMissed);

    //Letters
  } else if (abc.includes(e.key)) {
    if (!countdownStarted) countDown(testTime);
    countdownStarted = true;
    try {
      if (value.length + 1 > WORDS[word_index].length) {
        const word_div = document.getElementById(WORDS[word_index])!;
        word_div.classList.add(styles.shake);
        setTimeout(() => {
          word_div.classList.remove(styles.shake);
        }, 100);
      } else {
        value += e.key;
        checkLetter(e.key, WORDS, word_index, value.length - 1);
      }
    } catch (err) {
      console.log("rerrr");
    }
  }
  lastKey = e.key;
};
const generateTestUI = () => {
  timeElapsed = 0;
  const app = document.getElementById("terminal_test")!;
  const container = document.createElement("div");
  container.className = styles.game;
  container.id = "test_game";
  app.appendChild(container);
  const last_words = document.createElement("div");
  last_words.className = styles.last_words;
  last_words.id = "last_words";
  container.appendChild(last_words);
  const words_container = document.createElement("div");
  words_container.className = styles.words_container;
  words_container.id = "words_container";
  container.appendChild(words_container);
  const next_words_container = document.createElement("div");
  next_words_container.className = styles.next_words;
  next_words_container.id = "next_words";
  container.appendChild(next_words_container);
  WORDS = generateWords(10);
  printWords(WORDS, words_container, true);
  next_words = generateWords(10);
  printWords(next_words, next_words_container);

  const cursor = document.createElement("div");
  cursor.className = styles.cursor;
  cursor.id = "cursor";
  container.appendChild(cursor);

  const goBack = document.createElement("div");
  goBack.className = styles.goBack;
  goBack.id = "goBack";
  goBack.innerHTML = "<key>ctrl</key> + <key>z</key> finish.</a>";
  container.appendChild(goBack);

  //container to advise user to press F1 to open settings menu
  const settings_container = document.createElement("div");
  settings_container.className = styles.settings_container;
  settings_container.id = "settings_container";
  const settings_text = document.createElement("div");
  settings_text.className = styles.settings_text;
  settings_text.id = "settings_text";
  settings_text.innerHTML = "<key>F2</key> settings.";
  settings_container.appendChild(settings_text);
  container.appendChild(settings_container);


  if (document.getElementById(`${WORDS[word_index]}`)) {
    moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
  }

  window.addEventListener("keydown", testEventListener);
};

const statsEventListener = (e: KeyboardEvent) => {
  if (e.key === " ") {
    document.getElementById("test_stats")!.remove();
    removeEventListener("keydown", statsEventListener);
    generateTestUI();
  }
};

const generateStatsUI = (wpm: number, precision: number) => {
  const ui = document.getElementById("terminal_test")!;
  const container = document.createElement("div");
  container.className = styles.stats;
  container.id = "test_stats";
  const wpm_counter = document.createElement("div");
  wpm_counter.className = styles.wpm_counter;
  wpm_counter.id = "wpm_counter";
  wpm_counter.innerHTML = wpm.toString() + " WPM";
  container.appendChild(wpm_counter);
  const precision_container = document.createElement("div");
  precision_container.className = styles.precision_container;
  precision_container.id = "precision_container";
  precision_container.innerHTML = precision.toString() + "ACC";
  container.appendChild(precision_container);
  ui.appendChild(container);
  setTimeout(() => {
    const restart = document.createElement("div");
    restart.className = styles.restart;
    restart.id = "restart";
    restart.innerHTML = "<key>Space</key> to restart</a>";
    container.appendChild(restart);

    window.addEventListener("keydown", statsEventListener);
  }, 2000);
};

// const SettingsMenu = ()=>{
//   const display = ()=>{

//   }
//   const remove = ()=>{

//   }

//   const container = document.createElement('div');
//   container.className = styles.settingsMenu_container;
//   container.id = 'settingsMenu_container';
//   const settings_container = document.createElement('div');
//   settings_container.className = styles.settings_container;
//   settings_container.id = 'settings_container';

// }
const resetVariables = () => {
  word_index = 0;
  value = "";
  lastKey = "";
  countdownStarted = false;
  timeElapsed = 0;
  WORDS = [];
  next_words = [];
};

const finishTest = (characters: number) => {
  window.removeEventListener("keydown", testEventListener);
  const test_game = document.getElementById("test_game")!;
  test_game?.remove();
  const countdown = document.getElementById("countdown")!;
  countdown?.remove();
  generateStatsUI(calcWPM(characters), calcAccuracy());
  resetVariables();
};
export { generateTestUI };
