interface MentalMathLevel {
    levelNumber : number,
    description: string,
    min: number,
    answerMin: number,
    max: number,
    answerMax: number,
    operators: Array<string[1]>,
    repetitions: number,
    answeringTime: number,
    minimumCorrectAnswersForLevelUp: number
}

const getLevel = (levelNumber: number, min: number, max: number, answerMin: number, answerMax: number, operators: Array<string[1]>, repetitions: number, answeringTime: number, minimumCorrectAnswersForLevelUp: number, description: string): MentalMathLevel => ({
        levelNumber,
        description,
        min,
        answerMin,
        max,
        answerMax,
        operators,
        answeringTime,
        repetitions,
        minimumCorrectAnswersForLevelUp
    })


const levels: MentalMathLevel[] = [
    getLevel(1, 1, 9, 1, 10, ['+'], 25, 60, 9, "Liitmine 10 piires"),
    getLevel(2, 1, 9, 1, 10, ['-'], 25, 60, 9, "Lahutamine 10 piires"),
    getLevel(3, 1, 9, 1, 10, ['-', '+'], 25, 60, 9, "Liitmine ja lahutamine 10 piires"),
    getLevel(4, 1, 10, 1, 20, ['+'], 25, 60, 9, "Liitmine 20 piires (liidetavad kuni 10)"),
    getLevel(5, 1, 10, 1, 20, ['-'], 25, 60, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 10)"),
    getLevel(6, 1, 10, 1, 20, ['+', '-'], 25, 60, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 10)"),
    getLevel(7, 1, 20, 1, 20, ['+'], 25, 45, 9, "Liitmine 20 piires (liidetavad kuni 20)"),
    getLevel(8, 1, 20, 1, 20, ['-'], 25, 45, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 20)"),
    getLevel(9, 1, 20, 1, 20, ['+', '-'], 25, 45, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 20)"),
]

/*if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    levels = [
        {
            levelNumber:1,
            description: "DEV1",
            min: 1,
            answerMin: 1,
            max: 9,
            answerMax: 9,
            operators: ['+'],
            answeringTime: 5,
            repetitions: 2,
            minimumCorrectAnswersForLevelUp: 2
        },
        {
            levelNumber:2,
            description: "DEV2",
            min: 1,
            answerMin: 1,
            max: 9,
            answerMax: 9,
            operators: ['-'],
            answeringTime: 15,
            repetitions: 2,
            minimumCorrectAnswersForLevelUp: 2
        },
        {
            levelNumber:3,
            description: "DEV3",
            min: 999,
            answerMin: 1,
            max: 99999,
            answerMax: 10,
            operators: ['-', "+"],
            answeringTime: 15,
            repetitions: 2,
            minimumCorrectAnswersForLevelUp: 2
        },
    ]

}*/

export default levels;
