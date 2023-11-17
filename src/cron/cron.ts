process.env.TZ = "UTC";
import redis from "@/db/redis";
import { connectDB } from "@/db/mongo";
import moment from "moment";

import agenda, { JobNames } from "@/helpers/agenda";
import { Job } from "agenda";

const main = async () => {
	try {
		await connectDB("Cron Thread");
		await cancelAll();

		await agenda.start();
		const time = moment().format();
	} catch (err) {
		console.error(err);
	}
};

const cancelAll = async () => {
	await agenda.cancel({
		name: {
			$in: [JobNames.CreateSession, JobNames.UpdateSession],
		},
	});
};
main();
