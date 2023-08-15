import { RouteShorthandOptions } from "fastify";
import { z } from "zod";

export const TestQuery = z.object({
	email: z.string(),
	password: z.string(),
});
export type TestQuery = z.infer<typeof TestQuery>;
