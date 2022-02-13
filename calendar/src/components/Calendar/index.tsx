
import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentReminder } from "../../monthSlice";
import { toggleReminder } from "../../reminderSlice";
import { MonthType, ReminderType } from "../../types"
import "./style.css"


function Calendar( props: any )
{

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
	const dispatch = useDispatch();

	const fillReminders = ( day: number ) =>
	{
		const reminders = month.reminders[ month.monthZeroBased ] &&
			month.reminders[ month.monthZeroBased ][ day ];

		if ( reminders === undefined )
		{
			return null;
		}

//		console.log( reminders );

		const remindersElements = reminders.map
		(
			( eachReminder: { [ index: string ]: number | string }, index: number ) =>
			{
				return (
					<article 
						key={index} style={{backgroundColor: eachReminder.color as string }}
						onClick=
						{
							( ev ) =>
							{
								dispatch
								(
									setCurrentReminder
									(
										{
											time: eachReminder.time,
											message: eachReminder.message,
											color: eachReminder.color,
											day: day,
											monthInContext: month.monthZeroBased,
											index: index
										}
									)
								);

								if ( reminder.active === false )
								{
									dispatch( toggleReminder() );
								}

							}
						}
					>
						<div>{eachReminder.time}
						</div>
						<div>{eachReminder.message}
						</div>
					</article>
				);
			}
		);

		return remindersElements;
		
	}

	return (
		<section className="calendar">
			<section>
			{
				(
					() =>
					{
						const squares = [];
						let counter = 1;
						let letRestart = true;
						let key = 0;
						let className: string[] = [];
						for ( var i = 0 ; i <= 30 ; i++ )
						{

							if 
							( 
								i >= month.monthPack.startsAt &&
								letRestart === true
							)
							{
								counter = 1;
								i = 0;
								letRestart = false;
								className = [ "active" ];
							}

							if ( i >= month.daysAmount )
							{
								return squares;
							}
							

							squares.push
							(
								<div key={key++} className={className.join(" ")}>
									<section>
										<span>{counter}
										</span>
										{letRestart === false && fillReminders(counter)}
									</section>
								</div>
							);
							counter++;
						}
						return  squares;
					}
				)()								
			}
			</section>
		</section>
	);


}






export default Calendar;
