"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Oracle_1 = __importDefault(require("./Oracle"));
/**
 * This is the main programmatic entry point for the project.
 *
 */
class Game {
    constructor(name, questions, seekers, test) {
        this.oracle = new Oracle_1.default(name);
        this.questionBank = questions;
        this.seekers = seekers;
        this.currSeeker = this.seekers[0];
        this.test = test;
        this.currIndex = 0;
        this.advanceSeeker();
    }
    getQuestionText() {
        const res = this.getCurrentQuestion().getText();
        this.advanceSeeker();
        return res;
    }
    answerQuestion(ans) {
        const { response, nextQ } = this.getCurrentQuestion().getResponse(ans);
        this.currSeeker.setQuestionID(nextQ);
        this.advanceSeeker();
        return response;
    }
    lookupQuestion(questionID) {
        const res = this.questionBank.get(questionID);
        if (res) {
            return res;
        }
        else {
            throw new Error("Question not found, ID: " + questionID);
        }
    }
    getCurrentQuestion() {
        if (this.currSeeker.hasQuestion()) {
            const question = this.lookupQuestion(this.currSeeker.getQuestionID());
            return question;
        }
        else {
            throw new Error("out of questions");
        }
    }
    advanceSeeker() {
        if (!this.currSeeker.hasQuestion()) {
            this.seekers = this.seekers.filter(seeker => seeker !== this.currSeeker);
        }
        if (this.test) {
            this.currIndex++;
            if (this.currIndex === this.seekers.length) {
                this.currIndex = 0;
            }
        }
        else {
            if (this.seekers.length === 0) {
                console.log("Out of seekers");
            }
            const index = Math.floor(Math.random() * (this.seekers.length));
            this.currSeeker = this.seekers[index];
        }
    }
}
exports.default = Game;
module.exports = Game;
