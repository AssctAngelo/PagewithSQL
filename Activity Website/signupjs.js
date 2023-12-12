document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('signup-password');

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const passwordLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        const passwordLengthMsg = passwordLength ? '' : 'Password must be 8 or more characters long.';
        const uppercaseMsg = hasUppercase ? '' : 'Must contain at least 1 uppercase letter.';
        const numberMsg = hasNumber ? '' : 'Must contain at least one or more numbers.';
        const symbolMsg = !hasSymbol ? '' : 'Cannot contain symbols.';

        const errorMessage = [passwordLengthMsg, uppercaseMsg, numberMsg, symbolMsg].filter(Boolean).join(' ');

        if (errorMessage) {
            passwordInput.setCustomValidity(errorMessage);
        } else {
            passwordInput.setCustomValidity('');
        }
    });

    signupForm.addEventListener('submit', function(event) {
        const password = passwordInput.value;
        if (passwordInput.validity.valid) {
            signUp();
        } else {
            event.preventDefault(); 
        }
    });

    function signUp() {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const user = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem(username, JSON.stringify(user));

        alert('Account created successfully. Please log in.');
        window.location.href = 'login.html';
    }
});
