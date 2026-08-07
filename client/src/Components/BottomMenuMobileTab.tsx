import type { Menu } from "..";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MobileBottomTabMenu({ id, label, listItems }: Menu) {
	const [showtab, setshowtab] = useState<boolean>(false);

	function handleShowTab() {
		setshowtab(!showtab);
	}

	return (
		<>
			<p onClick={handleShowTab}>{label}</p>
			<div className={`hidden-tab ${showtab ? "show" : "hide"}`}>
				<ul>
					{listItems.map((list) =>
						id === 0 ? (
							<li className={"mobile-social-icons"} key={list}>
								<a href="#">
									<img
										src={`${list}`}
										alt={
											list.includes("instagram-mobile-logo")
												? "instagam"
												: list.includes("tiktok-mobile-logo")
													? "tiktok"
													: list.includes("twitter-mobile-logo")
														? "twitter"
														: list.includes("pinterest-mobile-logo")
															? "pinterest"
															: ""
										}
									/>
								</a>
							</li>
						) : (
							<li key={list}>
								<NavLink
									to={`/${list.split(" ")[0].toLowerCase()}`}
								>
									{list}
								</NavLink>
							</li>
						)
					)}
				</ul>
			</div>
		</>
	);
}
export default MobileBottomTabMenu;
