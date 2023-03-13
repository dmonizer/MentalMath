import * as React from 'react';
import {KeypadKeys} from './Keypad';
import Button from 'react-bootstrap/Button';


import '../styles.less';

export interface IKeypadKeyProps
{
    keySize?: number;
    keypadKey: KeypadKeys;
    onKeyPressed: (keyPressed: KeypadKeys) => void;
}

export const KeypadKey: React.FC<IKeypadKeyProps> = (props : IKeypadKeyProps): JSX.Element => (
    <Button
        variant={props.keypadKey === KeypadKeys.ENTER ? "success" : props.keypadKey === KeypadKeys.DELETE ? "warning" : "outline-primary"}
        //className="keypad-key"
        data-role="button"

        onClick={() => props.onKeyPressed(props.keypadKey)}
        style={ props.keySize ? { width: props.keySize, height: props.keySize } : {} }
        tabIndex={0}
    >
        {props.keypadKey.toString()}
    </Button>
);
