
import React, { useState, useEffect }  from 'react';
import { useSelector } from "react-redux";
import { MonthType } from "../../types"
import "./style.css"


function Calendar( props: any )
{

	const month = useSelector( ( state: { month: MonthType } ) => state.month );
	console.log( month );

	useEffect
	(
		() =>
		{
		}
	)

	const fillReminders = ( day: number ) =>
	{
		return (
			[ 
				<article>Hello how are you</article>, 
				<article>Hello how are you</article>, 
				<article>Hello how are you</article>, 
				<article>Hello how are you</article> 
			]
		);
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
