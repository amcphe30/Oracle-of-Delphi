const Game = require('../controller/Game');
const FileLoader = require('../controller/FileLoader');

describe("Game", function () {
    let game;
  
    describe("Type testing questions and answers", function () {
  
        beforeEach(async function () {
            const loader = new FileLoader();
            const { questionBank, seekers } = await loader.getGameContent("files");
            game = new Game("King Henry", questionBank, seekers, true);
        });
  
        afterEach(async function () {
  
        });
  
        it("get question text", function () {
            const { q, a, b, c, d } = game.getQuestionText();
            expect(typeof q).toBe("string");
            expect(typeof a).toBe("string");
            expect(typeof b).toBe("string");
            expect(typeof c).toBe("string");
            expect(typeof d).toBe("string");
        });
  
        it("answer question a", function () {
            game.answerQuestion("A");
        });
  
        it("answer question bad", function () {
            expect(() => game.answerQuestion('E')).toThrow('Invalid answer');
        });
  
    });
  
    describe("Load Seekers", function () {
  
        beforeEach(async function () {
            const loader = new FileLoader();
            const { questionBank, seekers } = await loader.getGameContent("files");
            game = new Game("King Henry", questionBank, seekers, true);
        });
  
        it("All seekers answer 1 question", function () {
            let { q, a, b, c, d } = game.getQuestionText();
            if (q === "question text 1") {
                expect(a).toBe("option A1 value");
                expect(b).toBe("option B1 value");
                expect(c).toBe("option C1 value");
                expect(d).toBe("option D1 value");
                game.answerQuestion("A");
            } else if (q === "question text 4") {
                expect(a).toBe("option A4 value");
                expect(b).toBe("option B4 value");
                expect(c).toBe("option C4 value");
                expect(d).toBe("option D4 value");
                game.answerQuestion("D");
            } else if (q === "question text 5") {
                expect(a).toBe("option A5 value");
                expect(b).toBe("option B5 value");
                expect(c).toBe("option C5 value");
                expect(d).toBe("option D5 value");
            } else {
                throw new Error("First question text unexpected: " + q);
            }
        });
  
        it("Explore longest path in each tree", function () {
            console.log("testing longest path");
            // 1C
            game.answerQuestion("C");
            // 2B -> null
            game.answerQuestion("B");
            // 3A
            game.answerQuestion("A");
            // 1A
            game.answerQuestion("A");
            // 3D
            game.answerQuestion("D");
            // 1B -> null
            game.answerQuestion("B");
            // 3A -> null
            game.answerQuestion("A");
        });

        it("Explore different path", function () {
            console.log("testing different paths")
            // 1D -> null
            game.answerQuestion("D");
            // 2B -> null
            game.answerQuestion("B");
            // 3B
            game.answerQuestion("B");
            // 3C
            game.answerQuestion("C");
            // 3A
            game.answerQuestion("A");
            
        });
  
    });

    describe("Invalid res files", function () {

        beforeEach(function () {
            loader = new FileLoader();
        });

  
        it("cycle in question", async function () {
            const { questionBank, seekers } = await loader.getGameContent("cycle");
            expect(() => new Game("King Henry", questionBank, seekers, false)).toThrow('Invalid answer');
        });

        it("non existant question ID in questions", async function () {
            const { questionBank, seekers } = await loader.getGameContent("nonExistantQID");
            expect(() => new Game("King Henry", questionBank, seekers, false)).toThrow('Invalid answer');        
        });

        it("non existant question ID in seekers", async function () {
            const { questionBank, seekers } = await loader.getGameContent("nonExistantQID2");
            expect(() => new Game("King Henry", questionBank, seekers, false)).toThrow('Invalid answer');        
        });
  
    });

  });
  