class Auth {
  static signUp(email, password) {
    if (localStorage.getItem(email)) {
      swal("Email already exists");
      return;
    }

    localStorage.setItem(email, JSON.stringify({ email, password }));
    swal("Signup Successful!", "Please Login", "success");
    setTimeout(() => {
      swal.close();
      document.getElementById("signupForm").reset();
      window.location.href = "login.html";
    }, 2000);
  }

  static login(email, password) {
    const userData = JSON.parse(localStorage.getItem(email));

    if (userData && userData.password === password) {
      document.getElementById("loginForm").reset();
      swal("Login", "Login Successful", "success");
      setTimeout(() => {
        window.location.href = "products.html";
      }, 2000);
    } else {
      swal("Login Failed!", "Invalid email or password!", "error");
    }
  }
}

function signupFormSubmit(e) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  Auth.signUp(email, password);
}

function loginFormSubmit(e) {
  event.preventDefault();
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  Auth.login(email, password);
}
