import { HTTPMethods, RouteOptions, RouteShorthandOptions } from "fastify";
import { ZodType, z } from "zod";
interface schemaWrapperOpt {
	tags: string[];
}

export interface IRouteOption extends RouteOptions {
	body?: any;
	querystring?: any;
	params?: any;
	headers?: any;
	response?: any;
}

const DefaultResponse = z.object({
	status: z.boolean(),
	message: z.string(),
	data: z.record(z.any(), z.any()),
});

const DefaultSchema = z.record(z.any(), z.any());

export class schemaWrapper {
	public tags: string[];
	constructor(options: schemaWrapperOpt) {
		this.tags = options.tags;
	}

	public get(opt: Omit<IRouteOption, "method">): RouteOptions {
		if (opt?.schema) {
			opt.schema.tags = this.tags;
		}

		return {
			method: "GET",

			schema: {
				...opt.schema,
				tags: this.tags,
				...(opt.body && { body: opt.body }),
				...(opt.querystring && { querystring: opt.querystring }),
				...(opt.params && { params: opt.params }),
				...(opt.headers && { headers: opt.headers }),
				response: opt.response || {
					200: DefaultResponse,
				},
			},
			...opt,
		} as RouteOptions;
	}

	public post(opt: Omit<IRouteOption, "method">): RouteOptions {
		if (opt?.schema) {
			opt.schema.tags = this.tags;
		}

		return {
			method: "POST",

			schema: {
				...opt.schema,
				tags: this.tags,
				...(opt.body && { body: opt.body }),
				...(opt.querystring && { querystring: opt.querystring }),
				...(opt.params && { params: opt.params }),
				...(opt.headers && { headers: opt.headers }),
				response: opt.response || {
					200: DefaultResponse,
				},
			},
			...opt,
		} as RouteOptions;
	}
}
