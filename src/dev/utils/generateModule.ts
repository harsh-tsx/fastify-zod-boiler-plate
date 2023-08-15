import * as fs from "fs";

// Get the module name from command line arguments
const moduleName = process.argv[2];

// Define the folder structure
const folder = `${process.cwd()}/src/modules/${moduleName}`;

// Create the folder
if (!fs.existsSync(folder)) {
	fs.mkdirSync(folder);
}

// Create the files
const files: { path: string; content: string }[] = [
	{
		path: `${folder}/${moduleName}.controller.ts`,
		content: `import { R, asyncWrapper } from "@/helpers/response-helpers";
import ${moduleName}Service from "./${moduleName}.service";
import apiError from "@/helpers/errors";
import { TestQuery } from "./${moduleName}.schema";

const ${moduleName}Controller = {\n
	  test: asyncWrapper<{Query: TestQuery;}>(async (req, res) => {\n
		      return R(true,"Hello from ${moduleName}");\n
			}),};\n
export default ${moduleName}Controller;`,
	},
	{
		path: `${folder}/${moduleName}.routes.ts`,
		content: `

		import { FastifyInstance } from "fastify";
import cn from "./${moduleName}.controller";
import { schemaWrapper } from "@/helpers/schemaWrapper";
import { TestQuery } from "./${moduleName}.schema";
import { protectRoutes } from "@/middleware/protectRoutes";

const s = new schemaWrapper({
	tags: ["${moduleName}"],
});

const ${moduleName}Map = {
	test: s.get({
		url: "/test",
		querystring: TestQuery,
		handler: cn.test,
	}),
};

const ${moduleName}Route = async (app: FastifyInstance) => {
	app.after(() => {
		Object.values(${moduleName}Map).forEach((route) => app.route(route));
	});
	// await protectRoutes(app);
};

export default ${moduleName}Route;`,
	},
	{
		path: `${folder}/${moduleName}.schema.ts`,
		content: `import { RouteShorthandOptions } from "fastify";
import { z } from "zod";
		
export const TestQuery = z.object({
	email: z.string(),
	password: z.string(),
});
export type TestQuery = z.infer<typeof TestQuery>;
		`,
	},

	{
		path: `${folder}/${moduleName}.test.ts`,
		content: `const main = async () => {};\n\n main();`,
	},
	{
		path: `${folder}/${moduleName}.service.ts`,
		content: `import { customError } from "@/helpers/AppErr";\nimport apiError from "@/helpers/errors";\nimport models from "@/models/index";\n\nconst ${moduleName}Service = {\n     test: async () => {},}\nexport default ${moduleName}Service;
        `,
	},
];

for (let file of files) {
	if (!fs.existsSync(file?.path)) {
		fs.writeFileSync(file?.path, file?.content);
	}
}

console.log(`Module ${moduleName} created successfully!`);
