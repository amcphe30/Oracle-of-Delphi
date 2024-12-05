"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Question_1 = __importDefault(require("./Question"));
const Oracle_1 = __importDefault(require("./Oracle"));
const AdviceSeeker_1 = __importDefault(require("./AdviceSeeker"));
const queryLoaderHelpers_1 = require("./queryLoaderHelpers");
/**
 * This is the main programmatic entry point for the project.
 *
 */
class Game {
    constructor(name, test) {
        this.seekers = [];
        this.oracle = new Oracle_1.default(name);
        if (test) {
            this.loadTestSeekers();
            this.currSeeker = this.seekers[0];
        }
        else {
            this.loadSeekers();
            this.currSeeker = this.seekers[0];
            // TODO: currSeeker should be originally set to a random from the list
        }
    }
    /**
    * Loads all AdviceSeekers from a .json file into the current game, right now, this
    * is hard coded but the intention is to be able to edit and add seekers easily but
    * updated the json, rather than messing with the class itself.
    *
     */
    loadTestSeekers() {
        this.seekers = [];
        const A = {
            value: "option A: Yes",
            response: "Okay I will!",
            nextQuestion: null,
            trustEffect: 0.3,
        };
        const B = {
            value: "option B: No",
            response: "Okay I won't!",
            nextQuestion: null,
            trustEffect: 0.3,
        };
        const C = {
            value: "option C: Maybe",
            response: "How can I be sure of anything?!",
            nextQuestion: null,
            trustEffect: -10.0,
        };
        const D = {
            value: "option D: F you",
            response: "F me? F you! I'm going to war!",
            nextQuestion: null,
            trustEffect: -3.0,
        };
        const kingQuestion1 = new Question_1.default("Should I go to war?", 0, A, B, C, D);
        const king = new AdviceSeeker_1.default("King Jim", "", kingQuestion1);
        this.seekers.push(king);
    }
    getQuestionText() {
        if (this.currSeeker.hasQuestion() && this.currSeeker.currQuestion) {
            return this.currSeeker.currQuestion.getText();
        }
        else {
            throw new Error("out of questions");
            // update currSeeker to be nextSeeker
        }
    }
    answerQuestion(ans) {
        const response = this.currSeeker.answerQuestion(ans);
        // TODO: set currSeeker to next seeker
    }
    loadSeekers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.seekers = [];
            const content = yield (0, queryLoaderHelpers_1.getContent)("files.zip");
            const unzippedFiles = (0, queryLoaderHelpers_1.unzip)(content);
            console.log(unzippedFiles);
        });
    }
}
exports.default = Game;
