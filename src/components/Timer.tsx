import React, {useEffect, useState} from 'react';


export const Timer = (props: { seconds: number, isCancelled: boolean, rewind: (seconds: number) => void }) => {
    const PROGRESS_BAR_WIDTH = 300;

    const [timerValue, setTimerValue] = useState(props.seconds);
    const {isCancelled, seconds, rewind} = props;
    useEffect(() => {
        let interval = setInterval(() => {
            setTimerValue(timerValue => timerValue - 1)
        }, 1000);
        if (timerValue === 0 || isCancelled) {
            rewind(timerValue)
            setTimerValue(seconds);
        }
        return () => clearInterval(interval);
    }, [seconds, isCancelled, timerValue, rewind]);


    //const progressBar = "".padStart(10/seconds*timerValue, "⚫").padEnd(10, "⚪")
    //const progressBar = "".padStart(10/seconds*timerValue, "▆").padEnd(10, "▁")
    const progressBarWidth = PROGRESS_BAR_WIDTH/seconds*timerValue;
    const styleElement = {width:progressBarWidth+"px", height:"20px"}
    let color = "red_bg"
    if (timerValue > seconds / 3) {
        color = "yellow_bg"
    }
    if (timerValue > seconds / 3 * 2) {
        color = "green_bg"
    }
    return (<div className={"timer-display"} id="progress"><div className={"progressBar "+color} style={styleElement}></div></div>);
}
