interface MentalMathLevel {
    levelNumber : number,
    description: string,
    minLeft: number,
    maxLeft: number,
    minRight: number,
    maxRight: number,
    answerMin: number,
    answerMax: number,
    operators: Array<string[1]>,
    repetitions: number,
    answeringTime: number,
    minimumCorrectAnswersForLevelUp: number
}

const getLevel = (levelNumber: number, minLeft: number, maxLeft: number, minRight: number, maxRight: number, answerMin: number, answerMax: number, operators: Array<string[1]>, repetitions: number, answeringTime: number, minimumCorrectAnswersForLevelUp: number, description: string): MentalMathLevel => ({
        levelNumber,
        description,
        minLeft,
        maxLeft,
        minRight,
        maxRight,
        answerMin,
        answerMax,
        operators,
        answeringTime,
        repetitions,
        minimumCorrectAnswersForLevelUp
    })


const levels: MentalMathLevel[] = [
    getLevel(1, 1, 9, 1, 9,1, 10, ['+'], 25, 60, 9, "Liitmine 10 piires"),
    getLevel(2, 1, 9, 1, 9,1, 10, ['-'], 25, 60, 9, "Lahutamine 10 piires"),
    getLevel(3, 1, 9, 1, 9,1, 10, ['-', '+'], 25, 60, 9, "Liitmine ja lahutamine 10 piires"),
    getLevel(4, 1, 10,1, 10, 1, 20, ['+'], 25, 60, 9, "Liitmine 20 piires (liidetavad kuni 10)"),
    getLevel(5, 1, 10,1, 10, 1, 20, ['-'], 25, 60, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 10)"),
    getLevel(6, 1, 10,1, 10, 1, 20, ['+', '-'], 25, 60, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 10)"),
    getLevel(7, 1, 20,1, 20, 1, 20, ['+'], 25, 45, 9, "Liitmine 20 piires (liidetavad kuni 20)"),
    getLevel(8, 1, 20,1, 20, 1, 20, ['-'], 25, 45, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 20)"),
    getLevel(9, 1, 20,1, 20, 1, 20, ['+', '-'], 25, 45, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 20)"),
    getLevel(10, 2, 2, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, kahega korrutamine"),
    getLevel(11, 3, 3, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, kolmega korrutamine"),
    getLevel(12, 4, 4, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, neljaga korrutamine"),
    getLevel(13, 5, 5, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, viiega korrutamine"),
    getLevel(14, 6, 6, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, kuuega korrutamine"),
    getLevel(15, 7, 7, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, seitsmega korrutamine"),
    getLevel(16, 8, 8, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, kaheksaga korrutamine"),
    getLevel(17, 9, 9, 1, 10, 0,100,['*'], 20, 45, 9, "Korrutustabel, üheksaga korrutamine"),
]

console.log("Levels: ",levels)
export default levels;
