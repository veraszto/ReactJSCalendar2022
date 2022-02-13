import { createSlice } from "@reduxjs/toolkit";

export const reminderSlice = createSlice
(
	{
		name: "reminder",
		initialState: { active: false, warn: null },
		reducers:
		{
			toggleReminder: ( state ) =>
			{
				state.active = ! state.active;
			},
			setWarn: ( state, action ) =>
			{
				state.warn = action.payload;
			}
		}
	}
);


export const { toggleReminder, setWarn } = reminderSlice.actions;
export default reminderSlice.reducer;


