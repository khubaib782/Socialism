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

  // static login(username, password) {
  //   const userData = JSON.parse(localStorage.getItem(username));

  //   if (userData && userData.password === password) {
  //     document.getElementById("loginForm").reset();
  //     swal("Login", "Login Successful", "success");
  //     setTimeout(() => {
  //       window.location.href = "social.html";
  //     }, 2000);
  //   } else {
  //     swal("Login Failed!", "Invalid email or password!", "error");
  //   }
  // }

  static async login(username, password) {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();

      const token = data.token;

      console.log(token, "T");

      // Use the token for further authentication or store it as needed
      localStorage.setItem("token", token);

      const userResponse = await fetch("https://dummyjson.com/users");

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const users = await userResponse.json();
      const userData = users.users;
      console.log(userData, "users");
      const user = userData.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        document.getElementById("loginForm").reset();
        localStorage.setItem("userid", user.id);
        localStorage.setItem("userImage", user.image);
        localStorage.setItem("userName", user.username);
        console.log(user.image, "img");
        console.log(user.username, "username");
        // console.log(user.id);
        swal("Login", "Login Successful", "success");
        setTimeout(() => {
          window.location.href = "social.html";
        }, 2000);
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      swal(
        "Login Failed!",
        "Something went wrong, please try again later",
        "error"
      );
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
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;
  Auth.login(username, password);
}
