import * as React from 'react';
import {KeypadKey} from "./KeypadKey";


export interface IKeypadProps
{
    onKeyPressed: (keyPressed: KeypadKeys) => void;
}

export enum KeypadKeys
{
    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5',
    SIX = '6',
    SEVEN = '7',
    EIGHT = '8',
    NINE = '9',
    ZERO = '0',
    COMMA = ',',
    DELETE = 'KUSTUTA',
    ENTER = 'ENTER',
}

export const Keypad: React.FC<IKeypadProps> = (props): JSX.Element => {
    const rows:string[][] = [
        [...Object.keys(KeypadKeys).slice(0, 3)],
        [...Object.keys(KeypadKeys).slice(3, 6)],
        [...Object.keys(KeypadKeys).slice(6, 9)],
        [...Object.keys(KeypadKeys).slice(9, 12)],
        [...Object.keys(KeypadKeys).slice(12, 13)],
    ];

    return (
        <div className="keypad">
            {
                rows.map((row: any, idx: number) => (
                    <div className="keypad-row" key={idx}>
                        {
                            row.map((keyPadNumber: keyof typeof KeypadKeys) => {
                                return (
                                    <KeypadKey
                                        keypadKey={KeypadKeys[keyPadNumber]}
                                        key={keyPadNumber}
                                        onKeyPressed={(keyPressed: KeypadKeys) => props.onKeyPressed(keyPressed)}
                                    />
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
}
