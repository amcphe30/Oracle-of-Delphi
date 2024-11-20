import Question from "./Question";

/**
 * Advice Seekers, those who approach the Oracle
 *
 */

export default class AdviceSeeker {
    private name: string;
    public currQuestion: Question;  
    private filePath: string;

    constructor(name: string, filePath: string, startingQuestion: Question) {
        this.name = name;
        this,filePath = filePath;
        this.currQuestion = startingQuestion;
    }

    public getName(): string {
        return this.name;
    }

    public answerQuestion(ans: string): string {
        const { response, nextQ } = this.currQuestion.getResponse(ans);
        this.currQuestion = nextQ;
        return response;
    }

    public getFilepath(): string {
        return this.filePath;
    }

}