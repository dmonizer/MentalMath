import * as React from 'react';

import {Keypad, KeypadKeys} from './Keypad';
import {QuestionField} from "./QuestionDisplay";

interface MentalProperties {
    question: string,
    answerReporter: (arg0: number) => void
    onIntermediateAnswerChange: (subExpression: string, answer: number | null) => void;
    onFocus: (subExpression: string) => void;
    activeInput: string | null;
    intermediateAnswers: Record<string, number | null>;
    finalAnswer: string | null;
    onFinalAnswerChange: (answer: string) => void;
}

export const MentalDisplay = (props: MentalProperties) => {
    const {question, answerReporter, onIntermediateAnswerChange, onFocus, activeInput, intermediateAnswers, finalAnswer, onFinalAnswerChange} = props;

    const handleKeypadKeyPress = (keyPadKey: KeypadKeys): void => {
        if (activeInput === 'final') {
            if (keyPadKey === KeypadKeys.ENTER) {
                const candidate: number = parseFloat(finalAnswer || "");
                answerReporter(candidate);
                return;
            }

            let currentAnswer = finalAnswer || "";

            if (keyPadKey === KeypadKeys.DELETE) {
                currentAnswer = currentAnswer.slice(0, -1);
            } else {
                currentAnswer += keyPadKey.toString();
            }
            onFinalAnswerChange(currentAnswer);

        } else if (activeInput) {
            let currentAnswer = intermediateAnswers[activeInput]?.toString() ?? ""
            if (keyPadKey === KeypadKeys.DELETE) {
                currentAnswer = currentAnswer.slice(0, -1)
            } else {
                currentAnswer += keyPadKey.toString()
            }
            const num = parseInt(currentAnswer, 10);
            onIntermediateAnswerChange(activeInput, isNaN(num) ? null : num);
        }
    }
    return (
        <div>
            <div>
                <QuestionField
                    question={question}
                    onAnswerChange={onIntermediateAnswerChange}
                    onFocus={onFocus}
                    activeInput={activeInput}
                    answers={intermediateAnswers}
                > = <input
                    type="text"
                    value={finalAnswer || ""}
                    onChange={(e) => onFinalAnswerChange(e.target.value)}
                    onFocus={() => onFocus("final")}
                    />
                </QuestionField>
            </div>
            <Keypad
                onKeyPressed={handleKeypadKeyPress}
            />
        </div>
    );

}
