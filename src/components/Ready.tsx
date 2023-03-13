import Button from "react-bootstrap/Button";

export const Ready = (props: { startCb: () => void }) => {
    return (
        <div className={"ready-container"}>
            <p>Oled valmis alustama?</p>
            <Button variant={"primary"} onClick={props.startCb}>JAH!</Button>
        </div>
    )
}
