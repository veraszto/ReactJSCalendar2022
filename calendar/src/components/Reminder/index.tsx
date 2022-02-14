

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleReminder, setWarn } from "../../reminderSlice";
import { setReminder, setCurrentReminder, deleteReminder } from "../../monthSlice";
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
	const currentReminder: any = month.currentReminder;
	let buttonNames = [ "delete", "commit" ];
	let deleteButton = null;
	if ( currentReminder !== null )
	{
		buttonNames[ 1 ] = "update";
		deleteButton = <button name={buttonNames[0]}>Delete reminder</button>
	}

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
//				console.log( currentReminder );
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

	const submitSchedule = 
	( 
		ev: React.FormEvent<HTMLFormElement> & 
		{ nativeEvent:{ submitter: { name: string }}} 
	) =>
	{
		ev.preventDefault();	
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

		const which = (ev.nativeEvent).submitter.name;
		if ( which === "commit" )
		{
			dispatch( setReminder( { ... inputsValues, monthZeroBased: month.monthZeroBased } ) );
		}
		else 
		{
			const { day, monthInContext, index, color, message, time } = currentReminder;
			const update = ((which === "delete")? true : false);
			dispatch
			( 
				deleteReminder( {day: day, month: monthInContext, index: index } ) 
			);

			if ( which === "update" )
			{
				dispatch( setReminder( { ... inputsValues, monthZeroBased: monthInContext, index: index } ) );
			}

			dispatch( toggleReminder() );
		}

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
				reminder.active == false && <><span>Schedule/Manage reminders in </span><span>{month.monthPack.name}</span></> ||
				"Close"
			}
			</div>
			<article className={["content", reminder.active === true && "shown" || "not-shown"].join(" ")}>
				<form name="main" onSubmit={submitSchedule}>
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
					{deleteButton}
					<button name={buttonNames[1]}>{ currentReminder !== null && "Update" || "Commit" }
					</button>
				</form>
			</article>
		</section>
	);
}



