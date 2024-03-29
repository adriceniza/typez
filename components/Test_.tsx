import React, { useEffect, useState } from 'react'
import { delay } from '../constants'
import rdmw from "random-words";
import { gainExperience } from "@services/users.service";
import { pushGameRecord } from "@services/gamerecords.service";
import styles from "@styles/Test.module.css";
import { useRouter } from 'next/router';

export default function Test(props: any) {
    const [showStats, setShowStats] = useState(false)
    let testTime = 0
    let playing: boolean = false;
    let timeElapsed: number = 0;
    let WORDS: string[] = []
    let NEXT_WORDS: string[] = []
    let word_index: number = 0;
    let value: string = "";
    let writedWords: string[] = [];
    let characters: number = 0;
    let mistakes: number = 0;
    let lastKey: string = "";

    const generateWords = (n: number) => {
        let words: string[] = [];
        for (let i = 0; i < n; i++) {
            let temp_word = rdmw.wordList[Math.floor(Math.random() * (rdmw.wordList.length - 1) + 1)];
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
    const calcWPM = () => {
        return Math.floor(characters / 5 / (testTime / 60));
    };
    const calcAccuracy = () => {
        return Math.floor(((characters - mistakes) / characters) * 100);
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
    const generateTestUI = () => {
        reset()
        WORDS = generateWords(10);
        printWords(WORDS, document.getElementById('current_words') as HTMLElement, true);
        NEXT_WORDS = generateWords(10);
        printWords(NEXT_WORDS, document.getElementById('next_words') as HTMLElement);

        if (document.getElementById(`${WORDS[word_index]}`)) {
            moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
        }
        const test = document.getElementById('terminal_test');
        test?.addEventListener('keydown', handleChange)
    }
    const countDown = async (sec: number) => {
        const container = document.getElementById("countdown")!;
        container.innerHTML = sec.toString()
        for (let i = sec; i > 0; i--) {
            if (!playing) { i = 0; return }
            else {
                if (window.location.pathname.slice(1) !== "test") {
                    i = 0;
                    forceFinish();
                }
                await delay(1000);
                timeElapsed++;
                container.innerHTML = (sec - timeElapsed).toString();
                if (timeElapsed === sec) {
                    finishTest();
                }
            }
        }
    };
    const reset = () => {
        WORDS = []
        NEXT_WORDS = []
        word_index = 0;
        playing = false;
        testTime = parseInt(window.location.search.split('?duration=')[1] as string) || 30
        timeElapsed = 0;
        value = "";
        writedWords = [];
        characters = 0;
        mistakes = 0;
        lastKey = "";
        playing = false
        document.getElementById('last_words')!.innerHTML = ''
        document.getElementById('current_words')!.innerHTML = ''
        document.getElementById('next_words')!.innerHTML = ''
        document.getElementById('countdown')!.innerHTML = ''
    };
    const finishTest = () => {
        document.getElementById('terminal_test')?.removeEventListener('keydown', handleChange)
        pushStats()
        let exp = 202;
        gainExperience(exp);
        pushGameRecord({
            userId: "",
            gameId: "test",
            WPMAverage: calcWPM(),
            expEarned: exp,
        });
        reset();
    };
    const pushStats = () => {
        const wpm = document.getElementById('stats_wpm')
        const acc = document.getElementById('stats_acc')
        const mode = document.getElementById('stats_mode')
        const exp = document.getElementById('stats_exp')
        wpm?.setAttribute('data-content', calcWPM().toString())
        acc?.setAttribute('data-content', calcAccuracy().toString())
        mode?.setAttribute('data-content', 'Test')
        exp?.setAttribute('data-content', '202')


        setShowStats(true)
    };
    const forceFinish = () => {
        document.getElementById('terminal_test')?.removeEventListener('keydown', handleChange)
        reset();
    };
    function handleChange(e: any) {
        [0 - 9]
        const abc = new RegExp('^[a-zA-Z]{1}$');
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

        if (blackList_keys.includes(e.key) && !abc.test(e.key)) {
            return;
        }
        //Enter or space
        if ((e.key === "Enter" || e.key === " ") && playing) {
            if (WORDS[word_index].length > value.length) {
                missedWords(WORDS, word_index, value.length);
            }
            writedWords.push(WORDS[word_index]);
            if (WORDS.length - 1 === word_index) {
                const words_container = document.getElementById("current_words")!;
                WORDS = NEXT_WORDS;
                printWords(WORDS, words_container, true);
                moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
                word_index = 0;
                value = "";
                lastWordsPrintAnimated(
                    writedWords,
                    document.getElementById("last_words")!
                );
                writedWords = [];
                NEXT_WORDS = generateWords(10);

                printWords(NEXT_WORDS, document.getElementById("next_words")!);
            } else {
                word_index++;
            }
            moveCursor(document.getElementById(`${WORDS[word_index]}`)!);
            document
                .getElementById(`${WORDS[word_index]}`)!
                .classList.add(styles.wordActive);
            value = "";

            //Backspace
        } else if ((e.key === "Backspace") && playing) {
            value = value.slice(0, -1);
            let letter = document.getElementById(
                `${WORDS[word_index]}_${WORDS[word_index].charAt(value.length)}_${value.length}`
            )!;
            letter.classList.remove(styles.letterSuccess);
            letter.classList.remove(styles.letterMistake);
            letter.classList.remove(styles.letterMissed);

            //Letters
        } else if (abc.test(e.key)) {
            if (!playing) {
                playing = true
                countDown(testTime)
            }
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
            lastKey = e.key;
        }
    }

    useEffect(() => {
        generateTestUI();
        document.getElementById('terminal_test')?.focus()
            window.addEventListener('resize',()=>{
                try{
                    moveCursor(document.getElementById(`${WORDS[word_index]}`)!)
                }catch (error){

                }
            })
    }, [])
    return (
           <div className={styles.testContainer}>
            <div className={styles.terminal_test} id="terminal_test" tabIndex={1}>
                <div className={styles.countdown} id="countdown"/>
                <div className={styles.countdown} id={'countdown'}/>
                <div className={styles.words_container}>
                    <div className={styles.last_words} id="last_words"/>
                    <div className={styles.current_words} id="current_words"/>
                    <div className={styles.next_words} id="next_words"/>
                </div>
                <div className={styles.cursor} id="cursor"/>
            </div>
            <div data-show={showStats} className={styles.stats_container}>
                <div className={styles.stats}>
                    <ul>
                        <li id={'stats_wpm'}><span>Wpm</span></li>
                        <li id={'stats_acc'}><span>Accuracy</span></li>
                        <li id={'stats_mode'}><span>Mode</span></li>
                        <li id={'stats_exp'}><span>Exp</span></li>
                    </ul>
                    <div className={styles.stats_toolbar}>
                        <div onClick={() => { }} className={styles.repeatTest}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                            </svg>
                        </div>
                        <div onClick={() => { generateTestUI(); setShowStats(false); document.getElementById('terminal_test')?.focus() }} className={styles.nextTest}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}