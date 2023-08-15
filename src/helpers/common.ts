import {
	uniqueNamesGenerator,
	Config,
	adjectives,
	colors,
	names,
	starWars,
	animals,
} from "unique-names-generator";
import moment from "moment";

export function youtubeId(url: any) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return match && match[2].length === 11 ? match[2] : null;
}

export function isNumeric(str: any) {
	// if (typeof str != "string") return false; // we only process strings!
	return (
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	); // ...and ensure strings of whitespace fail
}

export function ordinal_suffix_of(i: any) {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}

export function generateRandomUserName() {
	const customConfig: Config = {
		dictionaries: [adjectives, colors, animals, names, starWars],
		separator: "",
		length: 2,
		style: "capital",
	};

	const randomName: string = uniqueNamesGenerator(customConfig);

	return randomName;
}

export const randomInRange = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min)) + min;

export function formatTime(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	const timeString = `${hours}:${minutes
		.toString()
		.padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	return timeString;
}

export interface AppRequest extends Request {
	userId: string;
}

export async function paymentCalculation(
	cash_bonus: number, //user
	wining_amount: number, //user
	deposited_balance: number, //user
	entry_fee: number, //contest
	contestType: string, //conteste
	discount = 0, //contest
	bonusPercentage = 0, //contest
) {
	const payment = { cash_bonus: 0, wining_amount: 0, deposited_balance: 0 };

	if (discount > 0 && contestType === "DISCOUNT") {
		let percentage = (entry_fee * discount) / 100;
		entry_fee = entry_fee - percentage;
	}

	let cashBonusPerAmount = 0;
	if (contestType !== "PRIVATE") {
		cashBonusPerAmount = (entry_fee * bonusPercentage) / 100;
	}

	let entryFeeLeft = entry_fee;
	let bonusUsed = 0;
	//cash bonus
	if (cash_bonus != 0 && cash_bonus >= cashBonusPerAmount) {
		entryFeeLeft = entry_fee - cashBonusPerAmount;
		payment.cash_bonus = cashBonusPerAmount; //(entry_fee - entryFeeLeft);
		bonusUsed = cashBonusPerAmount;
	} else if (cash_bonus < cashBonusPerAmount) {
		entryFeeLeft = entry_fee - cash_bonus;
		payment.cash_bonus = cash_bonus;
		bonusUsed = cash_bonus;
	}

	if (bonusUsed + wining_amount + deposited_balance >= entry_fee) {
		//deposited_balance
		if (deposited_balance != 0 && entryFeeLeft != 0) {
			if (entryFeeLeft < deposited_balance) {
				payment.deposited_balance = entryFeeLeft;
				entryFeeLeft = 0;
			} else {
				entryFeeLeft = entryFeeLeft - deposited_balance;
				payment.deposited_balance = deposited_balance;
			}
		} else {
			payment.deposited_balance = 0;
		}

		//wining_amount

		if (wining_amount != 0 && entryFeeLeft != 0) {
			if (entryFeeLeft < wining_amount) {
				payment.wining_amount = entryFeeLeft;
				entryFeeLeft = 0;
			} else {
				entryFeeLeft = entryFeeLeft - wining_amount;
				payment.wining_amount = wining_amount;
			}
		} else {
			payment.wining_amount = 0;
		}

		return payment;
	} else {
		return payment;
	}
}
export function shortNameConverter(fullName: string) {
	if (!fullName?.length) {
		return "";
	}
	if (fullName.length == 1) {
		return fullName;
	}

	let splitedName = fullName.split(" ");

	if (splitedName?.length == 1) return fullName;

	let initials = splitedName[0][0] + ".";
	let abbreviatedName = initials + fullName.substring(fullName.indexOf(" "));
	return abbreviatedName;
}

export function getRemainingTime(dateTime: any) {
	// Set the target date
	const targetDate = moment(dateTime);

	// Get the current date
	const currentDate = moment();

	// Calculate the duration between the current date and the target date
	const remainingTime = moment.duration(targetDate.diff(currentDate));

	// Print the remaining time in days, hours, minutes, and seconds
	return `${remainingTime.hours()} hours, ${remainingTime.minutes()} minutes ${remainingTime.seconds()} seconds`;
}

function capitalizeInitials(str: any) {
	let words = str.split(" ");
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
	}
	return words.join(" ");
}
