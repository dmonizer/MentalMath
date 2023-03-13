import * as React from "react";

export const Level = (props: { level: number }) => {
    return (<div className="level-display" title={"Saavutatud tase"}>T: <strong>{props.level}</strong></div>);
}
