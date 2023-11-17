import Agenda, { Job } from "agenda";
import env from "@/config/mongo";

const agenda = new Agenda({
	db: {
		address: env.uri,
		collection: "jobs",
	},
});

export enum JobNames {
	CreateSession = "CreateSession",
	UpdateSession = "UpdateSession",
	SessionWinningDestribute = "SessionWinningDestribute",
	Test = "Test",
}

export default agenda;
