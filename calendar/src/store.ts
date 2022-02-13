

import { configureStore } from "@reduxjs/toolkit";

import monthReducer from "./monthSlice";
import reminderReducer from "./reminderSlice";


export default configureStore
(
	{
		reducer:
		{
			month: monthReducer,
			reminder: reminderReducer 
		}
	}
);


