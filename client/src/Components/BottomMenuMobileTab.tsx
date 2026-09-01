import type { Menu, PreviousState } from "..";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MobileBottomTabMenu({
	id,
	label,
	listItems,
	prevState,
	closePreviousTab,
}: Menu) {
	const [showtab, setshowtab] = useState<boolean>(false);

	function handleShowTab() {
		setshowtab(!showtab);
		closePreviousTab(id, !showtab);
		
		
	}

	const match: PreviousState | undefined = prevState.find(data => data.id === id);
	if(match && showtab && match.clickedTab == false){
		setshowtab(false);
	} 

	return (
		<>
			<p onClick={handleShowTab}>{label}</p>
			<div
				className={`hidden-tab ${prevState[id].clickedTab ? "show" : "hide" }`}
			>
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
								<NavLink to={`/${list.split(" ")[0].toLowerCase()}`}>
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
