import AppErr from "@/helpers/AppErr";

export const errorHandler = (error: any, request: any, reply: any) => {
	const err: AppErr = error;
	console.log("err");
	console.log("err ❎: ", err);

	return reply.status(err.statusCode || 200).send({
		status: false,
		message: error.message,
		data: err.data || null,
	});
	return;
};
