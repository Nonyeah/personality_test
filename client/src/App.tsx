import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Routes/Layout";
import Home from "./Routes/Home";
import Page1 from "./Routes/Page1";
import Page2 from "./Routes/Page2";
import Page3 from "./Routes/Page3";
import Page4 from "./Routes/Page4";
import Page5 from "./Routes/Page5";
import Page6 from "./Routes/Page6";
import About from "./Routes/About";
import Learn from "./Routes/Learn/Learn";
import Error404 from "./Routes/Error404";
import Personality from "./Routes/Personality";
import SubmitAnswers from "./Routes/Submit-Answers";
import Contact from "./Routes/Contact";
import "./App.css";
import "./App2.css";
import type { Answers } from "./index.d.ts";

function App() {
	const [page1, setpage1] = useState<Answers>([]);
	const [page2, setpage2] = useState<Answers>([]);
	const [page3, setpage3] = useState<Answers>([]);
	const [page4, setpage4] = useState<Answers>([]);
	const [page5, setpage5] = useState<Answers>([]);
	const [page6, setpage6] = useState<Answers>([]);
	const collateAnswers: Answers[] = [page1, page2, page3, page4, page5, page6];

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route
					path="/page1"
					element={<Page1 page={page1} setpage={setpage1} />}
				/>
				<Route
					path="/page2"
					element={<Page2 page={page2} setpage={setpage2} />}
				/>
				<Route
					path="/page3"
					element={<Page3 page={page3} setpage={setpage3} />}
				/>
				<Route
					path="/page4"
					element={<Page4 page={page4} setpage={setpage4} />}
				/>
				<Route
					path="/page5"
					element={<Page5 page={page5} setpage={setpage5} />}
				/>
				<Route
					path="/page6"
					element={<Page6 page={page6} setpage={setpage6} />}
				/>
				<Route
					path="/submitanswers"
					element={<SubmitAnswers serverData={collateAnswers} />}
				/>
				<Route path="/learn" element={<Learn />} />
				<Route path="about" element={<About />} />
				<Route path="/personality" element={<Personality />} />
				<Route path="*" element={<Error404 />} />
				<Route path="/contact" element={<Contact />} />
			</Route>
		</Routes>
	);
}

export default App;
