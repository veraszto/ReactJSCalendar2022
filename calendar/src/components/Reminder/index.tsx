

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleReminder, setWarn } from "../../reminderSlice";
import { setReminder } from "../../monthSlice";
import { MonthType, ReminderType } from "../../types";
import "./style.css"


export default function Reminder( props: any )
{
	const dispatch = useDispatch();
	const { reminder, month } = useSelector
	( 
		( 
			state: 
			{ 
				reminder: ReminderType,
				month: MonthType
			} 
		) => state
	);

	const inputsDefaultValues = 
	{
		day: 1,
		time: "00:00",
		color:"#FF465D",
		message:""
	}

	const [ inputsValues, setInputValue ] = useState(inputsDefaultValues);

	const inputChange = 
	( 
		which: string, key: string, 
		ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) =>
	{
		
		const keyOfEventTarget = key as keyof EventTarget;

		const value = ev.target[ keyOfEventTarget ];

		setInputValue( { ... inputsValues, [which]: value} );

		if ( reminder.warn !== null )
		{
			dispatch( setWarn( null ) );
		}
	}

	const submitSchedule = ( ev: React.FormEvent ) =>
	{
		ev.preventDefault();	
		if ( !! inputsValues.message === false )
		{
			dispatch( setWarn("Please enter a schedule message") );
			return;
		}

		dispatch( setReminder( { ... inputsValues, monthZeroBased: month.monthZeroBased } ) );
	}

	return (
		<section className="reminder">
			<div 
				className="month" 
				onClick=
				{
					( ev ) =>
					{
						dispatch( toggleReminder() );
					}
				}
			>
			{
				reminder.active == true && "Close" || `Schedule to ${month.monthPack.name}`
			}
			</div>
			<article className={["content", reminder.active === true && "shown" || "not-shown"].join(" ")}>
				<form name="name" onSubmit={submitSchedule}>
					<div className={["warn", reminder.warn !== null && "shown" || "" ].join( " " )}>{reminder.warn}
					</div>
					<div className="day input-container">
						<input 
							type="number" min="1" max={month.daysAmount} name="day" defaultValue={inputsDefaultValues.day} 
							onChange={inputChange.bind(null, "day", "valueAsNumber")}
						/>
					</div>
					<div className="time input-container">
						<input 
							type="time" name="time" defaultValue={inputsDefaultValues.time}
							onChange={inputChange.bind(null, "time", "value")}
						/>
					</div>
					<div className="color input-container">
						<input 
							type="color" name="color" defaultValue={inputsDefaultValues.color}
							onChange={inputChange.bind(null, "color", "value")}
						/>
					</div>
					<div className="message input-container">
						<textarea 
							rows={3} maxLength={30} placeholder="Reminder message" 
							onChange={inputChange.bind(null, "message", "value")}
						>
						</textarea>
					</div>
					<button>
						Commit
					</button>
				</form>
			</article>
		</section>
	);
}



