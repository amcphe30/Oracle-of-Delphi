import { Answer } from "./Question";
import Question from "./Question";
import Oracle from "./Oracle";
import AdviceSeeker from "./AdviceSeeker";

/**
 * This is the main programmatic entry point for the project.
 *
 */

export default class Game {
    private oracle: Oracle;
    private seekers: AdviceSeeker[];
    private currSeeker: AdviceSeeker;
    private questionBank: Map<string, Question>;
    private test: boolean;
    private currIndex: number;

    constructor(name: string, questions: Map<string, Question>, seekers: AdviceSeeker[], test: boolean) {
        this.oracle = new Oracle(name);
        this.questionBank = questions;
        this.seekers = seekers;
        this.currSeeker = this.seekers[0];
        this.test = test;
        this.currIndex = 0;
        //this.advanceSeeker();
    }

    public getQuestionText(): { q: string, a: string, b: string, c: string, d: string } {
        const res = this.getCurrentQuestion().getText();
        return res;
    }

    public answerQuestion(ans: string): string {
        const { response, nextQ } = this.getCurrentQuestion().getResponse(ans);
        this.currSeeker.setQuestionID(nextQ);
        this.advanceSeeker();
       return response;
    }

    private lookupQuestion(questionID: string): Question {
        const res = this.questionBank.get(questionID);
        if (res) {
            return res;
        } else {
            throw new Error("Question not found, ID: " + questionID);
        }
    }

    private getCurrentQuestion(): Question {
        if (this.currSeeker.hasQuestion()) {
            const question = this.lookupQuestion(this.currSeeker.getQuestionID());
            return question;
        } else {
            throw new Error("out of questions");
        }
    }

    private advanceSeeker(): void {
        if (!this.currSeeker.hasQuestion()) {
            this.seekers = this.seekers.filter(seeker => seeker !== this.currSeeker);
            this.currIndex--;
        }
        if (this.test) {
            this.currIndex++;
            if (this.currIndex >= this.seekers.length) {
                this.currIndex = 0;
            }
        } else {
            if (this.seekers.length === 0) {
                throw new Error("out of seekers and nothing is in place to deal with it...");
            }
            this.currIndex = Math.floor(Math.random() * (this.seekers.length));
        }
        this.currSeeker = this.seekers[this.currIndex];
    }

}

module.exports = Game;