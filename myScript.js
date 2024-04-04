class ProductManager {
  constructor() {
    this.productList = JSON.parse(localStorage.getItem("productList")) || [];
  }

  // Add Product
  addProduct(name, price) {
    if (name.trim() === "" || price.trim() === "") {
      swal("Please enter both product name and price.");
      return;
    }

    this.productList.push({ name, price });
    this.saveProducts();
    this.displayProducts();
    swal("Good job!", "Product Successfully Added!", "success");
  }

  // Display Product
  displayProducts() {
    var html = "";
    this.productList.forEach((element, index) => {
      html += "<tr>";
      html += `<td>${element.name}</td>`;
      html += `<td>${element.price}</td>`;
      html += `<td>
        <button onclick="productManager.deleteProduct(${index})" class="btn btn-delete">Delete</button>
        <button onclick="productManager.updateProduct(${index})" class="btn btn-edit">Edit</button>
      </td>`;
      html += "</tr>";
    });
    document.querySelector("#productTable tbody").innerHTML = html;
  }

  deleteProduct(index) {
    this.productList.splice(index, 1);
    this.saveProducts();
    this.displayProducts();
    swal("Delete", "Product Successfully Deleted!", "warning");
  }

  // Update/Edit Product
  updateProduct(index) {
    const product = this.productList[index];
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    document.getElementById("Update").onclick = () => {
      product.name = document.getElementById("productName").value;
      product.price = document.getElementById("productPrice").value;
      this.saveProducts();
      this.displayProducts();
      this.resetForm();
      swal("Good Job!", "Product Successfully Updated!", "success");
    };
  }

  resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
  }

  saveProducts() {
    localStorage.setItem("productList", JSON.stringify(this.productList));
  }
}

const productManager = new ProductManager();

function handleProductUpdate(e) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  productManager.addProduct(productName, productPrice);
}

productManager.displayProducts();

function logout() {
  swal("Logout!", "You have been successfully Logged Out!", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}
