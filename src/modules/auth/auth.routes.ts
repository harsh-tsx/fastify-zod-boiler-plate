import { FastifyInstance } from "fastify";
import cn from "./auth.controller";
import { schemaWrapper } from "@/helpers/schemaWrapper";
import { TestQuery } from "./auth.schema";
import { protectRoutes } from "@/middleware/protectRoutes";

const s = new schemaWrapper({
	tags: ["auth"],
});

const authMap = {
	test: s.get({
		url: "/test",
		querystring: TestQuery,
		handler: cn.test,
	}),
};

const authRoute = async (app: FastifyInstance) => {
	app.after(() => {
		Object.values(authMap).forEach((route) => app.route(route));
	});
	// await protectRoutes(app);
};

export default authRoute;
