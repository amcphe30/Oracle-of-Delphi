"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Advice Seekers, those who approach the Oracle
 *
 */
class AdviceSeeker {
    constructor(name, filePath, startingQuestion) {
        this.name = name;
        this.filePath = filePath;
        this.currQuestion = startingQuestion;
        console.log(this.currQuestion);
    }
    getName() {
        return this.name;
    }
    answerQuestion(ans) {
        if (this.currQuestion) {
            const { response, nextQ } = this.currQuestion.getResponse(ans);
            this.currQuestion = nextQ;
            return response;
        }
        else {
            throw new Error("currQuestion is null but you answered it ??");
        }
    }
    getFilepath() {
        return this.filePath;
    }
    hasQuestion() {
        return this.currQuestion !== null;
    }
}
exports.default = AdviceSeeker;
