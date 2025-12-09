import * as React from 'react';
import {useState} from 'react';

import {Keypad, KeypadKeys} from './Keypad';
import {QuestionField} from "./QuestionDisplay";

interface MentalProperties {
    question: string,
    answerReporter: (arg0: number) => void
    onIntermediateAnswerChange: (subExpression: string, answer: number | null) => void;
    onFocus: (subExpression: string) => void;
    activeInput: string | null;
    intermediateAnswers: Record<string, number | null>;
}

export const MentalDisplay = (props: MentalProperties) => {
    const {question, answerReporter, onIntermediateAnswerChange, onFocus, activeInput, intermediateAnswers} = props;
    const [keypadEntries, setKeypadEntries] = useState<string[]>([]);

    const getOutput = (keypadEntries: string[]): string => {
        return keypadEntries.join(""); //isNaN(number) ? 0 : number;
    }

    const handleKeypadKeyPress = (keyPadKey: KeypadKeys): void => {
        if (activeInput === 'final') {
            if (keyPadKey === KeypadKeys.ENTER) {
                const candidate: number = parseFloat(keypadEntries.join(""));
                answerReporter(candidate);
                setKeypadEntries([])
                return;
            }

            if (keyPadKey === KeypadKeys.DELETE) {
                keypadEntries.pop();
                setKeypadEntries([...keypadEntries]);
                return;
            }

            keypadEntries.push(keyPadKey.toString());
            setKeypadEntries([...keypadEntries]);
        } else if (activeInput) {
            let currentAnswer = intermediateAnswers[activeInput]?.toString() ?? ""
            if (keyPadKey === KeypadKeys.DELETE) {
                currentAnswer = currentAnswer.slice(0, -1)
            } else {
                currentAnswer += keyPadKey.toString()
            }
            onIntermediateAnswerChange(activeInput, parseInt(currentAnswer, 10))
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
                    value={getOutput(keypadEntries)}
                    onFocus={() => onFocus("final")}
                    readOnly
                    />
                </QuestionField>
            </div>
            <Keypad
                onKeyPressed={handleKeypadKeyPress}
            />
        </div>
    );

}
