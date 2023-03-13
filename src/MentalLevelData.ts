interface MentalMathLevel {
    min: number,
    answerMin: number,
    max: number,
    answerMax: number,
    operators: Array<string[1]>,
    repetitions: number,
    answeringTime: number,
    minimumCorrectAnswersForLevelUp: number,
}

const levels: MentalMathLevel[] = [
    {min: 1, answerMin: 1, max: 9, answerMax: 9, operators: ['+'], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 9, answerMax: 9, operators: ['-'], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 9, answerMax: 10, operators: ['-', "+"], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 9, answerMax: 20, operators: ['+'], answeringTime: 10, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 9, answerMax: 20, operators: ['-'], answeringTime: 10, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 9, answerMax: 20, operators: ['+','-'], answeringTime: 10, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 20, answerMax: 20, operators: ['+'], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 20, answerMax: 20, operators: ['-'], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
    {min: 1, answerMin: 1, max: 20, answerMax: 20, operators: ['+','-'], answeringTime: 15, repetitions: 15, minimumCorrectAnswersForLevelUp:9},
]

export default levels;
