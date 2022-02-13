

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleReminder, setWarn } from "../../reminderSlice";
import { setReminder, setCurrentReminder } from "../../monthSlice";
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

	const reminderActive = reminder.active;
	const currentReminder = month.currentReminder

	let inputsDefaultValues: any  = 
	{
		day: 1,
		time: "00:00",
		color:"#FF465D",
		message:""
	}

	const [ inputsValues, setInputValue ] = useState(inputsDefaultValues);

	useEffect
	(
		() =>
		{
			if ( reminderActive === false )
			{
				dispatch( setCurrentReminder( null ) );
			}
		}, 
		[ reminderActive ]
	);

	useEffect
	(
		() =>
		{
			if ( currentReminder !== null )
			{
				const { day, time, color, message, index, monthInContext } = currentReminder;
				setInputValue
				(
					{
						day: day,
						time: time,
						color: color,
						message: message,
						month: monthInContext,
						index: index
					}
				)
			}
		},
		[ currentReminder ]
	);


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
//		console.log( inputsValues );
		if ( !! inputsValues.message === false )
		{
			dispatch( setWarn("Please enter a reminder message") );
			return;
		}
		if ( !! inputsValues.time === false )
		{
			dispatch( setWarn("Please enter a time") );
			return;
		}

		dispatch( setReminder( { ... inputsValues, monthZeroBased: month.monthZeroBased } ) );

//		(ev.target as HTMLFormElement).reset();

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
				reminder.active == true && currentReminder !== null && "Close to deselect reminder" || 
				reminder.active == false && `Schedule to ${month.monthPack.name}` ||
				"Close"
			}
			</div>
			<article className={["content", reminder.active === true && "shown" || "not-shown"].join(" ")}>
				<form name="name" onSubmit={submitSchedule}>
					<div className={["warn", reminder.warn !== null && "shown" || "" ].join( " " )}>{reminder.warn}
					</div>
					<div className="day input-container">
						<input 
							type="number" min="1" max={month.daysAmount} name="day" 
							value={inputsValues.day}
							onChange={inputChange.bind(null, "day", "valueAsNumber")}
						/>
					</div>
					<div className="time input-container">
						<input 
							type="time" name="time" 
							value={inputsValues.time}
							onChange={inputChange.bind(null, "time", "value")}
						/>
					</div>
					<div className="color input-container">
						<input 
							type="color" name="color" 
							value={inputsValues.color}
							onChange={inputChange.bind(null, "color", "value")}
						/>
					</div>
					<div className="message input-container">
						<textarea 
							rows={3} maxLength={30} placeholder="Reminder message"
							onChange={inputChange.bind(null, "message", "value")}
							value={inputsValues.message}
						>
						</textarea>
					</div>
					{
						currentReminder !== null &&
						<button>Delete reminder
						</button>
					}
					<button>{ currentReminder !== null && "Update" || "Commit" }
					</button>
				</form>
			</article>
		</section>
	);
}



