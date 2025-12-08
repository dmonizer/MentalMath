interface MentalMathLevel {
    levelNumber : number,
    description: string,
    questionFormat: string,
    answerMin: number,
    answerMax: number,
    repetitions: number,
    answeringTime: number,
    minimumCorrectAnswersForLevelUp: number
}

const getLevel = (levelNumber: number, questionFormat: string, answerMin: number, answerMax: number, repetitions: number, answeringTime: number, minimumCorrectAnswersForLevelUp: number, description: string): MentalMathLevel => ({
        levelNumber,
        description,
        questionFormat,
        answerMin,
        answerMax,
        answeringTime,
        repetitions,
        minimumCorrectAnswersForLevelUp
    })


const levels: MentalMathLevel[] = [
    getLevel(1, "x+y", 1, 10, 25, 60, 9, "Liitmine 10 piires"),
    getLevel(2, "x-y", 1, 10, 25, 60, 9, "Lahutamine 10 piires"),
    getLevel(3, "x+y-z", 1, 10, 25, 60, 9, "Liitmine ja lahutamine 10 piires"),
    getLevel(4, "x+y", 1, 20, 25, 60, 9, "Liitmine 20 piires"),
    getLevel(5, "x-y", 1, 20, 25, 60, 9, "Lahutamine 20 piires"),
    getLevel(6, "x+y-z", 1, 20, 25, 60, 9, "Liitmine ja lahutamine 20 piires"),
    getLevel(7, "x*y", 1, 20, 25, 45, 9, "Korrutamine 20 piires"),
    getLevel(8, "x*y+z", 1, 30, 25, 45, 9, "Korrutamine ja liitmine 30 piires"),
    getLevel(9, "(x+y)*z", 1, 100, 25, 45, 9, "Sulgudes liitmine ja korrutamine 100 piires"),
    getLevel(10, "(x-y)*z", 1, 100, 25, 45, 9, "Sulgudes lahutamine ja korrutamine 100 piires"),
    getLevel(11, "(x+y)*(z-w)", 1, 100, 25, 45, 9, "Sulgudes liitmine ja lahutamine korrutamisega 100 piires"),
]

console.log("Levels: ",levels)
export default levels;
