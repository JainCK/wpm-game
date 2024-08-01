"use client";

import { useEffect, useRef, useState } from "react";
import WordDisplay from "./WordDisplay";
import InfoDisplay from "./InfoDisplay";
import NewGameButton from "./NewGameBtn";

const wordsList =
  "in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also".split(
    " "
  );
const wordsCount = wordsList.length;
const gameTime = 30 * 1000;

export default function GameContainer() {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [gameStart, setGameStart] = useState<number | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [wpm, setWpm] = useState<number | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    newGame();

    const handleKeyUp = (ev: KeyboardEvent) => {
      const key = ev.key;
      const currentWord = document.querySelector(
        ".word.current"
      ) as HTMLElement;
      const currentLetter = document.querySelector(
        ".letter.current"
      ) as HTMLElement;
      const expected = currentLetter?.innerHTML || " ";
      const isLetter = key.length === 1 && key !== " ";
      const isSpace = key === " ";
      const isBackspace = key === "Backspace";

      if (document.querySelector("#game.over")) {
        return;
      }

      if (!timer && isLetter) {
        const startTime = Date.now();
        setGameStart(startTime);
        setTimer(
          setInterval(() => {
            const currentTime = Date.now();
            const msPassed = currentTime - startTime;
            const sLeft = Math.max(0, Math.round((gameTime - msPassed) / 1000));
            if (sLeft <= 0) {
              gameOver();
              return;
            }
            const infoElement = document.getElementById("info") as HTMLElement;
            if (infoElement) infoElement.innerHTML = sLeft.toString();
          }, 1000)
        );
      }

      if (isLetter) {
        if (currentLetter) {
          currentLetter.classList.add(
            key === expected ? "correct" : "incorrect"
          );
          currentLetter.classList.remove("current");
          if (currentLetter.nextSibling) {
            (currentLetter.nextSibling as HTMLElement).classList.add("current");
          }
        } else {
          const incorrectLetter = document.createElement("span");
          incorrectLetter.innerHTML = key;
          incorrectLetter.className = "letter incorrect extra";
          currentWord?.appendChild(incorrectLetter);
        }
      }

      if (isSpace) {
        if (expected !== " ") {
          const lettersToInvalidate = Array.from(
            document.querySelectorAll(".word.current .letter:not(.correct)")
          );
          lettersToInvalidate.forEach((letter) => {
            (letter as HTMLElement).classList.add("incorrect");
          });
        }
        currentWord?.classList.remove("current");
        const nextWord = currentWord?.nextSibling as HTMLElement;
        if (nextWord) {
          nextWord.classList.add("current");
        }
        if (currentLetter) {
          currentLetter.classList.remove("current");
        }
        const firstLetter = nextWord?.firstChild as HTMLElement;
        if (firstLetter) {
          firstLetter.classList.add("current");
        }
      }

      if (isBackspace) {
        if (currentLetter && currentLetter === currentWord?.firstChild) {
          currentWord?.classList.remove("current");
          const previousWord = currentWord?.previousSibling as HTMLElement;
          if (previousWord) {
            previousWord.classList.add("current");
          }
          currentLetter.classList.remove("current");
          const lastLetter = previousWord?.lastChild as HTMLElement;
          if (lastLetter) {
            lastLetter.classList.add("current");
            lastLetter.classList.remove("incorrect");
            lastLetter.classList.remove("correct");
          }
        } else if (currentLetter) {
          currentLetter.classList.remove("current");
          const previousLetter = currentLetter?.previousSibling as HTMLElement;
          if (previousLetter) {
            previousLetter.classList.add("current");
            previousLetter.classList.remove("incorrect");
            previousLetter.classList.remove("correct");
          }
        } else {
          const lastLetter = (currentWord as HTMLElement)
            .lastChild as HTMLElement;
          if (lastLetter) {
            lastLetter.classList.add("current");
            lastLetter.classList.remove("incorrect");
            lastLetter.classList.remove("correct");
          }
        }
      }

      const nextLetter = document.querySelector(
        ".letter.current"
      ) as HTMLElement;
      const nextWord = document.querySelector(".word.current") as HTMLElement;
      const cursor = document.getElementById("cursor") as HTMLElement;

      if (cursor) {
        cursor.style.top =
          (nextLetter || nextWord).getBoundingClientRect().top + 2 + "px";
        cursor.style.left =
          (nextLetter || nextWord).getBoundingClientRect()[
            nextLetter ? "left" : "right"
          ] + "px";
      }
    };

    const gameElement = document.getElementById("game");
    gameElement?.addEventListener("keyup", handleKeyUp);

    return () => {
      gameElement?.removeEventListener("keyup", handleKeyUp);
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  const newGame = () => {
    setWpm(null);
    setGameStart(null);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    const newWords = Array.from(
      { length: 200 },
      () => wordsList[Math.floor(Math.random() * wordsCount)]
    );
    setWords(newWords);
    const gameContainer = document.getElementById("game") as HTMLElement;
    if (gameContainer) {
      gameContainer.innerHTML = "";
      gameContainer.classList.remove("over");
      newWords.forEach((word, i) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";
        if (i === 0) wordSpan.classList.add("current");
        wordSpan.innerHTML = word
          .split("")
          .map(
            (letter, j) =>
              `<span class="letter ${
                j === 0 && i === 0 ? "current" : ""
              }">${letter}</span>`
          )
          .join("");
        gameContainer.appendChild(wordSpan);
        if (i !== newWords.length - 1) {
          gameContainer.appendChild(document.createTextNode(" "));
        }
      });
    }
  };

  const gameOver = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    const currentTime = Date.now();
    const timeSpent = Math.min(gameTime, currentTime - (gameStart || currentTime));
    const minutes = timeSpent / (1000 * 60);
    const wordsTyped = document.querySelectorAll(".word .letter.correct").length / 5;
    const wpmCalculated = Math.round(wordsTyped / minutes);
    setWpm(wpmCalculated);
    document.querySelector("#game")?.classList.add("over");
  };

  return (
    <div className="game-container">
      <InfoDisplay wpm={wpm} />
      <div id="game" className="game" ref={gameRef} />
      <NewGameButton onClick={newGame} />
      <div id="cursor" className="cursor" />
    </div>
  );
}