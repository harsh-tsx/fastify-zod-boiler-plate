// import Joi from "joi";
import env from "./env";
import {
	object,
	string,
	array,
	tuple,
	date,
	boolean,
	number,
	mixed,
} from "yup";
const { SwaggerTheme } = require("swagger-themes");
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const theme = new SwaggerTheme("v3");
const content = theme.getBuffer("dark");

// const convert = require("joi-to-json");
import { convertSchema } from "@sodaru/yup-to-json-schema";
import { SwaggerOptions } from "@fastify/swagger";

const removeKeyFromObj = (obj: any, key: string) => {
	for (let _key in obj) {
		if (_key == key) {
			delete obj[key];
		}

		if (typeof obj[_key] == "object" && Object.keys(obj[_key]).length) {
			removeKeyFromObj(obj[_key], key);
		}
	}
};

export default {
	routePrefix: "/v1/api-doc",
	mode: "dynamic",
	exposeRoute: true,
	swagger: {
		info: {
			title: "node fastify app init - swagger",
			description: "Testing the Fastify swagger API",
			version: "1.0.0",
		},
		externalDocs: {
			url: "https://swagger.io",
			description: "Find more info here",
		},
		// host: `cg-api.frutocity.cf`,
		schemes: ["http", "https"],
		consumes: ["application/json", "multipart/form-data"],
		produces: ["application/json"],
		tags: [
			{ name: "auth", description: "Auth related end-points" },
			{ name: "user", description: "User related end-points" },
			{ name: "wallet", description: "Contest related end-points" },
			{ name: "team", description: "Team related end-points" },
			{ name: "adminleague", description: "Admin League related end-points" },
			{ name: "leaderboard", description: "Leaderboard related end-points" },
			{ name: "wallet", description: "Wallet related end-points" },
			{ name: "admin", description: "Admin related end-points" },
			// { name: "contest", description: "Contest related end-points" },
		],
		securityDefinitions: {
			Bearer: {
				type: "apiKey",
				name: "Authorization",
				in: "header",
			},
		},
	},
	uiConfig: {
		// docExpansion: "full",
		deepLinking: true,
	},
	uiHooks: {
		// @ts-ignore
		onRequest: function (request, reply, next) {
			reply.headers = {
				...reply.headers,
				"Access-Control-Allow-Origin": "*",
			};

			next();
		},
		preHandler: function (request: any, reply: any, next: () => void) {
			reply.headers = {
				...reply.headers,
				"Access-Control-Allow-Origin": "*",
			};

			next();
		},
	},
	staticCSP: false,
	// @ts-ignore
	transformStaticCSP: (header) => header,
	transform: ({ schema, url }: any) => {
		if (!schema) {
			schema = {};
		}
		let transformedUrl = url;

		// Transform the schema as you wish with your own custom logic.
		// In this example convert is from 'joi-to-json' lib and converts a Joi based schema to json schema
		if (schema?.params && typeof schema.params?.describe == "function")
			schema.params = convertSchema(schema?.params);
		if (schema?.body && typeof schema.body?.describe == "function") {
			schema.body = convertSchema(schema?.body);
		}
		if (
			schema?.querystring &&
			typeof schema?.querystring?.describe == "function"
		)
			schema.querystring = convertSchema(schema?.querystring);
		if (schema?.headers) schema.headers = convertSchema(schema?.headers);
		if (schema?.response) {
			for (let code in schema?.response) {
				if (typeof schema.response?.[code]?.describe !== "function") {
					schema.response[code] = schema.response[code];
				} else {
					schema.response[code] = convertSchema(
						object({
							status: boolean().required(),
							message: string().required(),
							data: schema.response[code],
						}),
					);
				}
			}
		} else {
			schema.response = {};

			const responseSchema = z.object({
				status: z.boolean(),
				message: z.string(),
				data: z.record(z.any(), z.any()),
			});

			schema.response["200"] = zodToJsonSchema(responseSchema);
		}

		removeKeyFromObj(schema, "default");

		// can add the hide tag if needed
		if (url.startsWith("/internal")) schema.hide = true;

		// can transform the url
		if (url.startsWith("/latest_version/endpoint"))
			transformedUrl = url.replace("latest_version", "v3");

		return { schema: schema, url: transformedUrl };
	},
	securityHandlers: {
		apiKey: (req: any, scopes: any, next: any) => {
			const apiKey = req.headers["x-api-key"];
			if (!apiKey || apiKey !== "my-secret-api-key") {
				const error = new Error("Unauthorized from Swagger");
				// error.statusCode = 401
				error.message = "Invalid or missing API key";
				next(error);
				return;
			}
			next();
		},
	},

	customOptions: {
		swaggerOptions: {
			onComplete: () => {
				var _html = document.getElementsByTagName("pre");
				Array.from(_html).forEach((f) => {
					f.innerHTML = "HI";
				});

				const elements = document.querySelectorAll(".opblock-summary-method");
				elements.forEach((el) => {
					const copyButton = document.createElement("button");
					copyButton.innerHTML = "Copy";
					copyButton.addEventListener("click", () => {
						console.log("click: ");
						const path = el.getAttribute("data-path");
						console.log("path: ", path);
						const method = el.getAttribute("data-method");
						const curl = `curl -X ${method} http://localhost:3000${path}`;
						// clipboard.writeSync(curl)
					});
					el?.parentNode?.appendChild(copyButton);
				});
			},
		},
	},
	swaggerUiOpts: {
		theme: "Monokai",
	},
	theme: {
		css: [{ filename: "theme.css", content: content }],
	},
} as SwaggerOptions;
