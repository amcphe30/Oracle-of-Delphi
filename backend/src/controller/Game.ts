import { Answer } from "./Question";
import Question from "./Question"
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

    constructor(name: string) {
        this.oracle = new Oracle(name);
        this.loadSeekers();
        this.currSeeker = this.seekers[0];
        // TODO: currSeeker should be originally set to a random from the list
    }

    /**
    * Loads all AdviceSeekers from a .json file into the current game, right now, this
    * is hard coded but the intention is to be able to edit and add seekers easily but
    * updated the json, rather than messing with the class itself.
    *
     */

    private loadSeekers(): void {
        this.seekers = [];
        const A: Answer = {
            value: "option A: Yes",
            response: "Okay I will!",
            nextQuestion: null,
            trustEffect: 0.3,
        }  
        const B: Answer = {
            value: "option B: No",
            response: "Okay I won't!",
            nextQuestion: null,
            trustEffect: 0.3,
        } 
        const C: Answer = {
            value: "option C: Maybe",
            response: "How can I be sure of anything?!",
            nextQuestion: null,
            trustEffect: -10.0,
        } 
        const D: Answer = {
            value: "option D: F you",
            response: "F me? F you! I'm going to war!",
            nextQuestion: null,
            trustEffect: -3.0,
        }              
        const kingQuestion1 = new Question("Should I go to war?", A, B, C, D);
        const king = new AdviceSeeker("King Jim", kingQuestion1);
        this.seekers.push(king);
    }

    public getQuestionText(): { q: string, a: string, b: string, c: string, d: string } {
        return this.currSeeker.currQuestion.getText();
    }

    public answerQuestion(ans: string): void {
        const response = this.currSeeker.answerQuestion(ans);
        // TODO: set currSeeker to next seeker
    }

}