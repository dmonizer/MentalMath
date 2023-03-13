import * as React from "react";
import {useState} from "react";
import {MentalDisplay} from "./MentalDisplay";
import {Level} from "./LevelDisplay";
import levels from "../MentalLevelData";
import {Timer} from "./Timer";
import {Score, ScoreDirection} from "./Score";

interface MentalState {
    level: number,
    question: string,
    currentRepetition: number,
    correctAnswersInLevel: number,
}


export const MentalMain = () => {
    const emptyState = (): MentalState => {
        return {
            currentRepetition: 0,
            level: 0,
            question: '',
            correctAnswersInLevel: 0,
        }
    }
    const [state, setState] = useState<MentalState>(emptyState());
    const [score, setScore] = useState(0);
    const [scoreDirection, setScoreDirection] = useState(ScoreDirection.STEADY);
    const [isTimerCancelled, setIsTimerCancelled] = useState(false);
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

    const levelUpIfNeeded = () => {
        const currentLevel = levels[state.level];
        if (currentRepetition >= currentLevel.repetitions && correctAnswersInLevel >= currentLevel.minimumCorrectAnswersForLevelUp) {
            if (state.level < levels.length - 1) { // only level up if there are more levels
                state.level = state.level + 1;
            }
            state.currentRepetition = 0
            state.question = "";
            console.log("################################ LEVEL UP: ", state.level, "################################")
        }
        state.currentRepetition = currentRepetition + 1;
    }
    const newQuestion = () => {
        levelUpIfNeeded();

        const {min, max, operators, answerMax, answerMin} = levels[level];

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
        setState({...state})
    }

    const timeOut = (secondsLeft: number) => {
        if (isTimerCancelled) {
            setIsTimerCancelled(false)
            scoreUp(secondsLeft)
        } else {
            scoreDown(Math.round(levels[level].answeringTime / 3))
        }
        newQuestion()
    }

    const scoreUp = (value: number) => {
        setScore(score + value)
        setScoreDirection(ScoreDirection.UP)
    }
    const scoreDown = (value: number) => {
        setScore(Math.max(0, score - value));
        setScoreDirection(ScoreDirection.DOWN)
    }


    function checkAnswer(candidate: number) {
        // eslint-disable-next-line no-eval
        if (candidate && candidate === eval(question)) {
            setIsTimerCancelled(true)
            state.correctAnswersInLevel = correctAnswersInLevel + 1;
        }
        newQuestion();
    }

    if (state.question === "") {
        newQuestion()
    }

    return (
        <div>
            <Level level={state.level}/>
            <Score value={score} direction={scoreDirection}/>
            <Timer seconds={levels[level].answeringTime} isCancelled={isTimerCancelled} rewind={timeOut}/>
            <MentalDisplay question={question} answerReporter={checkAnswer}/>
        </div>
    )

}
