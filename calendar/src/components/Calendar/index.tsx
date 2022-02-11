
import React, { useState, useEffect }  from 'react';
import { useSelector } from "react-redux";
import { initialStateType } from "../../types"
import "./style.css"


function Calendar( props: any )
{


	const month = useSelector( ( state: { month: initialStateType } ) => state.month );
	console.log( month );

	useEffect
	(
		() =>
		{
		}
	)


//	const today = new Date();
//	const month = months[ today.getMonth() ]
//	console.log( today.getMonth()  );
	return (
		<section className="calendar">
			<section>
			{
				(
					() =>
					{
						const squares = [];
						let counter = 1;
						for ( var i = 0 ; i <= 30 ; i++ )
						{
							if ( i === month.monthPack.startsAt )
							{
								counter = 1;
							}
							
							let article = <article></article>;

							if ( i >= month.monthPack.startsAt )
							{
								article = (
									<article>
										<span>{counter}
										</span>
									</article>
								)
							}

							squares.push
							(
								<div key={i}>
									<section>{article}
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
