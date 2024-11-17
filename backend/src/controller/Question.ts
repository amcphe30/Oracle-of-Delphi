/**
 * Question for the Oracle, concequences and following questions
 *
 */

export interface Answer {
	value: string;
    response: string;
    nextQuestion: Question | null;
    trustEffect: number;
}

export default class Question {
    private text: string;
    private answerA: Answer;
    private answerB: Answer;
    private answerC: Answer;
    private answerD: Answer;

    constructor(text: string, a: Answer, b: Answer, c: Answer, d: Answer) {
        this.text = text;
        this.answerA = a;
        this.answerB = b;
        this.answerC = c;
        this.answerD = d;
    }

    public getText(): { q: string, a: string, b: string, c: string, d: string } {
        return { 
            q: this.text, 
            a: this.answerA.value, 
            b: this.answerB.value, 
            c: this.answerC.value, 
            d: this.answerD.value 
        };
    }

    public getResponse(ans: string): { response: string, nextQ: Question } {
        let answer;
        if (ans === "a") {
            answer = this.answerA;
        } else if (ans === "b") {
            answer =  this.answerB;
        } else if (ans === "c") {
            answer =  this.answerC;
        } else if (ans === "d") {
            answer =  this.answerD;
        } else {
            throw new Error(ans + " is an invalid answer");
        } 
        return { response: answer.response, nextQ: answer.nextQuestion }
    }

}


