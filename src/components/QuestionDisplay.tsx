import {FC} from "react";
import * as React from "react";

export const QuestionField: FC<any> = (props) => {
    return (
        <div className="question-field">{props.question} {props.children}</div>
    )
}
