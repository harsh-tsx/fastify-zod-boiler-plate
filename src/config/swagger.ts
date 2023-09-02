// import Joi from "joi";
import env from "./env";

const { SwaggerTheme } = require("swagger-themes");
const theme = new SwaggerTheme("v3");
const content = theme.getBuffer("dark");

// const convert = require("joi-to-json");
import { SwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export default {
	routePrefix: "/doc",
	mode: "dynamic",
	exposeRoute: true,
	openapi: {
		info: {
			title: "SampleApi",
			description: "Sample backend service",
			version: "3.0.0",
		},
		servers: [],
	},
	transform: jsonSchemaTransform,
	// You can also create transform with custom skiplist of endpoints that should not be included in the specification:
	//
	// transform: createJsonSchemaTransform({
	//   skipList: [ '/documentation/static/*' ]
	// })
	// swagger: {
	// 	info: {
	// 		title: "node fastify app init - swagger",
	// 		description: "Testing the Fastify swagger API",
	// 		version: "1.0.0",
	// 	},
	// 	externalDocs: {
	// 		url: "https://swagger.io",
	// 		description: "Find more info here",
	// 	},
	// 	// host: `cg-api.frutocity.cf`,
	// 	schemes: ["http", "https"],
	// 	consumes: ["application/json", "multipart/form-data"],
	// 	produces: ["application/json"],
	// 	tags: [
	// 		{ name: "auth", description: "Auth related end-points" },
	// 		{ name: "user", description: "User related end-points" },
	// 		{ name: "wallet", description: "Contest related end-points" },
	// 		{ name: "team", description: "Team related end-points" },
	// 		{ name: "adminleague", description: "Admin League related end-points" },
	// 		{ name: "leaderboard", description: "Leaderboard related end-points" },
	// 		{ name: "wallet", description: "Wallet related end-points" },
	// 		{ name: "admin", description: "Admin related end-points" },
	// 		// { name: "contest", description: "Contest related end-points" },
	// 	],
	// 	securityDefinitions: {
	// 		Bearer: {
	// 			type: "apiKey",
	// 			name: "Authorization",
	// 			in: "header",
	// 		},
	// 	},
	// },
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
