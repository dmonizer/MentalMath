import * as React from "react";

export const Level = (props: { level: number, totalLevels:number }) => {
    return (<div className="level-display" title={"Saavutatud tase"}>T: <strong>{props.level} / {props.totalLevels}</strong></div>);
}
