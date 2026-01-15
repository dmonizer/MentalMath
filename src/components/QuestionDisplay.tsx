import { FC } from "react";
import * as React from "react";
import Expression from "./expression/Expression";

export const QuestionField: FC<any> = (props) => {
  return (
    <div className="question-field">
      <Expression
        expression={props.question}
        onAnswerChange={props.onAnswerChange}
        onFocus={props.onFocus}
        activeInput={props.activeInput}
        answers={props.answers}
      />
      {props.children}
    </div>
  );
};
