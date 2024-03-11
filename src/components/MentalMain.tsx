import * as React from "react";
import {useState} from "react";
import {MentalDisplay} from "./MentalDisplay";
import {Level} from "./LevelDisplay";
import levels from "../MentalLevelData";
import {Timer} from "./Timer";
import {Score, ScoreDirection} from "./Score";
import {Ready} from "./Ready";
import Button from "react-bootstrap/Button";
import {WrongAnswers} from "./WrongAnswers";

interface MentalState {
    level: number,
    question: string,
    currentRepetition: number,
    correctAnswersInLevel: number,
}


export const MentalMain = () => {
    const MAX_WRONG_ANSWERS = 10;

    const emptyState = (): MentalState => {
        return {
            currentRepetition: 0,
            level: 1,
            question: '',
            correctAnswersInLevel: 0,
        };
    }
    const [state, setState] = useState<MentalState>(emptyState());
    const [score, setScore] = useState(0);
    const [scoreDirection, setScoreDirection] = useState(ScoreDirection.STEADY);
    const [isTimerCancelled, setIsTimerCancelled] = useState(false);

    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [wrongAnswersLeft, setWrongAnswersLeft] = useState(MAX_WRONG_ANSWERS);
    const [gameStarted, setGameStarted] = useState(false)
    const [gamePaused, setGamePaused] = useState(false)

    const {currentRepetition, level, question, correctAnswersInLevel} = state
    const randomIntegerInRange = (min: number, max: number): number => {
        // Generate a random decimal between 0 and 1
        const randomDecimal = Math.random();

        // Calculate the range between the minimum and maximum values
        const range = max - min + 1;

        // Multiply the random decimal by the range and round down to the nearest integer
        const randomInteger = Math.floor(randomDecimal * range);

        // Add the minimum value to the random integer to get a value within the specified range
        return randomInteger + min;
    }

    function resetGame() {
        setState(emptyState);
        setWrongAnswersLeft(MAX_WRONG_ANSWERS);
        setScore(0);
    }
    const levelUpIfNeeded = () => {
        console.log("levelUpIfNeeded")
        const currentLevel = levels[state.level];
        if (currentRepetition >= currentLevel.repetitions && correctAnswersInLevel >= currentLevel.minimumCorrectAnswersForLevelUp) {
            if (state.level < levels.length - 1) { // only level up if there are more levels
                state.level = state.level + 1;
            }
            setWrongAnswersLeft(Math.min(MAX_WRONG_ANSWERS,wrongAnswersLeft+1));
            state.currentRepetition = 0
            state.correctAnswersInLevel = 0;
            state.question = "";
            console.log("################################ LEVEL UP: ", state.level, "################################")
        }
        state.currentRepetition = currentRepetition + 1;
    }
    const newQuestion = () => {
        levelUpIfNeeded();

        const {min, max, operators, answerMax, answerMin} = levels[level-1];
        const countOfOps = operators.length - 1;
        let q = ""
        let suitableAnswer = false;

        while (!suitableAnswer) {
            q = randomIntegerInRange(min, max) + operators[randomIntegerInRange(0, countOfOps)] + randomIntegerInRange(min, max)
            // eslint-disable-next-line no-eval
            let a = eval(q);
            suitableAnswer = a >= answerMin && a <= answerMax;
            //console.log("trying " + q + " = " + a + " -> " + suitableAnswer)
        }

        state.question = q;
        console.log("newQuestion: ",q)
        setState({...state})
    }

    const timerRewind = (secondsLeft: number) => {
        console.log("timerRewind")

        if (isCorrectAnswer) {
            scoreUp(secondsLeft)
            setIsCorrectAnswer(false)
        } else {
            scoreDown(Math.round(levels[level].answeringTime / 3))
        }
        if (isTimerCancelled) {
            setIsTimerCancelled(false)
        } else {
            newQuestion()
        }
    }

    const scoreUp = (value: number) => {
        console.log("scoreUp")
        setScore(score + value)
        setScoreDirection(ScoreDirection.UP)
        setIsCorrectAnswer(false);
    }
    const scoreDown = (value: number) => {
        console.log("scoreDown")
        setWrongAnswersLeft(wrongAnswersLeft-1)
        setScore(Math.max(0, score - value));
        setScoreDirection(ScoreDirection.DOWN)
    }


    function checkAnswer(candidate: number) {
        console.log("checkAnswer")
        // eslint-disable-next-line no-eval
        if (candidate && candidate === eval(question)) {
            state.correctAnswersInLevel = correctAnswersInLevel + 1;
            setIsCorrectAnswer(true);
        }
        setIsTimerCancelled(true)

        newQuestion();
    }

    if (state.question === "") {
        newQuestion()
    }

    if (!gameStarted) {
        return <Ready
                startCb={() => setGameStarted(true)}
                startLevel={(level:number) => {
                    setState({...state, level})
                }        }
                />
    }
console.log("level: ",level)
    let statsContent =
        <div className={"scoring-level"}>
            <Score value={score} direction={scoreDirection}/>
            <Level level={state.level} totalLevels={levels.length - 1}/>
            <WrongAnswers answersLeft={wrongAnswersLeft} max={MAX_WRONG_ANSWERS}/>
        </div>

    if (wrongAnswersLeft === 0) {
        return <div>{statsContent}<p>Mäng läbi, valed vastused (⚫) said otsa!</p><Button variant={"primary"} onClick={()=>resetGame()}>Uuesti?</Button></div>
    }
    if (gamePaused) {
        return <div>
            <Button variant={"danger"} onClick={() => setGamePaused(false)}>Jätka</Button>
            {statsContent}
        </div>
    }

    return (
        <div>
            <Button variant={"danger"} onClick={() => setGamePaused(true)}>Paus</Button>
            {statsContent}
            <Timer seconds={levels[level].answeringTime} isCancelled={isTimerCancelled} rewind={timerRewind}/>
            <MentalDisplay question={question} answerReporter={checkAnswer}/>
        </div>)


}
