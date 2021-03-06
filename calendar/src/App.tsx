import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { MonthType } from "./types"
import Header from "./components/Header"
import Calendar from "./components/Calendar"
import Reminder from "./components/Reminder"
import Jump from "./components/Jump"
import { next, previous } from "./monthSlice"
import './App.css';

const leftRight = [ "left", "right" ];
const mapWay: { [index: string]: any } = { left: previous, right: next }

function App() 
{

	const month = useSelector( ( state: { month: MonthType } ) => state.month );
	const dispatch = useDispatch();

	const arrowAction = ( direction: string, ev: any ) =>
	{
		dispatch( mapWay[ direction ]() );
	}

	return (
		<section className="main-cont">
			<Header>{month.monthPack.name}/{month.thisYear}
			</Header>
			<section className="calendar-container">
				<Calendar />
				<Jump 
					direction={leftRight[0]}
					action={arrowAction} 
				/>
				<Jump 
					direction={leftRight[1]}
					action={arrowAction} 
				/>

				<Reminder />

			</section>
		</section>
	);

	


}



export default App;
