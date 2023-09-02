import AppErr from "@/helpers/AppErr";
import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (issue.code === z.ZodIssueCode.invalid_type) {
		if (issue.expected === "string") {
			return { message: "bad type!" };
		}
	}
	if (issue.code === z.ZodIssueCode.custom) {
		return { message: `less-than-${(issue.params || {}).minimum}` };
	}
	return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const errorHandler = (error: any, request: any, reply: any) => {
	const err: AppErr = error;

	if (error instanceof z.ZodError) {
		console.log(error);
	}

	// console.log("err ❎: ", err);

	return reply.status(err.statusCode || 200).send({
		status: false,
		message: error.issues?.[0]?.message || error.message,
		data: err.data || null,
	});
	return;
};
