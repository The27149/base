export interface CfgUserLevel
{
	userLevel:number;
	needExp:number;
	expRange:Array<number>;
}

export interface CfgLevelReward
{
	level:number;
	levelReward:number;
	fundRewardSilver:number;
	fundRewardGold:number;
	fundRewardDiamond:number;
}

export interface CfgTrialGuide
{
	gameType:number;
	condition:number;
	conditionMin:number;
	conditionMax:number;
	form:number;
	randomRatio:Array<number>;
	content:string;
}

export interface CfgAudio
{
	audioKey:string;
	audio:string;
	dubZh:string;
	dubEn:string;
	explain:string;
}

