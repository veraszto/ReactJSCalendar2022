

import { configureStore } from "@reduxjs/toolkit";

import monthReducer from "./monthSlice"


export default configureStore
(
	{
		reducer:
		{
			month: monthReducer
		}
	}
);


