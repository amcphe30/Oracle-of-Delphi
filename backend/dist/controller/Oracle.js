"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the main programmatic entry point for the project.
 * Method documentation is in IInsightFacade
 *
 */
class Oracle {
    constructor(name) {
        this.name = "Oracle " + name;
        this.credibility = 0.0;
        this.piousness = 0.0;
        this.relations = [];
    }
    getName() {
        return this.name;
    }
    getPiousness() {
        return this.piousness;
    }
    getCredibility() {
        return this.credibility;
    }
    getRelations() {
        return this.relations;
    }
}
exports.default = Oracle;
