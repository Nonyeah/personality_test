const formContainer = document.querySelector('.form-container')! as HTMLElement;
const input = document.querySelector('#userEmail') as HTMLInputElement;
const email = input.value;
const displayMessage = document.querySelector('#form-response') as HTMLParagraphElement;
const button = formContainer.querySelector('#button')! as HTMLButtonElement

const autoSendForm = async() => {
   const response = await fetch("/send-character-profile", {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify({ email: email }),
    })

       const message = await response.text();
    setTimeout(() => displayMessage.innerHTML = message, 1000);

};


button.addEventListener("click", autoSendForm);


const timerId = setTimeout(() =>  button.click(), 2000);
setTimeout(() => clearTimeout(timerId), 3000)

export{formContainer, input, email, displayMessage, button, autoSendForm}


