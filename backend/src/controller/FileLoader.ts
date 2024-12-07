import JSZip, { forEach } from "jszip";
import * as fs from "fs-extra";
import * as path from 'path';
import Question from "./Question";
import { Answer } from "./Question";
import AdviceSeeker from "./AdviceSeeker";

export default class FileLoader {

	public async getGameContent(resFileName: string): Promise<{ questionBank: Map<string, Question>, seekers: AdviceSeeker[]}> {
        const content = await this.getContent(resFileName + ".zip");
        const unzippedFiles = await this.unzip(content);
        const parsedObjects = await this.parseThings(unzippedFiles);
        const questionBank = this.makeQuestionObjects(parsedObjects[1]);
        const seekers = this.makeSeekerObjects(parsedObjects[0]);
		this.validateQuestions(questionBank);
		this.validateFirstQuestions(seekers, questionBank);
		return { questionBank, seekers };
	}

	private async getContent (fileName: string): Promise<string> {
		const filePath = path.join(__dirname, '../../res/', fileName);
		const buffer = await fs.readFile(filePath);
		return buffer.toString("base64");
	}
	
	private async unzip (content: string): Promise<string[]> {
		const unzippedFiles: string[] = [];
		const jsZip = new JSZip();
		let tryResult;
	
		try {
			tryResult = await jsZip.loadAsync(content, { base64: true });
			if (Object.keys(tryResult.files).length === 0) {
				throw new Error("empty dir folder");
			}
		} catch (err) {
			throw new Error(`threw unzip: ${err}`);
		}
	
		const result = tryResult;
	
		if (Object.keys(result.files).length === 0) {
			throw new Error("empty dir folder");
		}
	
		const fileProms = Object.keys(result.files).map(async (filename) => {
			const fileData = await result.files[filename].async("string");
			unzippedFiles.push(fileData);
		});
	
		await Promise.all(fileProms);
		return unzippedFiles;
	}
	
	private async parseThings (content: string[]): Promise<Object[]> {
		const formatted = content
			.filter((item) => item.trim().length > 0) 
			.map((item) => {
				try {
					return JSON.parse(item);
				} catch (err) {
				   void err;
				}
			})
			.filter((obj) => obj != null);
	
		if (formatted.length === 0) {
			throw new Error("no questions");
		}
		return formatted;
	}
	
	private makeQuestionObjects (jsonQuestions: Object): Map<string, Question> {
		let questions = new Map<string, Question>;
		Object.entries(jsonQuestions).forEach(([key, q]) => {
			const qText = Object.values(q)[0] as string;
			const aAnswer = this.makeAnswer(Object.values(q)[1]);
			const bAnswer = this.makeAnswer(Object.values(q)[2]);
			const cAnswer = this.makeAnswer(Object.values(q)[3]);
			const dAnswer = this.makeAnswer(Object.values(q)[4]);
			const question = new Question(qText, key, aAnswer, bAnswer, cAnswer, dAnswer);
			questions.set(key, question);
		});
		return questions;
	}
	
	private makeAnswer (answerObj: unknown): Answer {
		if (typeof answerObj === "object" && answerObj !== null) {
			let nextQ: string | null = null;
			let trust = 0;
			if (Object.keys(answerObj)[2] === "nextQuestion") {
				nextQ = Object.values(answerObj)[2];
				trust = Object.values(answerObj)[3];
			} else {
				trust = Object.values(answerObj)[2];
			}
			const answer: Answer = {
				value: Object.values(answerObj)[0] as string,
				response: Object.values(answerObj)[1] as string,
				nextQuestion: nextQ,
				trustEffect: trust,
			}
			return answer;
		} else {
			throw new Error("Error creating answer object");
		}
	};
	
	private makeSeekerObjects (jsonSeekers: Object): AdviceSeeker[] {
		let seekers: AdviceSeeker[] = [];
		Object.entries(jsonSeekers).forEach(([key, s]) => {
			const seeker = this.makeSeeker(key, s);
			seekers.push(seeker);
		});
		return seekers;
	}
	
	private makeSeeker (name: string, jsonSeeker: unknown): AdviceSeeker {
		if (typeof jsonSeeker === "object" && jsonSeeker !== null) {
			let filePath = Object.values(jsonSeeker)[1];
			let startingQuestion = Object.values(jsonSeeker)[0];
			const seeker = new AdviceSeeker(name, filePath, startingQuestion);
			return seeker;
		} else {
			throw new Error("Error creating answer object");
		}
		
	};

	private validateQuestions(questions: Map<string, Question>): void {
		// look for cycle starting in each question in list, if found, throw error
		// if nextQ doesn't exist in map, throw error
	}

	private validateFirstQuestions(seekers: AdviceSeeker[], questions: Map<string, Question>): void {
		seekers.forEach(seeker => {
			if (!questions.has(seeker.getQuestionID())) {
				throw new Error("Seeker's first question ID does not exist in bank");
			}
		});
	}

}

module.exports = FileLoader;