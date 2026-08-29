import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/logo.jpg";
import instagram from "../assets/instagram.jpg";
import tiktok from "../assets/tiktok.jpg";
import pinterest from "../assets/pinterest.jpg";
import twitter from "../assets/x.jpg";
import { bottomMenuItems } from "../data";
import MobileBottomTabMenu from "../Components/BottomMenuMobileTab";
import BurgerMenu from "../Components/BurgerMenu";
import { useState } from "react";
import type { PreviousState } from "..";

export default function Layout({}) {
	const [prevState, setPrevState] = useState<PreviousState[]>([
		{ id: 0, clickedTab: false },
		{ id: 1, clickedTab: false },
		{ id: 2, clickedTab: false },
	]);

	function closePreviousTab(id: number, isCurrentTabOpen: boolean) {
		const tabChange = bottomMenuItems.map((data) => {
			if (data.id == id) {
				return ({ id: id, clickedTab: isCurrentTabOpen });
			} else {
				return {...data.prevState[0]};
			}
		});
		setPrevState(tabChange);
	}

	const styles = { textDecoration: "none", color: "#000" };
	return (
		<>
			<BurgerMenu />
			<div className="top-nav">
				<img src={logo} alt="logo image" />
				<nav className="navigation" aria-label="topnav">
					<ul>
						<li>
							<NavLink style={styles} to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink style={styles} to="/personality">
								Personality types
							</NavLink>
						</li>
						<li>
							<NavLink style={styles} to="/learn">
								Learn
							</NavLink>
						</li>
						<li>
							<NavLink style={styles} to="/about">
								About
							</NavLink>
						</li>
						<li>
							<NavLink style={styles} to="/contact">
								{" "}
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink style={styles} to="/page1">
								Take the test
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>

			<Outlet />

			<div className="bottom-nav">
				<section className="social-media">
					<h4>connect with us</h4>
					<img src={instagram} alt="instagram icon" />
					<img src={tiktok} alt="tiktok icon" />
					<img src={pinterest} alt="pinterest icon" />
					<img src={twitter} alt="twitter icon" />
				</section>
				<section>
					<h4>about</h4>
					<nav>
						<ul>
							<li>
								<NavLink to="/about">about us</NavLink>
							</li>
							<li>
								<NavLink to="/learn">learn</NavLink>
							</li>
							<li>
								<NavLink to="/personality">personality types</NavLink>
							</li>
						</ul>
					</nav>
				</section>
				<section>
					<h4>get help</h4>
					<nav>
						<ul>
							<li>
								<NavLink to="/contact">contact us</NavLink>
							</li>
							<li>
								<NavLink to="/contact">privacy & cookies</NavLink>
							</li>
							<li>
								<NavLink to="/">home</NavLink>
							</li>
						</ul>
					</nav>
				</section>
				<section>
					<h4>advertising</h4>
					<nav>
						<ul>
							<li>
								<NavLink to="/advertising">advertising</NavLink>
							</li>
							<li>
								<NavLink to="/contact">affiliates</NavLink>
							</li>
							<li>
								<NavLink to="/contact">careers</NavLink>
							</li>
						</ul>
					</nav>
				</section>
			</div>

			<div className="mobile-bottom-tab-menu">
				{bottomMenuItems.map((menuItem) => (
					<MobileBottomTabMenu
						key={menuItem.id}
						id={menuItem.id}
						label={menuItem.label}
						listItems={menuItem.listItems}
						prevState={prevState}
						closePreviousTab={closePreviousTab}
					/>
				))}
			</div>
		</>
	);
}
