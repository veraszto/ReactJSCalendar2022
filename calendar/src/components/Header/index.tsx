
import "./style.css";


function Header( props: any )
{
	return (
		<header className="main">
			<span>{props.children}
			</span>
		</header>
	);
}


export default Header;
