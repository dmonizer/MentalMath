interface MentalMathLevel {
    description: string,
    min: number,
    answerMin: number,
    max: number,
    answerMax: number,
    operators: Array<string[1]>,
    repetitions: number,
    answeringTime: number,
    minimumCorrectAnswersForLevelUp: number,
}

const getLevel = (min: number, max: number, answerMin: number, answerMax: number, operators: Array<string[1]>, repetitions: number, answeringTime: number, minimumCorrectAnswersForLevelUp: number, description: string): MentalMathLevel => ({
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


let levels: MentalMathLevel[] = [
    getLevel(1, 9, 1, 9, ['+'], 15, 15, 9, "Liitmine 9 piires"),
    getLevel(1, 9, 1, 9, ['-'], 15, 15, 9, "Lahutamine 9 piires"),
    getLevel(1, 9, 1, 9, ['-', '+'], 15, 15, 9, "Liitmine ja lahutamine 9 piires"),
    getLevel(1, 10, 1, 20, ['+'], 15, 15, 9, "Liitmine 20 piires (liidetavad kuni 10)"),
    getLevel(1, 10, 1, 20, ['-'], 15, 15, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 10)"),
    getLevel(1, 10, 1, 20, ['+', '-'], 15, 15, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 10)"),
    getLevel(1, 20, 1, 20, ['+'], 15, 15, 9, "Liitmine 20 piires (liidetavad kuni 20)"),
    getLevel(1, 20, 1, 20, ['-'], 15, 15, 9, "Lahutamine 20 piires (lahutaja ja lahutatav kuni 20)"),
    getLevel(1, 20, 1, 20, ['+', '-'], 15, 15, 9, "Liitmine ja lahutamine 20 piires (liidetavad, lahutatavad kuni 20)"),
]

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    levels = [
        {
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
            description: "DEV3",
            min: 1,
            answerMin: 1,
            max: 9,
            answerMax: 10,
            operators: ['-', "+"],
            answeringTime: 15,
            repetitions: 2,
            minimumCorrectAnswersForLevelUp: 2
        },
    ]

}

export default levels;
