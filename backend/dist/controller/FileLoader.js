"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const jszip_1 = __importDefault(require("jszip"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const Question_1 = __importDefault(require("./Question"));
const AdviceSeeker_1 = __importDefault(require("./AdviceSeeker"));
class FileLoader {
    getGameContent(resFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield this.getContent(resFileName + ".zip");
            const unzippedFiles = yield this.unzip(content);
            const parsedObjects = yield this.parseThings(unzippedFiles);
            const questionBank = this.makeQuestionObjects(parsedObjects[1]);
            const seekers = this.makeSeekerObjects(parsedObjects[0]);
            return { questionBank, seekers };
        });
    }
    getContent(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(__dirname, '../../res/', fileName);
            const buffer = yield fs.readFile(filePath);
            return buffer.toString("base64");
        });
    }
    unzip(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const unzippedFiles = [];
            const jsZip = new jszip_1.default();
            let tryResult;
            try {
                tryResult = yield jsZip.loadAsync(content, { base64: true });
                if (Object.keys(tryResult.files).length === 0) {
                    throw new Error("empty dir folder");
                }
            }
            catch (err) {
                throw new Error(`threw unzip: ${err}`);
            }
            const result = tryResult;
            if (Object.keys(result.files).length === 0) {
                throw new Error("empty dir folder");
            }
            const fileProms = Object.keys(result.files).map((filename) => __awaiter(this, void 0, void 0, function* () {
                const fileData = yield result.files[filename].async("string");
                unzippedFiles.push(fileData);
            }));
            yield Promise.all(fileProms);
            return unzippedFiles;
        });
    }
    parseThings(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatted = content
                .filter((item) => item.trim().length > 0)
                .map((item) => {
                try {
                    return JSON.parse(item);
                }
                catch (err) {
                    void err;
                }
            })
                .filter((obj) => obj != null);
            if (formatted.length === 0) {
                throw new Error("no questions");
            }
            return formatted;
        });
    }
    makeQuestionObjects(jsonQuestions) {
        let questions = new Map;
        Object.entries(jsonQuestions).forEach(([key, q]) => {
            const qText = Object.values(q)[0];
            const aAnswer = this.makeAnswer(Object.values(q)[1]);
            const bAnswer = this.makeAnswer(Object.values(q)[2]);
            const cAnswer = this.makeAnswer(Object.values(q)[3]);
            const dAnswer = this.makeAnswer(Object.values(q)[4]);
            const question = new Question_1.default(qText, key, aAnswer, bAnswer, cAnswer, dAnswer);
            questions.set(key, question);
        });
        return questions;
    }
    makeAnswer(answerObj) {
        if (typeof answerObj === "object" && answerObj !== null) {
            let nextQ = null;
            let trust = 0;
            if (Object.keys(answerObj)[2] === "nextQuestion") {
                nextQ = Object.values(answerObj)[2];
                trust = Object.values(answerObj)[3];
            }
            else {
                trust = Object.values(answerObj)[2];
            }
            const answer = {
                value: Object.values(answerObj)[0],
                response: Object.values(answerObj)[1],
                nextQuestion: nextQ,
                trustEffect: trust,
            };
            return answer;
        }
        else {
            throw new Error("Error creating answer object");
        }
    }
    ;
    makeSeekerObjects(jsonSeekers) {
        let seekers = [];
        Object.entries(jsonSeekers).forEach(([key, s]) => {
            const seeker = this.makeSeeker(key, s);
            seekers.push(seeker);
        });
        return seekers;
    }
    makeSeeker(name, jsonSeeker) {
        if (typeof jsonSeeker === "object" && jsonSeeker !== null) {
            let filePath = Object.values(jsonSeeker)[1];
            let startingQuestion = Object.values(jsonSeeker)[0];
            const seeker = new AdviceSeeker_1.default(name, filePath, startingQuestion);
            return seeker;
        }
        else {
            throw new Error("Error creating answer object");
        }
    }
    ;
}
exports.default = FileLoader;
module.exports = FileLoader;
