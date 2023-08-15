import fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import pretty from "pino-pretty";
import pino from "pino";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";

import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { errorHandler } from "@/middleware/errorHanlder";

export interface ServerOptions {
	dev?: boolean;
	port?: number;
	prefix: string;
	environment: "development" | "production" | "test" | "local";
	routes: (app: FastifyInstance) => void;
}

declare module "fastify" {
	interface FastifyRequest {
		userId: any;
	}
}

export function createServer(opts: ServerOptions) {
	const port = opts.port ?? 3000;
	const prefix = opts.prefix ?? "/trpc";

	const stream = pretty({
		colorize: true,
		translateTime: "HH:MM:ss Z",
		ignore: "pid,hostname",
	});
	const prettyLogger = pino({ level: "debug" }, stream);

	const server = fastify({
		logger:
			opts.environment === "local" || opts.environment === "test"
				? prettyLogger
				: true,
	});

	server.register(cors, {
		origin: "*",
		methods: "*",
	});

	// Add schema validator and serializer
	server.setValidatorCompiler(validatorCompiler);
	// server.setSerializerCompiler(serializerCompiler);
	server.setSerializerCompiler(
		({ schema, method, url, httpStatus, contentType }) => {
			return (data) => JSON.stringify(data);
		},
	);

	server.register(fastifySwagger, {
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
	});

	server.register(fastifySwaggerUI, {
		routePrefix: "/doc",
	});

	opts.routes(server as any);

	server.setErrorHandler(errorHandler);

	const stop = () => server.close();

	const start = async () => {
		try {
			await server.listen({ port, host: "0.0.0.0" });
		} catch (err) {
			server.log.error(err);
			process.exit(1);
		}
	};

	return { server, start, stop };
}
