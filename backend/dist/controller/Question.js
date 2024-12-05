"use strict";
/**
 * Question for the Oracle, concequences and following questions
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    constructor(text, id, a, b, c, d) {
        this.text = text;
        this.id = id;
        this.answerA = a;
        this.answerB = b;
        this.answerC = c;
        this.answerD = d;
    }
    getText() {
        return {
            q: this.text,
            a: this.answerA.value,
            b: this.answerB.value,
            c: this.answerC.value,
            d: this.answerD.value
        };
    }
    getResponse(ans) {
        let answer;
        if (ans === "a") {
            answer = this.answerA;
        }
        else if (ans === "b") {
            answer = this.answerB;
        }
        else if (ans === "c") {
            answer = this.answerC;
        }
        else if (ans === "d") {
            answer = this.answerD;
        }
        else {
            throw new Error(ans + " is an invalid answer");
        }
        return { response: answer.response, nextQ: answer.nextQuestion };
    }
    getID() {
        return this.id;
    }
}
exports.default = Question;
