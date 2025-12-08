import { FC } from "react";
import * as React from "react";
import Expression from "./Expression";

export const QuestionField: FC<any> = (props) => {
  return (
    <div className="question-field">
      <Expression
        expression={props.question}
        onAnswerChange={props.onAnswerChange}
      />
      {props.children}
    </div>
  );
};
