
import React, { useState, useEffect }  from 'react';
import { ReactComponent as Arrow } from "../../assets.images/arrow.svg"
import "./style.css";

type PropsType = 
{
	direction?: string,
	action: any
}

class Jump extends React.Component<PropsType>
{
	constructor( props: PropsType )
	{
		super( props );
		this.state = 
		{
		}
	}
	
	componentDidMount()
	{
	}

	render()
	{
		let leftOrRight = this.props.direction;
		return (
			<div className={`bar ${leftOrRight}`} onClick={this.props.action.bind( null, leftOrRight )}>
				<Arrow />
			</div>
		);
	}

}


export default Jump;


