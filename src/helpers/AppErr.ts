export default class AppErr extends Error {
	statusCode?: number;
	data?: any;

	constructor(message: string, statusCode?: number, data?: any) {
		super();
		this.message = message;
		this.statusCode = statusCode;
		this.data = null;
		if (data) {
			this.data = data;
		} else {
			this.data = null;
		}
		// this.stack = "";
	}
}

export const customError = (msg: string, data?: any): never => {
	throw new AppErr(msg, data);
};
