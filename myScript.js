const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// Signup Form Submission

function signup(e) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (localStorage.getItem(email)) {
    document.getElementById("signupError").textContent =
      "Email already exsists";
  } else {
    localStorage.setItem(
      email,
      JSON.stringify({ email: email, password: password })
    );
    alert("Signup Successful! Please Login");
    signupForm.reset();
    window.location.href = "login.html";
  }
}

//Login Form Submission

function login(e) {
  event.preventDefault();
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  const userData = JSON.parse(localStorage.getItem(email));

  if (userData && userData.password === password) {
    alert("Login successful!");
    loginForm.reset();
    window.location.href = "products.html";
  } else {
    document.getElementById("loginError").textContent =
      "Invalid email or password";
  }
}

// Add Data
function addData(e) {
  event.preventDefault();
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;

  let newProduct = {
    name: productName,
    price: productPrice,
  };
  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  productList.push(newProduct);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayData();
}

// Display Data

function displayData() {
  let productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  var html = "";

  productList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.price + "</td>";
    html += `<td>
    <button onclick="deleteData(${index})" class="btn btn-delete">Delete</button>
    <button onclick="updateData(${index})" class="btn btn-edit">Edit</button>
  </td>`;

    html += "</tr>";
  });
  document.querySelector("#productTable tbody").innerHTML = html;
}

document.onload = displayData();

// Delete Data

function deleteData(index) {
  var productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayData();
}

// Update/Edit Data

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  document.getElementById("productName").value = productList[index].name;
  document.getElementById("productPrice").value = productList[index].price;

  document.getElementById("Update").onclick = function () {
    productList[index].name = document.getElementById("productName").value;
    productList[index].price = document.getElementById("productPrice").value;
    localStorage.setItem("productList", JSON.stringify(productList));
    displayData();
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
  };
}
