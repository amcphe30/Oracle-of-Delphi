import Game from "../../src/controller/Game";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe("Game", function () {
    let game: Game;

    describe("Game methods", function () {

        beforeEach(function () {
            game = new Game("oracle name", false);
        });

        afterEach(async function () {

        });

        it("get question text", function () {
            try {
                const { q, a, b, c, d } = game.getQuestionText();
                expect(typeof q).to.equal("string");
                expect(typeof a).to.equal("string");
                expect(typeof b).to.equal("string");
                expect(typeof c).to.equal("string");
                expect(typeof d).to.equal("string");
            } catch (err) {
                expect.fail("Error thrown getting question text");
            }
        });

        it("answer question a", function () {
            try {
                game.answerQuestion("a");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question b", function () {
            try {
                game.answerQuestion("b");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question c", function () {
            try {
                game.answerQuestion("c");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question d", function () {
            try {
                game.answerQuestion("d");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question bad", function () {
            try {
                game.answerQuestion("e");
                expect.fail("should have thrown in answer question");
            } catch (err) {
                void err;
            }
        });

    });
    describe("Load Seekers", function () {

        beforeEach(function () {
            game = new Game("King Henry", true);
        });

        afterEach(async function () {

        });

        it("get question text", function () {
            try {
                const { q, a, b, c, d } = game.getQuestionText();
                expect(typeof q).to.equal("question text 1");
                expect(typeof a).to.equal("option A1 value");
                expect(typeof b).to.equal("option B1 value");
                expect(typeof c).to.equal("option C1 value");
                expect(typeof d).to.equal("option D1 value");
            } catch (err) {
                expect.fail("Error thrown getting question text");
            }
        });

        it("answer question a", function () {
            try {
                game.answerQuestion("a");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question b", function () {
            try {
                game.answerQuestion("b");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question c", function () {
            try {
                game.answerQuestion("c");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question d", function () {
            try {
                game.answerQuestion("d");
            } catch (err) {
                expect.fail("Error thrown answering question");
            }
        });

        it("answer question bad", function () {
            try {
                game.answerQuestion("e");
                expect.fail("should have thrown in answer question");
            } catch (err) {
                void err;
            }
        });

    });
});