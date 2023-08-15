import {
	FastifyReply as Response,
	FastifyRequest as Request,
	RawRequestDefaultExpression,
	RouteGenericInterface,
} from "fastify";
import { customError } from "./AppErr";

export function R(
	status: boolean,
	message: String | any,
	data?: any,
	meta?: any,
	res?: Response,
) {
	const object = {
		status: status,
		message: message,
		data: data ? data : data === null ? null : {},
		...(meta && {
			meta: meta ?? {},
		}),
	};
	if (res) {
		return res.send(object);
	}

	return object;
}

export interface CustomRequest extends Request {
	params: any;
	body: any;
	query: any;
	raw: any;
}

export interface SchemaType {
	Body?: any;
	Headers?: any;
	Params?: any;
	Query?: any;
	Reply?: any;
}

export function asyncWrapper<T extends SchemaType>(
	callback: (req: Request<T>, res: Response) => Promise<any>,
): any {
	return function (req: Request<T>, res: Response) {
		callback(req, res)
			.then((d) => res.send(d))
			.catch((err: any) => {
				console.error("err: ", err);
				return res.send(R(false, err?.message));
			});
	};
}

/*
	Post.findAndCountAll({
		where: {...},
		order: [...],
		limit: 5,
		offset: 0,
	}).then(function (result) {
		res.render(...);
	});
*/
