import { createSlice } from "@reduxjs/toolkit";

import { MonthType } from "./types"

const upTo31 = [ 0, 2, 4, 6, 7, 9, 11 ];

const now = new Date();

const months = 
[
	{
		name: "January",
		startsAt: 6
	},
	{
		name: "February",
		overrideUpTo: new Date(now.getFullYear(), 1, 29).getDate() === 29 && 26 || 28,
		startsAt: 2
	},
	{
		name: "March",
		startsAt: 2
	},
	{
		name: "April",
		startsAt: 5
	},
	{
		name: "May",
		startsAt: 0
	},
	{
		name: "June",
		startsAt: 3
	},
	{
		name: "July",
		startsAt: 5
	},
	{
		name: "August",
		startsAt: 1
	},
	{
		name: "September",
		startsAt: 4
	},
	{
		name: "October",
		startsAt: 6
	},
	{
		name: "November",
		startsAt: 2
	},
	{
		name: "December",
		startsAt: 4
	}
];

const thisMonth = now.getMonth();
const monthPack = months[ thisMonth ];

const calculateDaysAmount = ( month: number ) =>
{
	return months[ month ].overrideUpTo || upTo31.includes( month ) && 31 || 30
}


const initialState: MonthType  = 
{
	monthPack: monthPack,
	monthZeroBased: thisMonth,
	month: thisMonth + 1,
	daysAmount: calculateDaysAmount( thisMonth ),
	thisYear: now.getFullYear(),
	reminders:[],
	currentReminder: null
}

export const monthSlice = createSlice
(
	{
		name: "month",
		initialState,
		reducers:
		{
			next: ( state ) =>
			{
				if ( state.monthZeroBased >= 11 )
				{
					return;
				}

				state.monthZeroBased += 1;
				state.month += 1;
				state.monthPack = months[ state.monthZeroBased ];
				state.daysAmount = calculateDaysAmount( state.monthZeroBased );
			},
			previous: ( state ) =>
			{
				if ( state.monthZeroBased <= 0 )
				{
					return;
				}

				state.month -= 1;
				state.monthZeroBased -= 1;
				state.monthPack = months[ state.monthZeroBased ];
				state.daysAmount = calculateDaysAmount( state.monthZeroBased );
			},
			setReminder: ( state, action ) =>
			{
				const data = action.payload;
				const packToSave = 
				{
					color: data.color,
					message: data.message,
					time: data.time,
					orderContext: parseInt(data.time.replace( /(?<=\d{2}):(?=\d{2})/, ""))
				};

				const index = data.index;

				if ( state.reminders[ data.monthZeroBased ] === undefined )
				{
					state.reminders[ data.monthZeroBased ] = []
					state.reminders[ data.monthZeroBased ][ data.day ] = [ packToSave ];
				}
				else if ( state.reminders[ data.monthZeroBased ][ data.day ] === undefined )
				{
					state.reminders[ data.monthZeroBased ][ data.day ] = [ packToSave ];
				}
				else
				{
					const collection = state.reminders[ data.monthZeroBased ][ data.day ];
					let saveIndex = 0;
					if ( index !== undefined )
					{
						saveIndex = index;
					}
					else
					{
						collection.forEach
						(
							( each: {orderContext: number}, index: number ) =>
							{
								console.log( index );
								if ( packToSave.orderContext >= each.orderContext )
								{
									saveIndex = index + 1;
								}
							}
						);
					}
					

					collection.splice( saveIndex, 0, packToSave );
				}
				//
			},
			deleteReminder: ( state, action ) =>
			{
				const { month, day, index } = action.payload;
				state.reminders[ month ][ day ][ index ] = 
				{
					deleted: true					
				};
			},
			setCurrentReminder: ( state, action ) =>
			{
				state.currentReminder = action.payload;
			}
		}
	}
);


export const 
{ 
	next, previous, setReminder, 
	setCurrentReminder, deleteReminder
} = monthSlice.actions;

export default monthSlice.reducer;


