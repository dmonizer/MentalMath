import * as React from "react";

export const Level = (props: { level: number }) => {
    return (<div className="level-display">Tase: <strong>{props.level}</strong></div>);
}
