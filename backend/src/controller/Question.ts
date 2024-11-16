import Answer from "./Answer";

/**
 * Question for the Oracle, concequences and following questions
 *
 */

export default class Question {
    private text: string;
    private answers: Answer[];

    constructor(text: string) {
        this.text = text;
        this.answers = [];
    }

    public getText(): string {
        return this.text;
    }

    public addAnswer(value: string, response: string, question: Question, trustEffect: number): void {
        const answer = new Answer(value, response, question, trustEffect);
        this.answers.push(answer);
    }

}


