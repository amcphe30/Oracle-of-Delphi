import Question from "./Question";


/**
 * Advice Seekers, those who approach the Oracle
 *
 */

export default class AdviceSeeker {
    private name: string;
    private occupation: string;
    private trust: number;
    private currQuestion: Question;  

    constructor(name: string, occupation: string, startingQuestion: Question) {
        this.name = name;
        this.occupation = occupation;
        this.trust = 5.0;
        this.currQuestion = startingQuestion;
    }

    public getName(): string {
        return this.name;
    }

    public getOccupation(): string {
        return this.occupation;
    }

    public getTrust(): number {
        return this.trust;
    }

    public getQuestion(): Question {
        return this.currQuestion;
    }

}