import routes from "@/routes";
import { ServerOptions, createServer } from "@/server/server";
const prefix = "/auth";
const serverConfig: ServerOptions = {
	environment: "local",
	dev: true,
	port: 5000,
	prefix: prefix,
	routes: (app) => {
		app.register(routes.auth, { prefix: prefix });
	},
};

const server = createServer(serverConfig);

server.start();
