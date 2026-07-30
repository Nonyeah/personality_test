import type { ServerData, SendObject } from "..";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SubmitAnswers({ serverData }: ServerData) {
	const messageRef = useRef<HTMLParagraphElement | null>(null);
	const [name, setname] = useState<string>("");
	const [email, setemail] = useState<string>("");
	const navigate = useNavigate();
	const resultsent: boolean = false;
	const emailverified: string = "false";
	const dataAndEmail: SendObject = { results: serverData, name, email, resultsent, emailverified };

	async function sendData() {
		if (!name || !email) {
		messageRef.current!.innerHTML =
			"Please enter your name and a vaild email address before submission";
		return;
	}
		let questionsCompleted: boolean = true;
		//final check that user has answered all questions before sending data to server
		serverData.forEach((answerBlock) => {
			const value: number = answerBlock.reduce(
				(accum: number, answer: number | null) => {
					return accum + (answer === null ? 0 : answer);
				},
				0
			);
			if (value < 5) {
				messageRef.current!.innerHTML =
					"You have not answered all of the questions. Please navigate back using the 'Prev Question' button and answer all questions";
				questionsCompleted = false;
				return;
			}
		});

		if (!questionsCompleted) {
			return;
		} else {
			let message: string = "";
			try {
				const response: Response = await fetch(
					"https://personalitytest.website/survey-response",
					{
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify(dataAndEmail),
					}
				);

				message = await response.text();
				messageRef.current!.innerHTML = message;
				setTimeout(() => {
					setname("");
					setemail("");
				}, 4000);
			} catch (err: any) {
				messageRef.current!.innerHTML = message;
			}
		}
	}

	return (
		<div className="send-results-container">
			<h1>One more step to go...</h1>
			<p>
				We're almost ready to reveal your personality type based on your
				answers.
			</p>
			<p>
				Fill in your details below, press the send button and we'll send you
				your personality profile
			</p>
			<p>
				P.S. Make sure you input a real email address as you'll need to verify
				your email account exists first before we send you your character
				profile
			</p>
			<div className="response-message">
				<p ref={messageRef}></p>
			</div>

			<form>
				<p>
					<label>
						Name:{" "}
						<input
							onChange={(e) => {
								setname(e.target.value);
							}}
							type="text"
							name="name"
							value={name}
							maxLength={60}
							pattern="[a-zA-Z\-]+"
							size={40}
							required
						/>
					</label>{" "}
				</p>
				<p>
					<label>
						Email:{" "}
						<input
							onChange={(e) => setemail(e.target.value)}
							type="email"
							name="email"
							value={email}
							maxLength={60}
							size={40}
							required
						/>
					</label>
				</p>

				<p className="button-container">
					<button onClick={() => navigate("/page6")}>Previous</button>
					<button onClick={sendData} type="button">
						Get Results
					</button>
				</p>
			</form>
		</div>
	);
}

export default SubmitAnswers;
