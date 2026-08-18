const formContainer = document.querySelector(".form-container")! as HTMLElement;
const input = document.querySelector("#userEmail") as HTMLInputElement;
const email = input.value;
const displayMessage = document.querySelector(
	"#form-response"
) as HTMLParagraphElement;
const button = formContainer.querySelector("#button")! as HTMLButtonElement;
const spinner = document.querySelector("#spinner")! as HTMLParagraphElement;

const activateSpinner = () => {
	const str: string = "\u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF \u25CF";
	let i = 0;
	const timerId = setInterval(() => {
		if (i >= str.length) {
         clearInterval(timerId);
         return;
      }
		spinner.innerHTML += str[i++];
	}, 100);
};

const autoSendForm = async () => {
	const response = await fetch("/send-character-profile", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email }),
	});

	const message = await response.text();
	setTimeout(() => (displayMessage.innerHTML = message), 800);
};

button.addEventListener("click", autoSendForm);
activateSpinner();


const timerId = setTimeout(() => button.click(), 2500);
setTimeout(() => clearTimeout(timerId), 3000);

export { formContainer, input, email, displayMessage, button, autoSendForm };
