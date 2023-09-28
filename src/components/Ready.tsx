import Button from "react-bootstrap/Button";
import {LevelSelect} from "./LevelSelect";

export const Ready = (props: { startCb: () => void , startLevel: (level : number) => void }) => {
    return (
        <div className={"ready-container"}>
            <p>Oled valmis alustama?</p>
            <LevelSelect setStartLevel={props.startLevel}/>
            <Button variant={"primary"} onClick={props.startCb}>JAH!</Button>
        </div>
    )
}
