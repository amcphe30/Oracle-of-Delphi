import JSZip from "jszip";
import * as fs from "fs-extra";

export const getContent = async (fileName: string): Promise<string> => {
    let content: string;
    const buffer = await fs.readFile("../../res/" + fileName);
	return buffer.toString("base64");
}

export const unzip = async (content: string): Promise<string[]> => {
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

	if (fileProms.length != 2) {
		throw new Error("Zip file should contain 2 files, questions and seekers.");
	}
	return unzippedFiles;
};