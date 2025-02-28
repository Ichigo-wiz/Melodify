
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

let signupTab = document.getElementById("signup-tab");
let loginTab = document.getElementById("login-tab");
let signupForm = document.getElementById("signup-form");
let loginForm = document.getElementById("login-form");
let signupBtn = document.getElementById("signup-btn");
let loginBtn = document.getElementById("login-btn");
let users = [];
function isEmailRegistered(email, users) {
    for (let user of users) {
        if (user.email === email) {
            return true;
        }
    }
    return false
}

function saveUser(user) {
    users.push(user);
}

function signup() {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    loginTab.addEventListener('click', () => {
        login();
        return;
    });
    let username = document.getElementById("signup-username").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value.trim();
    if (username === "" || email === "" || password === "") {
        return;
    }
    signup_validate();


}

function login() {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    signupTab.addEventListener('click', () => {
        signup();
        return;
    });
    if (email === "" || password === "") {
        return;
    }
    login_validate();
}
function signup_validate() {
    let username = document.getElementById("signup-username").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let password = document.getElementById("signup-password").value.trim();
    let valid_email = /^\w+([.-]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;
    let valid_password1 = /\w+/;
    let valid_password2 = /\d+/;
    let valid_password3 = /\W+/;
    if (username === "" || email === "" || password === "") {
        alert("All fields are required!");
        return;
    }
    if (!valid_email.test(email)) {
        alert("Invalid email format!");
        return;
    }
    if (isEmailRegistered(email, users)) {
        alert("This email is already registered. Use a different email.");
        return;
    }
    if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
    }
    if (!valid_password1.test(password) || !valid_password2.test(password) || !valid_password3.test(password)) {
        alert("Password must contain at least one letter, one number, and one special character!");
        return;
    }
    let newUser = new User(username, email, password);
    saveUser(newUser);
    alert("Signup successful! You can now login.");
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    signupTab.classList.remove("active");
    loginTab.classList.add("active");
}

function login_validate() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();
    if (email === "" || password === "") {
        alert("Please enter email and password!");
        return;
    }
    let validUser = users.find(user => user.email === email && user.password === password);
    if (validUser) {
        alert("Login successful!");
        window.location.href = "main.html";
    } else {
        alert("Invalid email or password.");
    }
}

let default_user=new User("Satvik_Parihr","vedansh.dubai@gmail.com","Satvik@17");
saveUser(default_user);