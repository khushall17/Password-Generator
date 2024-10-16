let lengthSlider = document.getElementById('lengthSlider')
let sliderValue = document.getElementById('sliderValue')

sliderValue.textContent = lengthSlider.value 

lengthSlider.addEventListener("input", ()=>{
    sliderValue.textContent = lengthSlider.value
})

let checkboxes = document.querySelectorAll('.checkbox')

Array.from(checkboxes).forEach(Element =>{
    Element.addEventListener('click', (e)=>{
        const checkbox = e.target.closest('.checkbox').nextElementSibling.nextElementSibling;
        if (e.target.tagName === 'IMG' && e.target.src.includes('radio_button_unchecked.svg')) {
            // const checkbox = e.target.closest('.checkbox').nextElementSibling.nextElementSibling; 
            e.target.src = 'task_alt.svg';
            checkbox.checked = true;
        }
        else{
            e.target.src = 'radio_button_unchecked.svg';
            //e.target.nextElementSibling.nextElementSibling.removeAttribute("checked");
            checkbox.checked = false;
        }
    })
})

let includeLabels = document.querySelectorAll('.row label');

Array.from(includeLabels).forEach(Element => {
    Element.addEventListener('click', (e) => {
        // Access the img inside the span
        const imgElement = e.target.previousElementSibling.querySelector('img');

        if (imgElement.src.includes('radio_button_unchecked.svg')) {
            imgElement.src = 'task_alt.svg';
        } else {
            imgElement.src = 'radio_button_unchecked.svg';
        }
    });
})

let generateBtn = document.getElementById('generateBtn')
let password = document.getElementById('password');

generateBtn.addEventListener('click', function(){
    let length = lengthSlider.value
    let uppercase = document.getElementById('uppercase').checked
    let lowercase = document.getElementById('lowercase').checked
    let symbols = document.getElementById('symbols').checked
    let numbers = document.getElementById('numbers').checked

    let password_generated = generatePassword(length, uppercase, lowercase, symbols, numbers)
    password.value = password_generated;
})

function generatePassword (length, uppercase, lowercase, symbols, numbers){
    let charset = ""
    let string = ""

    if(uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(lowercase) charset += "abcdefghijklmnopqrstuvwxyz"

    if(symbols) charset += "!@#$%^&*()"

    if (numbers) charset += "0123456789"

    for(let i=0; i<length; i++){
        string += charset.charAt(Math.floor(Math.random()*charset.length))
    }
    return string;
}

let copyIcon = document.getElementById('copyIcon')

copyIcon.addEventListener('click', () => {
    if (navigator.clipboard && password.value != "") {
        // Modern clipboard API
        navigator.clipboard.writeText(password.value)
            .then(() => {
                copyIcon.src = 'check.svg';  // Change icon to 'check'
                setTimeout(() => {
                    copyIcon.src = 'copy.svg';  // Revert after 2 seconds
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        // Fallback for older browsers using document.execCommand
        let passwordInput = document.getElementById('password');
        
        // Select the text
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the selected text to the clipboard
        try {
            let successful = document.execCommand('copy');
            if (successful && password.value != "") {
                copyIcon.src = 'check.svg';  
                setTimeout(() => {
                    copyIcon.src = 'copy.svg';  
                }, 3000);
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    }
});

