import Question from "./Question";

/**
 * Possible answer to a question, along with the next question
 * that the advice seeker may ask, given the opportunity
 *
 */

export default class Answer {
    private value: string;
    private response: string;
    private question: Question;
    private trustEffect: number;

    constructor(value: string, response: string, question: Question, trustEffect: number) {
        this.value = value;
        this.response = response;
        this.question = question;
        this.trustEffect = trustEffect;
    }

    public getValue(): string {
        return this.value;
    }

    public getResponse(): string {
        return this.response;
    }

    public getQuestion(): Question {
        return this.question;
    }

    public getTrustEffect(): Number {
        return this.trustEffect;
    }
}