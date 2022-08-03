
export interface LevelDataClass {
    data: { expRange: number[], needExp: number, userLevel: number }[];
    ids: number[];
    keys: number[];
}

export interface FundRewardDataClass {
    data: { level: number, levelReward: number, fundRewardDiamond: number, fundRewardGold: number, fundRewardSilver: number }[];
    ids: number[];
    keys: number[];
}
export interface TrialGuideClass {
    data: { gameType: number, condition: number, conditionMin: number, conditionMax: number, form: number, randomRatio: number[], content: string }[];
    ids: string[];
    keys: number[];
}