import * as React from "react";
import { useState } from "react";
import { MentalDisplay } from "./MentalDisplay";
import { Level } from "./LevelDisplay";
import levels from "../MentalLevelData";
import { Timer } from "./Timer";
import { Score, ScoreDirection } from "./Score";
import { Ready } from "./Ready";
import Button from "react-bootstrap/Button";
import { WrongAnswers } from "./WrongAnswers";
import { evaluate, parse, MathNode, isOperatorNode } from "mathjs";

interface MentalState {
  level: number;
  question: string;
  currentRepetition: number;
  correctAnswersInLevel: number;
  intermediateAnswers: Record<string, number | null>;
  activeInput: string | null;
}

export const MentalMain = () => {
  const MAX_WRONG_ANSWERS = 10;

  const emptyState = (): MentalState => {
    return {
      currentRepetition: 0,
      level: 1,
      question: "",
      correctAnswersInLevel: 0,
      intermediateAnswers: {},
      activeInput: "final",
    };
  };
  const [state, setState] = useState<MentalState>(emptyState());
  const [score, setScore] = useState(0);
  const [scoreDirection, setScoreDirection] = useState(ScoreDirection.STEADY);
  const [isTimerCancelled, setIsTimerCancelled] = useState(false);

  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [wrongAnswersLeft, setWrongAnswersLeft] = useState(MAX_WRONG_ANSWERS);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const {
    currentRepetition,
    level,
    question,
    correctAnswersInLevel,
    intermediateAnswers,
    activeInput,
  } = state;
  const randomIntegerInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function resetGame() {
    setState(emptyState());
    setWrongAnswersLeft(MAX_WRONG_ANSWERS);
    setScore(0);
  }
  const levelUpIfNeeded = () => {
    console.log("levelUpIfNeeded");
    const currentLevel = levels[state.level - 1];
    if (
      currentRepetition >= currentLevel.repetitions &&
      correctAnswersInLevel >= currentLevel.minimumCorrectAnswersForLevelUp
    ) {
      if (state.level < levels.length) {
        state.level = state.level + 1;
      }
      setWrongAnswersLeft(Math.min(MAX_WRONG_ANSWERS, wrongAnswersLeft + 1));
      state.currentRepetition = 0;
      state.correctAnswersInLevel = 0;
      state.question = "";
      console.log(
        "################################ LEVEL UP: ",
        state.level,
        "################################"
      );
    }
    state.currentRepetition = currentRepetition + 1;
  };
  const newQuestion = () => {
    levelUpIfNeeded();

    const { questionFormat, answerMax, answerMin, description } =
      levels[level - 1];
    let q = "";
    let suitableAnswer = false;
    console.log("Level desc: " + description);
    while (!suitableAnswer) {
      q = questionFormat.replace(/[xyzw]/g, (match) => {
        return randomIntegerInRange(1, 10).toString();
      });
      let a = evaluate(q);
      suitableAnswer = a >= answerMin && a <= answerMax;
    }

    const node = parse(q);
    const intermediateNodes: MathNode[] = [];
    node.traverse((node: MathNode, path: string, parent: MathNode) => {
      if (isOperatorNode(node) && parent !== null) {
        intermediateNodes.push(node);
      }
    });

    state.question = q;
    state.intermediateAnswers = {};
    state.activeInput =
      intermediateNodes.length > 0 ? intermediateNodes[0].toString() : "final";

    console.log("newQuestion: ", q);
    setState({ ...state });
  };

  const timerRewind = (secondsLeft: number) => {
    console.log("timerRewind");

    if (isCorrectAnswer) {
      scoreUp(secondsLeft);
      setIsCorrectAnswer(false);
    } else {
      scoreDown(Math.round(levels[level - 1].answeringTime / 3));
    }
    if (isTimerCancelled) {
      setIsTimerCancelled(false);
    } else {
      newQuestion();
    }
  };

  const scoreUp = (value: number) => {
    console.log("scoreUp");
    setScore(score + value);
    setScoreDirection(ScoreDirection.UP);
    setIsCorrectAnswer(false);
  };
  const scoreDown = (value: number) => {
    console.log("scoreDown");
    setWrongAnswersLeft(wrongAnswersLeft - 1);
    setScore(Math.max(0, score - value));
    setScoreDirection(ScoreDirection.DOWN);
  };

  const checkIntermediateAnswers = () => {
    const node = parse(question);
    let allCorrect = true;
    node.traverse((node: MathNode) => {
      if (isOperatorNode(node)) {
        const subExpression = node.toString();
        const correctAnswer = evaluate(subExpression);
        if (intermediateAnswers[subExpression] !== correctAnswer) {
          allCorrect = false;
        }
      }
    });
    return allCorrect;
  };

  function checkAnswer(candidate: number) {
    console.log("checkAnswer");
    if (candidate && candidate === evaluate(question)) {
      state.correctAnswersInLevel = correctAnswersInLevel + 1;
      setIsCorrectAnswer(true);
      if (checkIntermediateAnswers()) {
        scoreUp(10);
      }
    }
    setIsTimerCancelled(true);

    newQuestion();
  }

  if (state.question === "" && gameStarted) {
    newQuestion();
  }

  if (!gameStarted) {
    return (
      <Ready
        startCb={() => setGameStarted(true)}
        startLevel={(level: number) => {
          setState({ ...state, level });
        }}
      />
    );
  }
  console.log("level: ", level);
  let statsContent = (
    <div className={"scoring-level"}>
      <Score value={score} direction={scoreDirection} />
      <Level level={state.level} totalLevels={levels.length} />
      <WrongAnswers answersLeft={wrongAnswersLeft} max={MAX_WRONG_ANSWERS} />
    </div>
  );

  if (wrongAnswersLeft === 0) {
    return (
      <div>
        {statsContent}
        <p>Mäng läbi, valed vastused (⚫) said otsa!</p>
        <Button variant={"primary"} onClick={() => resetGame()}>
          Uuesti?
        </Button>
      </div>
    );
  }
  if (gamePaused) {
    return (
      <div>
        <Button variant={"danger"} onClick={() => setGamePaused(false)}>
          Jätka
        </Button>
        {statsContent}
      </div>
    );
  }

  return (
    <div>
      <Button variant={"danger"} onClick={() => setGamePaused(true)}>
        Paus
      </Button>
      {statsContent}
      <Timer
        seconds={levels[level - 1].answeringTime}
        isCancelled={isTimerCancelled}
        rewind={timerRewind}
      />
      <MentalDisplay
        question={question}
        answerReporter={checkAnswer}
        onIntermediateAnswerChange={(subExpression, answer) => {
          setState({
            ...state,
            intermediateAnswers: {
              ...intermediateAnswers,
              [subExpression]: answer,
            },
          });
        }}
        onFocus={(subExpression) => {
            setState({ ...state, activeInput: subExpression });
        }}
        activeInput={activeInput}
        intermediateAnswers={intermediateAnswers}
      />
    </div>
  );
};
