import levels  from "../MentalLevelData";
export const LevelSelect = (props: { setStartLevel: (level : number) => void}) => {
    return (
            <div className={"ready-container"}>Alusta levelist:
                <select onChange={event => props.setStartLevel(parseInt(event.target.value))}>
                    {levels.map(level=>{
                        return <option key={level.levelNumber} value={level.levelNumber}>{level.description}</option>
                    })}
                </select>
            </div>
    )
}
