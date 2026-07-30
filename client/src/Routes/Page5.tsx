import type { UserAnswers } from "..";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import answers from "../data";

export default function Page5({ page, setpage }: UserAnswers) {
	{
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
			page[0] = null;
			question1Ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}

		function handleAnswer2(id: number) {
			setanswer2(id);
			page[1] = null;
			question2Ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}

		function handleAnswer3(id: number) {
			setanswer3(id);
			page[2] = null;
			question3Ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}

		function handleAnswer4(id: number) {
			setanswer4(id);
			page[3] = null;
			question4Ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
		function handleAnswer5(id: number) {
			setanswer5(id);
			page[4] = null;
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
			navigate("/page6");
		}

		function navigateBack() {
			navigate("/page4");
		}

		const question1 = answers.map((user) => (
			<section key={user.id}>
				<p>{user.response}</p>
				<span
					className={`${user.category} ${answer1 === user.id ? "highlight" : page[0] === user.id ? "highlight" : ""}`}
					onClick={() => handleAnswer1(user.id)}
				></span>
			</section>
		));

		const question2 = answers.map((user) => (
			<section key={user.id}>
				<p>{user.response}</p>
				<span
					className={`${user.category} ${answer2 == user.id ? "highlight" : page[1] === user.id ? "highlight" : ""}`}
					onClick={() => handleAnswer2(user.id)}
				></span>
			</section>
		));

		const question3 = answers.map((user) => (
			<section key={user.id}>
				<p>{user.response}</p>
				<span
					className={`${user.category} ${answer3 == user.id ? "highlight" : page[2] === user.id ? "highlight" : ""}`}
					onClick={() => handleAnswer3(user.id)}
				></span>
			</section>
		));

		const question4 = answers.map((user) => (
			<section key={user.id}>
				<p>{user.response}</p>
				<span
					className={`${user.category} ${answer4 == user.id ? "highlight" : page[3] === user.id ? "highlight" : ""}`}
					onClick={() => handleAnswer4(user.id)}
				></span>
			</section>
		));

		const question5 = answers.map((user) => (
			<section key={user.id}>
				<p>{user.response}</p>
				<span
					className={`${user.category} ${answer5 == user.id ? "highlight" : page[4] === user.id ? "highlight" : ""}`}
					onClick={() => handleAnswer5(user.id)}
				></span>
			</section>
		));

		return (
			<div className="intro-questions">
				<h1>Openness to Experience</h1>
				
				<div className="questions">
					<p ref={question1Ref} className="question">
						I enjoy learning about unfamiliar topics
					</p>
					<div className="answers">{question1}</div>
					<p ref={question2Ref} className="question">
						I like trying new activities
					</p>
					<div className="answers">{question2}</div>
					<p ref={question3Ref} className="question">
						I am interested in creative pursuits
					</p>
					<div className="answers">{question3}</div>
					<p ref={question4Ref} className="question">
						I enjoy exploring different ways of solving problems
					</p>
					<div className="answers">{question4}</div>
					<p ref={question5Ref} className="question">
						I am open to changing my opinions when presented with new evidence
					</p>
					<div className="answers">{question5}</div>
				</div>

				<nav className="next-question">
					<button onClick={navigateBack} type="button">
						prev question
					</button>
					<span>{message}</span>
					<button onClick={submitAllAnswers} type="button">
						next question
					</button>
				</nav>
			</div>
		);
	}
}
