

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleReminder } from "../../reminderSlice";
import { MonthType, ReminderType } from "../../types";
import "./style.css"


export default function Reminder( props: any )
{
	
	const dispatch = useDispatch();
	const { reminder, month }= useSelector
	( 
		( 
			state: 
			{ 
				reminder: ReminderType,
				month: MonthType
			} 
		) => state
	);

	return (
		<section className="reminder">
			<div 
				className="month" 
				onClick=
				{
					( ev ) =>
					{
						dispatch( toggleReminder("Hello") )	;
					}
				}
			>
			{
				reminder.active == true && "Close" || `Schedule to ${month.monthPack.name}`
			}
			</div>
			<article className={["content", reminder.active === true && "shown" || "not-shown"].join(" ")}>

				<div className="day input-container">
					<input type="number" min="1" max={month.daysAmount} name="day" defaultValue={1} />
				</div>
				<div className="time input-container">
					<input type="time" name="time" defaultValue="00:00"/>
				</div>
				<div className="color input-container">
					<input 
						type="color" name="color" defaultValue="#FF465D"
						onChange=
						{
							( ev ) =>
							{
								console.log( ev );
							}
						}
					/>
				</div>
				<div className="message input-container">
					<textarea rows={3} maxLength={30} placeholder="Reminder message" >
					</textarea>
				</div>
				<button>Commit
				</button>
			</article>
		</section>
	);
}



