import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql2/promise";
import path from "node:path";
import type { NextFunction, Request, Response } from "express";
import type { FieldPacket, RowDataPacket } from "mysql2";
import type { SentMessageInfo } from "nodemailer";
import fs from "node:fs/promises";
import nodemailer from "nodemailer";
//import cors from "cors";
import type { Answers, MailOptions } from "../client/src/index.d.ts";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3007;
// Remove cors in production. Adds headers: Access-Control-Allow-Origin: * for development purposes. In production, the client and server will be served from the same origin, so CORS is not needed.
//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

const transporter = nodemailer.createTransport({
	host: "mail.personalitytest.website",
	port: 587, // or 587
	secure: false, // true for 465, false for 587
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true, // If true, the pool will queue connections if none are available
	connectionLimit: 10, // Maximum number of connections to create at once
	queueLimit: 0, // The maximum number of requests the pool will queue before returning an error
});

pool
	.getConnection()
	.then((connection: any) => {
		//console.log("Successfully connected to MySQL database!");
		connection.release(); // Release the connection back to the pool
	})
	.catch((err: Error | null) => {
		console.error("Failed to connect to MySQL database:", err);
		// Exit the process if database connection fails, as the app won't function
		process.exit(1);
	});

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.sendFile(path.join(__dirname, "../client", "index.html"));
	} catch (err: any) {
		if (err) next(err);
	}
});

app.post(
	"/survey-response",
	async (req: Request, res: Response, next: NextFunction) => {
		let connection;
		try {
			let { results, name, email, resultsent, emailverified } = req.body;
			email = email.toLowerCase().trim();
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			const match = regex.test(email);
			if (!match) {
				return res.send(
					`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px;">
					Please enter a proper email address using valid email characters</p>`
				);
			}

			//connect to database and add user entry to database
			let id: number = 1;
			connection = await pool.getConnection();
			const [storedSurveys]: [RowDataPacket[], FieldPacket[]] =
				await connection.execute(`SELECT * FROM surveyresults`);

			//if there are no stored surveys then the database is empty so insert first row into table
			if (!storedSurveys.length) {
				await connection.execute(
					"INSERT INTO surveyresults (id, name, email, data, resultsent, emailverified) VALUES (?, ?, ?, ?, ?, ?)",
					[id, name, email, JSON.stringify(results), resultsent, emailverified]
				);
			} else {
				//if database has entries check for duplicate surveys
				const duplicateSurvey: RowDataPacket[] | [] = storedSurveys.filter(
					(surveyData) => surveyData.email === email
				);

				//check status of duplicate entry for result sent
				if (duplicateSurvey.length && duplicateSurvey[0].resultsent) {
					return res.send(
						`<p>You have already completed the survey and a response has been sent to your email</p>`
					);
					//check status of duplicate entry for email verified
				} else if (
					duplicateSurvey.length &&
					duplicateSurvey[0].emailverified === "pending"
				) {
					return res.send(
						"<p> A link has <b>previously been sent to your email address for verification</b>. Please check your inbox and verify your email address</p>"
					);
				}

				//calculate id for new survey entry based on the number of existing entries in the database
				id = storedSurveys.length + 1;

				// add new survey result entry to database with calculated id, name, email and survey results
				await connection.execute(
					"INSERT INTO surveyresults (id, name, email, data, resultsent, emailverified) VALUES (?, ?, ?, ?, ?, ?)",
					[id, name, email, JSON.stringify(results), resultsent, emailverified]
				);
			}

			//send verification email to user before sending survey response

			let htmlEmailBody = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<style>
	html {
				box-sizing: border-box;
			}

			.email-container {
				text-align: center;
				padding: 30px;
			}

			.email-container h2 {
				font-family: Arial, Helvetica, sans-serif;
			}

			.email-container p {
				font-size: 16px;
				font-family: Arial, Helvetica, sans-serif;
				line-height: 150%;
			}

		a {
   display: inline-block;
   padding: 16px;
   background-color: #000;
   color: #fff;
   border: 0;
   cursor: pointer;
   text-transform: capitalize;
   font-size: 1rem;
   margin: 30px 0;
   font-family: Arial, Helvetica, sans-serif;
   text-decoration: none
}

	</style>
	</head>
	<title>Verify Your Email Address</title>
	<body>
	<div class="email-container">
	<h2> Hi ${name}</h2>
  <p> We just need to check that your email address is correct before we send you your 
         personality test results.</p>
    <p>Please click the button below to verify your email address</p>
   <a href="https://personalitytest.website/verify-email?email=${encodeURIComponent(email)}">
    verify email address</a>
	<p>If the button isn't responsive you can right click on the button and select "Copy Link Address" to copy the verification link and 
	paste it into your browser.</p>
	</div>
	</body>
	</html>
	`;
			const mailOptions: MailOptions = {
				from: process.env.EMAIL_USER,
				to: email,
				subject: "Verify Your Email Address",
				html: htmlEmailBody,
			};

			//send vaildation email to user's email address
			await transporter.sendMail(mailOptions);
			await connection.execute(
				`UPDATE surveyresults SET emailverified = "pending" where email = ?`,
				[email]
			);
			//send verification post back to react app client
			return res.send(
				`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					       A validation link has been sent to your email address.
					       Please confirm by clicking the link in your email to receive your survey results</p>`
			);
		} catch (err) {
			if (err) console.error(err);
			return res.send(
				`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					       Unfortunately we could not send the verification link to your email address. Please try again later.</p>`
			);
		} finally {
			if (connection) connection.release();
		}
	}
);

app.get(
	"/verify-email",
	async (req: Request, res: Response, next: NextFunction) => {
		let connection: any;
		let email = req.query.email as string;
		email = email.toLowerCase().trim();
		email = decodeURIComponent(email);
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const match = regex.test(email);
		if (!match) {
			return res.send(
				`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px;">
					       Your email address did not pass our validation checks so we are unable
						   to send you your character profile results</p>`
			);
		}

		try {
			//query database based on user email sent in verification request
			connection = await pool.getConnection();
			const [userData]: RowDataPacket[] = await connection.execute(
				`SELECT * FROM surveyresults WHERE email = ?`,
				[email]
			);

			// return if user entered an email address that wasn't set during the interim validation protocol
			if (!userData.length) {
				return res.send(
					`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					     Sorry, we can't find a personality profile for you based on the email you provided.</p>`
				);
			}

			if (userData[0].resultsent) {
				return res.send(
					`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					     You have already received your personality profile. 
						 Please check your inbox or junk mail.</p>`
				);
			}

			await connection.execute(
				`UPDATE surveyresults SET emailverified = "true" where email = ?`,
				[email]
			);

			const autoSendForm = `<html lang="en">
	<head>
		
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<style>
			html {
				box-sizing: border-box;
			}

			.form-container {
				text-align: center;
				padding: 30px;
			}

			.form-container h2 {
				font-family: Arial, Helvetica, sans-serif;
				font-size: 20px;
			}

			.form-container p {
				font-size: 18px;
				font-family: Arial, Helvetica, sans-serif;
				line-height: 150%;
			}

			.form-container button {
				padding: 16px;
				opacity: 0;
			}
				p#spinner {
				font-size: 50px;
				}
				p#form-response {
				font-size: 18px;
				}
		</style>
		<title>Email Successfully Verified</title>
	</head>
	
	<body>
		<div class="form-container">
			<h2>We've successfully verified your email</h2>
			<p>Please wait whilst we calculate your personality score</p>
			<p id="spinner"></p>

			<form>
				<input type="hidden" id="userEmail" name="email" value="${email}" />
				<button id="button" type="button">submit form</button>
			</form>

			<p id="form-response"></p>
		</div>
		<script type="module" src="/assets/auto-confirm-form.js" defer></script>
	</body>
</html>
`;

			return res.send(autoSendForm);
		} catch (err) {
			if (err) next(err);
		} finally {
			if (connection) connection.release();
		}
	}
);

app.post(
	"/send-character-profile",
	async (req: Request, res: Response, next: NextFunction) => {
		let connection: any;
		try {
			let { email } = req.body as { email: string };
			email = email.toLowerCase().trim();
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			const match = regex.test(email);
			if (!match) {
				return res.send(
					`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					We couldn't validate your email and are unable to reveal your personality score</p>`
				);
			}
			connection = await pool.getConnection();
			const userData: RowDataPacket[] = await connection.execute(
				`SELECT * FROM surveyresults WHERE email = ?`,
				[email]
			);

			if (userData[0].resultsent) {
				return res.send(
					`<p style="text-align:center;font-size:20px;font-family:arial;margin-top:60px">
					     You have already received your personality profile. 
						 Please check your inbox or junk mail.</p>`
				);
			}

			//extract user score for calculation
			const results = JSON.parse(userData[0][0].data);
			//extract user name
			const name = userData[0][0].name;
			//calculate user scores
			const flattenedData = results.flat();
			const scoreTotal = flattenedData.reduce(
				(accum: number, value: number) => accum + value,
				0
			);

			if (scoreTotal >= 120) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "survey-responses/above80.html"),
					"utf8"
				);

				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`<!DOCTYPE html>
							<html lang="en">
							<body>
							<p style="text-align:center;font-size:22px;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						     </body>
						    </html>`
				);
			} else if (scoreTotal <= 119 && scoreTotal >= 105) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "survey-responses/above70.html"),
					"utf8"
				);

				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`
							<p style="text-align:center;font-size:22px;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						    `
				);
			} else if (scoreTotal <= 104 && scoreTotal >= 90) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "survey-responses/above60.html"),
					"utf8"
				);

				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`
							<p style="text-align:center;font-size:22px;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						    `
				);
			} else if (scoreTotal <= 89 && scoreTotal >= 75) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "survey-responses/above50.html"),
					"utf8"
				);
				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`
							<p style="text-align:center;font-size:22px;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						    `
				);
			} else if (scoreTotal <= 74 && scoreTotal >= 60) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "./survey-responses/above40.html"),
					"utf8"
				);
				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`
							<p style="text-align:center;font-size:22px;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						    `
				);
			} else if (scoreTotal <= 59) {
				const htmlReply: string = await fs.readFile(
					path.join(__dirname, "survey-responses/below39.html"),

					"utf8"
				);
				const mailOptions: MailOptions = {
					from: process.env.EMAIL_USER,
					to: email,
					subject: `Congratulations ${name}. Your personality score is here`,
					html: htmlReply,
				};

				await transporter.sendMail(mailOptions);
				//update survey sent column value to true
				await connection.execute(
					`UPDATE surveyresults SET resultsent = true WHERE email = ?`,
					[email]
				);
				return res.send(
					`
							<p style="text-align;center:font-size:22xpx;font-family:arial;margin-top:60px">
					        Your personality score is in. Please check your email for your results</p>
						    `
				);
			} else {
				return res.send(`
							<p style="text-align:center;font-size:16px;font-family:arial;margin-top:60px">
					        Sorry we could not calculate your test score</p>
						    `);
			}
		} catch (err) {
			if (err) next(err);
		} finally {
			if (connection) connection.release();
		}
	}
);

//catch routes that don't exist
app.use((req: Request, res: Response) => {
	return res.status(404).send("Ooops we can't find what you are looking for");
});

//catch errors thrown or passed by next function
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	if (err) console.error(err);
	return res.status(status).json({
		type: `${err.name}`,
		message: `${err.message}`,
	});
});

const server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
	console.log(server.address());
});

server.on("error", (err) => {
	console.error(err);
});
