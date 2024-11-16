// This is an instance of a game
// contains fields like credibility, piousness, story progress
// list of relationships with trust, goodwill
import AdviceSeeker from "./AdviceSeeker";
/**
 * This is the main programmatic entry point for the project.
 * Method documentation is in IInsightFacade
 *
 */

export default class Oracle {
    private name: string;
    private credibility: number;
    private piousness: number;
    private relations: AdviceSeeker[];

    constructor(name: string) {
        this.name = "Oracle " + name;
        this.credibility = 0.0;
        this.piousness = 0.0;
        this.relations = [];
    }

    public getName(): string {
        return this.name;
    }

    public getPiousness(): number {
        return this.piousness;
    }

    public getCredibility(): number {
        return this.credibility;
    }

    public getRelations(): AdviceSeeker[] {
        return this.relations;
    }
}