



export type MonthType = 
{ 
	monthPack: any, 
	month: number, 
	daysAmount: number,
	monthZeroBased: number,
	reminders: Array<any>,
	reminderActive: boolean
};

export type ReminderType = 
{
	active: boolean,
	warn: string
}
