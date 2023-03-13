import * as React from "react";

export enum ScoreDirection {
    STEADY,
    UP,
    DOWN
}
export const Score = (props: { value: number, direction:ScoreDirection }) => {
    let color = "";
    switch (props.direction) {
        case ScoreDirection.UP:
            color = "green"; break
        case ScoreDirection.DOWN:
            color = "red"; break
    }
    return <div className={"score-display " + color} title={"Teenitud punktid"}>P: {props.value}</div>;
}
