import fs from "fs";

export const log = {
	cron: async (text: any) => await appendLog(text, "cron"),
	odds: async (text: any) => await appendLog(text, "odds"),
	vote: async (text: any) => await appendLog(text, "vote"),
};

async function appendLog(text: any, file: any) {
	return new Promise((resolve, reject) => {
		try {
			const logFilePath = process.cwd() + `/logs/${file}.txt`;

			fs.appendFile(logFilePath, `${text}\n`, (err) => {
				if (err?.code == "ENOENT") {
					fs.writeFile(logFilePath, `${text}\n`, (er) => {
						if (er) {
							return resolve(er.message);
						}
						return resolve("Log saved successfully");
					});
					return;
				}

				if (err) {
					return resolve(err.message);
				}
				return resolve("Log saved successfully");
			});
		} catch (e) {
			resolve(e);
		}
	});
}

export async function removeFile(file: any) {
	try {
		// Read the log file for the passed date
		const logFilePath = process.cwd() + `/logs/${file}.txt`;
		const RemovedFile = fs.unlinkSync(logFilePath);
		console.log(
			"🚀 ~ file: logger.ts:60 ~ removeFile ~ RemovedFile:",
			RemovedFile,
		);
	} catch (err) {
		console.log(err);
	}
}
