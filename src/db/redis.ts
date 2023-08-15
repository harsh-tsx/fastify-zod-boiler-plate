import env from "@/config/redis";
import ioredis, { ChainableCommander, Redis } from "ioredis";

export interface CustomRedis extends Redis {
	getJson?: any;
	setJson?: any;
	execAsync: (mult: ChainableCommander) => Promise<any>;
}

console.log(`REDIS HOST: ${env.host}`);

// const redis: any = new ioredis.Cluster([{ host: env.host }]);
const redis: any = new ioredis({
	port: 10977,

	password: "IY0SJWouQ2OOb2BXHvDjvY0JMul3GQo3",

	host: "redis-10977.c212.ap-south-1-1.ec2.cloud.redislabs.com",
});

const getJson = async function (key: string) {
	let data: any = await redis.get(key);
	return JSON.parse(data);
};

const setJson = async function (key: string, value: any) {
	return await redis.set(key, JSON.stringify(value));
};

const execAsync = (mult: ChainableCommander) => {
	return new Promise((resolve, reject) => {
		mult.exec((err, replie) => {
			if (err) {
				reject(err);
			}

			// console.log(replie)
			resolve(replie);
		});
	});
};

redis.getJson = getJson;
redis.setJson = setJson;
redis.execAsync = execAsync;

export default redis as CustomRedis;
