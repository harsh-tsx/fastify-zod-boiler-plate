import { AppRequest } from "@/helpers/common";
import { FastifyReply as Response, FastifyRequest as Request } from "fastify";
import env from "@/config/aws";
import { CustomRequest, R } from "./response-helpers";
import path from "path";
// import aws from "aws-sdk";
import AppErr from "./AppErr";

// aws.config.update({
// 	accessKeyId: env.accessKeyId,
// 	secretAccessKey: env.secretAccessKey,
// 	region: env.region,
// });

// const s3 = new aws.S3({});

export const uploadMultiFile = async (
	req: CustomRequest,
	res: Response,
	_path: string,
	ignore?: Boolean,
): Promise<
	{
		fileName: string;
	}[]
> => {
	try {
		const files = (req.raw as any)?.files;

		console.log("files: ", files);

		const data = [] as {
			fileName: string;
		}[];

		for (const key in files) {
			const part = files[key];
			console.log("part: ", part);
			// iterate the async generator
			req.log.info("storing %s", part.name);

			let filename = part?.name;

			const extensionName = path?.extname(filename ?? "");

			const allowedExtension = [".png", ".jpg", ".jpeg", ".gif"];

			if (!allowedExtension.includes(extensionName)) {
				return res.send({
					message: "Invalid Image",
					status: false,
					data: null,
				});
			}

			filename = part?.name.substring(0, 3).trim() + Date.now() + extensionName;
			console.log("filename: ", filename);

			// const storedFile = fs.createWriteStream(
			// 	`${process.cwd()}/public/${filename}`,
			// );
			// console.log("storedFile: ", storedFile);
			// await pump(part.file, storedFile);
			part.mv(`${process.cwd()}/public/${filename}`);
			console.log("part.mv: ", part.mv);
			data.push({
				fileName: filename,
			});
		}

		console.log("data: ", data);
		return data;
	} catch (e) {
		console.log("e: ", e);
		return R(false, "File upload failed", {}, {}, res);
	}
};
