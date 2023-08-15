import ioredis, { Redis } from "ioredis";
import env from "@/config/redis";

interface LeaderboardUser {
	rank: number;
	username: string;
	score: number;
	// avatar: string;
}

class Leaderboard {
	private client: Redis;
	public leaderboardName: string;
	public extraUserFields: string[];

	constructor(leaderboardName: string, options?: any) {
		this.leaderboardName = leaderboardName || "Leaderboard";
		this.extraUserFields = options?.extraUserFields || [];

		const redis = new ioredis({
			host: env.host,
			// keyPrefix: "ocricketLeader",
		});
		this.client = redis;
	}

	/*
	 * Disconnect the Redis connection.
	 */

	public disconnect() {
		return this.client.quit(function (err, reply) {});
	}

	// Add a new user to the leaderboard with a score
	/**
	 * @function adduser
	 * @param userId - _id from User Modal
	 * @param score - score of the user
	 * @returns {void}
	 */
	public async addUser(username: string, score: number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.client.zincrby(
				this.leaderboardName,
				score,
				username,
				(err, reply) => {
					if (err) {
						reject(err);
						return;
					}
					console.log(`Added ${username} to leaderboard with score ${score}`);
					resolve();
				},
			);
		});
	}

	// Get the leaderboard with user rankings in ascending order

	public async getLeaderboard(
		page: number,
		pageSize: number,
		userid: string,
		skip?: number,
	): Promise<LeaderboardUser[]> {
		return new Promise<LeaderboardUser[]>((resolve, reject) => {
			const startIndex = (page - 1) * pageSize + (skip || 0);
			console.log("page: ", page);
			console.log("pageSize: ", pageSize);
			const endIndex = startIndex + pageSize - 1;
			this.client.zrevrange(
				this.leaderboardName,
				startIndex,
				endIndex,
				"WITHSCORES",
				async (err, reply) => {
					if (err) {
						reject(err);
						return;
					}
					if (!reply) {
						reject("No Data");
						return;
					}
					const leaderboard: LeaderboardUser[] = [];
					let rank = startIndex + 1;
					for (let i = 0; i < reply.length; i += 2) {
						const userId = reply[i];
						if (userId == userid) {
							rank++;

							continue;
						}
						const score = parseInt(reply[i + 1]);
						// const userData: any = await this.getUserFields(userId);
						// if (this.extraUserFields.includes("state") && userData?.state) {
						// 	let stateName = await this.client.hget(
						// 		"stateData",
						// 		userData?.state,
						// 	);
						// 	if (!stateName) {
						// 	} else {
						// 		userData.state_name = stateName;
						// 	}
						// }
						leaderboard.push({
							rank,
							score,
							username: this.getUserName(userId),
						});
						rank++;
					}
					// const totalUsers = await this.getTotalUsers();
					// console.log(
					// 	`Leaderboard page ${page} with ${pageSize} items (out of ${"totalUsers"} total users):`,
					// 	leaderboard,
					// );
					resolve(leaderboard);
				},
			);
		});
	}

	// Get the total number of users in the leaderboard
	public async getTotalUsers(): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this.client.zcard(this.leaderboardName, (err, reply: any) => {
				if (err) {
					reject(err);
					return;
				}
				// if (!reply) {
				// 	return console.log("No data");
				// }
				resolve(reply);
			});
		});
	}

	// Get the rank of a user in the leaderboard
	public async getRank(userId: string): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this.client.zrevrank(this.leaderboardName, userId, (err, reply) => {
				if (err) {
					reject(err);
					return;
				}
				if (!reply && reply != 0) {
					reject("No Data");
					return;
				}

				const rank = reply + 1;
				// console.log(`Rank of ${userId} is ${rank}`);
				resolve(rank);
			});
		});
	}

	// Get the score of a user in the leaderboard
	public async getScore(userId: string): Promise<number> {
		return new Promise<number>((resolve, reject) => {
			this.client.zscore(this.leaderboardName, userId, (err, reply) => {
				if (err) {
					reject(err);
					return;
				}
				const score = parseInt(reply || "0");
				// console.log(`Score of ${userId} is ${score}`);
				resolve(score);
			});
		});
	}

	// Get the additional fields for a user
	public async getUserFields(userId: string): Promise<any> {
		// let user = await this.client.hgetall(`userData:${userId}`);
		const fields = ["username", "avatar", ...this.extraUserFields];

		let userbyField = await this.client.hmget(`userData:${userId}`, ...fields);

		const result: any = {};

		if (!userbyField) {
			return {};
		}
		let index = 0;

		for (let f of fields) {
			if (!userbyField[0]) {
				this.removeUser(userId).then();
			}

			result[f] = userbyField[index];
			index++;
		}

		return result;
	}

	public async getUserPosition(userId: string): Promise<LeaderboardUser> {
		try {
			// let user = await this.client.hgetall(`userData:${userId}`);
			const rank = await this.getRank(userId);
			const score = await this.getScore(userId);
			const userData = await this.getUserFields(userId);
			return {
				rank: rank,
				userId: userId || null,
				score: score || 0,
				...userData,
			};
		} catch (err) {
			console.log(err);
			return {} as LeaderboardUser;
		}
	}

	public async updateScore(userId: string, score: number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.client.zincrby(this.leaderboardName, score, userId, (err, reply) => {
				if (err) {
					reject(err);
					return;
				}
				// console.log(
				// 	`User ${userId} updated score to ${score} in leaderboard ${this.leaderboardName}`,
				// );
				resolve();
			});
		});
	}

	public async removeUser(userId: string): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.client.zrem(this.leaderboardName, userId, (err, reply) => {
				if (err) {
					reject(err);
					return;
				}
				// console.log(
				// 	`User ${userId} removed from  in leaderboard ${this.leaderboardName}`,
				// );
				resolve();
			});
		});
	}

	public async getUsersByRanks(ranks: number[]): Promise<any> {
		try {
			const multi = this.client.multi();

			for (let r of ranks) {
				multi.zrevrange(this.leaderboardName, r - 1, r - 1, "WITHSCORES");
			}

			const replies = await multi.exec();
			if (!replies) {
				return [];
			}

			const leaderboard: any = {};
			let data = replies.map(async ([err, reply, ...rest]: any, index) => {
				// console.log(
				// 	"🚀 ~ file: LeaderBoard.ts:184 ~ Leaderboard ~ replies.forEach ~ reply:",
				// 	reply,
				// );
				if (!reply) {
					return {};
				}
				const rank = ranks[index];
				const userId = reply[0];
				const score = parseInt(reply[1]);
				const userData: any = await this.getUserFields(userId);
				leaderboard[rank] = {
					rank: rank,
					userId: userId || null,
					score: score || 0,
					...userData,
				};
				return { rank, userId, score, ...userData };
			});

			// console.log(`Users at ranks [${ranks.join(", ")}]:`, leaderboard);
			data = await Promise.all([...data]);
			return leaderboard as any;
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public teamName(team_id: string, name: string) {
		return team_id + "_U_" + name;
	}

	public getUserName(teamName: string) {
		return teamName.split("_U_")?.[1] || "";
	}
	public getTeamId(teamName: string): string {
		return teamName.split("_U_")?.[0] || "";
	}
}

export default Leaderboard;
