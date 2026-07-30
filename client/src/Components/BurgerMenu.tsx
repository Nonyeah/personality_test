import { useState } from "react";
import logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";

function BurgerMenu() {
	const [isopen, setisopen] = useState<boolean>(false);

	function handleIsOpen() {
		setisopen(!isopen);
	}

    function closeMenu(){
        setisopen(false);
    }

	if (isopen) {
		return (
			<div role="main" aria-label="hidden-links-container" className="mobile-nav">
               
				<div className="mobile-links">
                    <p aria-label="close-button" onClick={closeMenu}>&times;</p>
                    <ul>
                        <li><NavLink onClick={closeMenu} to="/">home</NavLink></li>
                         <li><NavLink onClick={closeMenu} to="/learn">learn</NavLink></li>
						 <li><NavLink onClick={closeMenu} to="/personality">personality</NavLink></li>
                        <li>contact us</li>
                         <li><NavLink onClick={closeMenu} to="/about">about</NavLink></li>
                        <li><NavLink onClick={closeMenu} to="/page1">take the test</NavLink></li>
                    </ul>
                     
                </div>
				<span role="menu" onClick={handleIsOpen}>&#9776;</span>
				<img src={logo} alt="image-logo" />
			</div>
		);
	} else {
		return (
			<div role="main" className="mobile-nav">
				<span role="menu" onClick={handleIsOpen}>&#9776;</span>
				<img src={logo} alt="image-logo" />
			</div>
		);
	}
}

export default BurgerMenu
