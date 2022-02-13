



export type MonthType = 
{ 
	monthPack: any, 
	month: number, 
	daysAmount: number,
	monthZeroBased: number,
	thisYear: number,
	reminders: Array<any>,
	currentReminder: { [index: string]: string | number } | null
};

export type ReminderType = 
{
	active: boolean,
	warn: string
}
