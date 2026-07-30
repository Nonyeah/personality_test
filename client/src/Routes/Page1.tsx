import type { UserAnswers } from "..";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import answers from "../data";

export default function Page1({ page, setpage }: UserAnswers) {
	const [answer1, setanswer1] = useState<null | number>(page[0]);
	const [answer2, setanswer2] = useState<null | number>(page[1]);
	const [answer3, setanswer3] = useState<null | number>(page[2]);
	const [answer4, setanswer4] = useState<null | number>(page[3]);
	const [answer5, setanswer5] = useState<null | number>(page[4]);
	const [message, setmessage] = useState<string>(" ");
	const navigate = useNavigate();
	const question1Ref = useRef<HTMLParagraphElement | null>(null);
	const question2Ref = useRef<HTMLParagraphElement | null>(null);
	const question3Ref = useRef<HTMLParagraphElement | null>(null);
	const question4Ref = useRef<HTMLParagraphElement | null>(null);
	const question5Ref = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, []);

	function handleAnswer1(id: number) {
		setanswer1(id);
		//page[0] = null;
		question1Ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	function handleAnswer2(id: number) {
		setanswer2(id);
		//page[1] = null;
		question2Ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	function handleAnswer3(id: number) {
		setanswer3(id);
		//page[2] = null;
		question3Ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	function handleAnswer4(id: number) {
		setanswer4(id);
		//page[3] = null;
		question4Ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	function handleAnswer5(id: number) {
		setanswer5(id);
		//page[4] = null;
		question5Ref.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
			inline: "nearest",
		});
	}

	function submitAllAnswers() {
		const userResults: (number | null)[] = [
			answer1,
			answer2,
			answer3,
			answer4,
			answer5,
		];
		const nullcheck = userResults.filter((answer) => !answer);
		if (nullcheck.length) {
			setmessage(
				"please answer all questions before navigating to the next page"
			);
			return;
		}
		setpage(userResults);
		navigate("/page2");
	}

	const question1 = answers.map((user) => (
		<section role="region" aria-label="question section" key={user.id}>
			<p>{user.response}</p>
			<span
				role="button"
				className={`${user.category} ${answer1 !== page[0] && user.id === answer1 ? "highlight" : page[0] === user.id && answer1 === page[0] ? "highlight" : ""}`}
				onClick={() => handleAnswer1(user.id)}
			></span>
		</section>
	));

	const question2 = answers.map((user) => (
		<section key={user.id}>
			<p>{user.response}</p>
			<span
				className={`${user.category} ${answer2 !== page[1] && user.id === answer2 ? "highlight" : page[1] === user.id && answer2 === page[1] ? "highlight" : ""}`}
				onClick={() => handleAnswer2(user.id)}
			></span>
		</section>
	));

	const question3 = answers.map((user) => (
		<section key={user.id}>
			<p>{user.response}</p>
			<span
				className={`${user.category} ${answer3 !== page[2] && user.id === answer3 ? "highlight" : page[2] === user.id && answer3 === page[2] ? "highlight" : ""}`}
				onClick={() => handleAnswer3(user.id)}
			></span>
		</section>
	));

	const question4 = answers.map((user) => (
		<section key={user.id}>
			<p>{user.response}</p>
			<span
				className={`${user.category} ${answer4 !== page[3] && user.id === answer4 ? "highlight" : page[3] === user.id && answer4 === page[3] ? "highlight" : ""}`}
				onClick={() => handleAnswer4(user.id)}
			></span>
		</section>
	));

	const question5 = answers.map((user) => (
		<section key={user.id}>
			<p>{user.response}</p>
			<span
				className={`${user.category} ${answer5 !== page[4] && user.id === answer5 ? "highlight" : page[4] === user.id && answer5 === page[4] ? "highlight" : ""}`}
				onClick={() => handleAnswer5(user.id)}
			></span>
		</section>
	));

	return (
		<div className="intro-questions">
			<h1>Extraversion</h1>
			<p className="intro">
				Be honest with yourself and choose how accurately each statement
				reflects you and your behaviour and choose 1 of the following 5 options:
			</p>

			<div className="selection-options">
				<section>
					<p>strongly disagree</p>
					<span className="a"></span>
				</section>

				<section>
					<p> disagree</p>
					<span className="b"></span>
				</section>

				<section>
					<p>neutral</p>
					<span className="c"></span>
				</section>

				<section>
					<p>agree</p>
					<span className="d"></span>
				</section>

				<section>
					<p>strongly agree</p>
					<span className="e"></span>
				</section>
			</div>

			<div className="questions">
				<p ref={question1Ref} className="question">
					I enjoy being the centre of attention
				</p>
				<div className="answers">{question1}</div>
				<p ref={question2Ref} className="question">
					I feel energised after spending time with large groups of people
				</p>
				<div className="answers">{question2}</div>
				<p ref={question3Ref} className="question">
					I find it easy to start conversations with strangers
				</p>
				<div className="answers">{question3}</div>
				<p ref={question4Ref} className="question">
					I prefer social activities to spending time alone
				</p>
				<div className="answers">{question4}</div>
				<p ref={question5Ref} className="question">
					I often take the lead in group discussions
				</p>
				<div className="answers">{question5}</div>
			</div>

			<nav className="next-question">
				<span>{message}</span>
				<button aria-label="Submit Answers" onClick={submitAllAnswers} type="button">
					next question
				</button>
			</nav>
		</div>
	);
}
