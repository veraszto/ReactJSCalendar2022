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
	reminders:[]
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
				console.log( data );
				//
			}
		}
	}
);


export const { next, previous, setReminder } = monthSlice.actions;

export default monthSlice.reducer;


