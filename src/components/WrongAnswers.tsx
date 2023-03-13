import * as React from "react";

export const WrongAnswers = (props: { answersLeft: number, max:number }) => {
    return <div>{"".padStart(props.max - props.answersLeft,"⚪").padEnd(props.max, "⚫")}</div>;
}
