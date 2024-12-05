import Question from "./Question";

/**
 * Advice Seekers, those who approach the Oracle
 *
 */

export default class AdviceSeeker {
    private name: string;
    public currQuestion: Question | null;  
    private filePath: string;

    constructor(name: string, filePath: string, startingQuestion: Question) {
        this.name = name;
        this.filePath = filePath;
        this.currQuestion = startingQuestion;
        console.log(this.currQuestion);
    }

    public getName(): string {
        return this.name;
    }

    public answerQuestion(ans: string): string {
        if (this.currQuestion) {
            const { response, nextQ } = this.currQuestion.getResponse(ans);
            this.currQuestion = nextQ;
            return response;
        } else {
            throw new Error("currQuestion is null but you answered it ??");
        }
    }

    public getFilepath(): string {
        return this.filePath;
    }

    public hasQuestion(): boolean {
        return this.currQuestion !== null;
    }

}