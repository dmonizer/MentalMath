import React, {useEffect, useState} from 'react';


export const Timer = (props: { seconds: number, isCancelled: boolean, rewind: (seconds: number) => void }) => {
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
    const progressBar = "".padStart(10/seconds*timerValue, "▆").padEnd(10, "▁")
    let color = "red"
    if (timerValue > seconds / 3) {
        color = "yellow"
    }
    if (timerValue > seconds / 3 * 2) {
        color = "green"
    }
    return (<div className={"timer-display "+color}>{progressBar}</div>);
}
