import Question from "./Question";

/**
 * Advice Seekers, those who approach the Oracle
 *
 */

export default class AdviceSeeker {
    private name: string;
    public currQuestionID: string | null;  
    private filePath: string;

    constructor(name: string, filePath: string, startingQuestionID: string) {
        this.name = name;
        this.filePath = filePath;
        this.currQuestionID = startingQuestionID;
    }

    public getName(): string {
        return this.name;
    }

    public getFilepath(): string {
        return this.filePath;
    }

    public getQuestionID(): string {
        if (this.currQuestionID) {
            return this.currQuestionID;
        } else {
            throw new Error("currQuestionID is null, this advice seeker has no more questions");
        }
    }

    public setQuestionID(newQuestionID: string | null): void {
        this.currQuestionID = newQuestionID;
    }

    public hasQuestion(): boolean {
        return this.currQuestionID !== null;
    }

}