import * as React from 'react';
import {useState} from 'react';

import {Keypad, KeypadKeys} from './Keypad';
import {QuestionField} from "./QuestionDisplay";

interface MentalProperties {
    question: string,
    answerReporter: (arg0: number) => void
}

export const MentalDisplay = (props: MentalProperties) => {
    const {question, answerReporter} = props;
    const [keypadEntries, setKeypadEntries] = useState<string[]>([]);

    const getOutput = (keypadEntries: string[]): string => {
        return keypadEntries.join(""); //isNaN(number) ? 0 : number;
    }

    const handleKeypadKeyPress = (keyPadKey: KeypadKeys): void => {
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
    }
    return (
        <div>
            <div>
                <QuestionField question={question}> = {getOutput(keypadEntries)}</QuestionField>
            </div>
            <Keypad
                onKeyPressed={handleKeypadKeyPress}
            />
        </div>
    );

}
