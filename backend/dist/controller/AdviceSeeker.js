"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Advice Seekers, those who approach the Oracle
 *
 */
class AdviceSeeker {
    constructor(name, filePath, startingQuestionID) {
        this.name = name;
        this.filePath = filePath;
        this.currQuestionID = startingQuestionID;
    }
    getName() {
        return this.name;
    }
    getFilePath() {
        return this.filePath;
    }
    getQuestionID() {
        if (this.currQuestionID) {
            return this.currQuestionID;
        }
        else {
            throw new Error("currQuestionID is null, this advice seeker has no more questions");
        }
    }
    setQuestionID(newQuestionID) {
        this.currQuestionID = newQuestionID;
    }
    hasQuestion() {
        return this.currQuestionID !== null;
    }
}
exports.default = AdviceSeeker;
