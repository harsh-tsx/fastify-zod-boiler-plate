import { FastifyInstance } from "fastify";
import { customError } from "@/helpers/AppErr";
import apiError from "@/helpers/errors";
import jwt from "@/helpers/jwt";

const ignorePaths = [];

export const protectRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", async (request, reply) => {
		try {
			const requestPath: string = request.routerPath;
			console.log("request.body: ", request.body);

			if (requestPath.startsWith("/admin/login")) {
				return true;
			}

			const header: string | undefined = request.headers.authorization;
			if (!header) {
				customError(apiError.unauthorized + " 3");
			}
			const token: string = header!.split(" ")[1];
			console.log("accessToken: ", token);

			if (!token) {
				customError(apiError.unauthorized + " 2");
			}

			const decoded = jwt.verify(token);

			if (
				!request.routerPath.startsWith("/admin/login") &&
				request.routerPath.startsWith("/admin") &&
				!decoded?.admin
			) {
				return customError("Invalid Request");
			}
			// let loginUser: any = await redis.get("auth:" + token);

			// if (!loginUser) {
			// 	return reply
			// 		.status(401)
			// 		.send({ status: false, message: "Token mismatch" });
			// }

			// try {
			// 	loginUser = JSON.parse(loginUser);
			// } catch (err) {
			// 	console.log("err: ", err);
			// }
			request.userId = decoded?._id;

			// request.userId = decoded;
			return true;
		} catch (error) {
			reply.send(error);
		}
	});
};
