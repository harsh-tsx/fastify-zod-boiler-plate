import env from "@/config/env";
const apiError = {
	noSettingFound: "No setting found.",
	invalidCheck: "Invalid check.",
	unauthorized: "Unauthorized User",
	invalidContest: "Invalid Contest",
	contestFull: "Contest full",
	_contestFull: "Contest full.",
	MatchLive: "Match is live, you can't join now",
	inningStartedCantJoin: (inningNumber: number) =>
		`${env.Inning_Text[inningNumber]} has been started you can't join now`,
	matchStartedOrCompleted: "Match started or completed.",
	diffrentInningTeam: "Invalid Inning Teams",
	canJoinMoreThan: (count: number) =>
		`You can not join more than ${count} team(s).`,
	contestJoinedByYourTeam:
		"Contest has already been joined by any of your requested team.",
	onlyJoinWithTeams: (remaining: number) =>
		`You can only join with ${remaining} team(s).`,
	userNotFound: "Invalid User",
	paymentNotFound: "No Payment found",
	noBalanceToJoinContest:
		"You do not have sufficient balance to join this league.",
	duplicatePlayerFound: "Duplicate Player found.",
	teamCredit: "The total credit must not have more than 100.",

	playserSelect: (min: number, max: number, position: string) =>
		`Please select ${min}-${max} ${position}.`,
	noTeamFound: "No team found",
	noAdminLeagueFound: "No Global League found",
	paymentAlreadySucceed: "Payment already done",
	otpLimitReached: "You've already reached your requests limit.",
	invalidOTP: "Invalid OTP",
};

export default apiError;
