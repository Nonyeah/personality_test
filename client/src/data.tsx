import type { Responses, Menu } from ".";
import instagram from "./assets/instagram.jpg";
import tiktok from "./assets/tiktok.jpg";
import pinterest from "./assets/pinterest.jpg";
import twitter from "./assets/x.jpg";

const answers: Responses[] = [
	{ id: 1, response: "strongly disagree", category: "a" },
	{ id: 2, response: "disagree", category: "b" },
	{ id: 3, response: "neutral", category: "c" },
	{ id: 4, response: "agree", category: "d" },
	{ id: 5, response: "strongly agree", category: "e" },
];

 export const bottomMenuItems: Menu[] = [
	{	id: 0,
		label: "Connect with us",
		listItems: [instagram, tiktok, twitter, pinterest],
	},
	{   id: 1,
		label: "About us",
		listItems: ["About us", "Learn", "Personality Types", "affiliates"],
	},
	{	id: 2,
		label: "Get Help",
		listItems: ["contact us", "privacy", "cookies", "terms"],
	},
];

export default answers;

