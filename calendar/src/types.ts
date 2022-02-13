



export type MonthType = 
{ 
	monthPack: any, 
	month: number, 
	daysAmount: number,
	monthZeroBased: number,
	thisYear: number,
	reminders: Array<any>
};

export type ReminderType = 
{
	active: boolean,
	warn: string
}
