import { R, asyncWrapper } from "@/helpers/response-helpers";
import authService from "./auth.service";
import apiError from "@/helpers/errors";

import { TestQuery } from "./auth.schema";
const authController = {
	test: asyncWrapper<{ Query: TestQuery }>(async (req, res) => {
		return R(true, "Hello from auth");
	}),
};

export default authController;
