function login() {
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const username = usernameInput.value;
    const password = passwordInput.value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        window.location.href = 'Loggedin.html'; 
    } else {
        alert('Invalid username or password');
        passwordInput.style.border = '2px solid red';
        passwordInput.value = ''; 
        passwordInput.setAttribute('placeholder', 'Incorrect password');

        usernameInput.value = '';
        usernameInput.setAttribute('placeholder', 'Incorrect username');
    }
}

const loginForm = document.querySelector('.login-form .form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});
