import Question from "./Question";
import Oracle from "./Oracle";
import AdviceSeeker from "./AdviceSeeker";

/**
 * This is the main programmatic entry point for the project.
 * Method documentation is in IInsightFacade
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
    }

    private loadSeekers(): void {
        this.seekers = [];
    }

    public nextQuestion(): Question {
        return this.currSeeker.getQuestion();
    }

}