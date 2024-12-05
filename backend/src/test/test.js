const Game = require('../controller/Game');

describe("Game", function () {
    let game;
  
    describe("Load Test Seekers", function () {
  
        beforeEach(function () {
            game = new Game("King Henry", true);
        });
  
        afterEach(async function () {
  
        });
  
        it("get question text", function () {
            const { q, a, b, c, d } = game.getQuestionText();
            expect(q).toBe("Should I go to war?");
            expect(a).toBe("option A: Yes");
            expect(b).toBe("option B: No");
            expect(c).toBe("option C: Maybe");
            expect(d).toBe("option D: F you");
        });
  
        it("answer question a", function () {
            game.answerQuestion("a");
        });
  
        it("answer question b", function () {
            game.answerQuestion("b");
        });
  
        it("answer question c", function () {
            game.answerQuestion("c");
        });
  
        it("answer question d", function () {
            game.answerQuestion("d");
        });
  
        it("answer question bad", function () {
            expect(() => game.answerQuestion('e')).toThrow('Invalid answer');
        });
  
    });
  
    describe("Load Seekers", function () {
  
        beforeEach(function () {
            game = new Game("King Henry", false);
        });
  
        afterEach(async function () {
  
        });
  
        it("get question text", function () {
            const { q, a, b, c, d } = game.getQuestionText();
            expect(typeof q).toBe("question text 1");
            expect(typeof a).toBe("option A1 value");
            expect(typeof b).toBe("option B1 value");
            expect(typeof c).toBe("option C1 value");
            expect(typeof d).toBe("option D1 value");
        });
  
        it("answer question a", function () {
            game.answerQuestion("a");
        });
  
        it("answer question b", function () {
            game.answerQuestion("b");
        });
  
        it("answer question c", function () {
            game.answerQuestion("c");
        });
  
        it("answer question d", function () {
            game.answerQuestion("d");
        });
  
        it("answer question bad", function () {
            expect(() => game.answerQuestion('e')).toThrow('Invalid answer');
        });
  
    });
  });
  