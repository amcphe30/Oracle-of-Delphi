/**
 * Question for the Oracle, concequences and following questions
 *
 */

export interface Answer {
	value: string;
    response: string;
    nextQuestion: string | null;
    trustEffect: number;
}

export default class Question {
    private text: string;
    private id: string;
    private answerA: Answer;
    private answerB: Answer;
    private answerC: Answer;
    private answerD: Answer;

    constructor(text: string, id: string, a: Answer, b: Answer, c: Answer, d: Answer) {
        this.text = text;
        this.id = id;
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

    public getResponse(ans: string): { response: string, nextQ: string | null } {
        let answer;
        if (ans === "A") {
            answer = this.answerA;
        } else if (ans === "B") {
            answer =  this.answerB;
        } else if (ans === "C") {
            answer =  this.answerC;
        } else if (ans === "D") {
            answer =  this.answerD;
        } else {
            throw new Error("Invalid answer");
        } 
        return { response: answer.response, nextQ: answer.nextQuestion }
    }

    public getID(): string {
        return this.id;
    }

}


