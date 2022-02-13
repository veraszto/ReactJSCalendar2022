import { createSlice } from "@reduxjs/toolkit";

export const reminderSlice = createSlice
(
	{
		name: "reminder",
		initialState: { active: true },
		reducers:
		{
			toggleReminder: ( state, action ) =>
			{
				state.active = ! state.active;
			}
		}
	}
);


export const { toggleReminder } = reminderSlice.actions;
export default reminderSlice.reducer;


