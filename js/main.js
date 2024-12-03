const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupButton = document.getElementById('signup');
const emailLoginInput = document.getElementById('emaillogin');
const passwordLoginInput = document.getElementById('passwordlogin');
const loginButton = document.getElementById('login');
const alertMessage = document.getElementById('alert');
const errorMessage = document.getElementById('error');

let userData = JSON.parse(localStorage.getItem('data')) || [];


function addRealTimeValidation(inputs) {
    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            if (input.value.trim() !== '') {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
                input.classList.remove('is-valid');
            }
        });
    });
}


function validateForm(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            isValid = false;
        } else {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
        }
    });
    return isValid;
}


function clearInputs(inputs) {
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('is-valid', 'is-invalid');
    });
}


function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideMessage(element) {
    element.style.display = 'none';
}


if (signupButton) {
    addRealTimeValidation([nameInput, emailInput, passwordInput]);

    signupButton.addEventListener('click', () => {
        if (validateForm([nameInput, emailInput, passwordInput])) {
            const emailExists = userData.some(user => user.email === emailInput.value);

            if (emailExists) {
                showMessage(alertMessage, 'This email is already registered. Please use another email.');
            } else {
                const newUser = {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                };
                userData.push(newUser);
                localStorage.setItem('data', JSON.stringify(userData));
                clearInputs([nameInput, emailInput, passwordInput]);
                window.location.href = 'index.html';
            }
        }
    });
}


if (loginButton) {
    addRealTimeValidation([emailLoginInput, passwordLoginInput]);

    loginButton.addEventListener('click', () => {
        if (validateForm([emailLoginInput, passwordLoginInput])) {
            const user = userData.find(
                user =>
                    user.email === emailLoginInput.value &&
                    user.password === passwordLoginInput.value
            );

            if (user) {
                window.location.href = 'home.html';
            } else {
                showMessage(errorMessage, 'Invalid email or password. Please try again.');
            }
        }
    });
}
