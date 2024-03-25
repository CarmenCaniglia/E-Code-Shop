const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
console.log(productId);

const deleteProduct = function () {
  const confirmDelete = confirm("Sei sicuro di voler eliminare il prodotto?");
  if (confirmDelete) {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE3MTEzODA5NjQsImV4cCI6MTcxMjU5MDU2NH0.Sir8TZ9vzkHk34iB0vW7pg1GPM8yJQx5dSoWLOELd3Y",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Prodotto eliminato!");
          location.assign("./index.html");
        } else {
          alert("OPS...qualcosa è andato storto!");
          throw new Error("Errore nella DELETE");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
};

const generateProductDetails = function (details) {
  const row = document.getElementById("products-details");
  row.innerHTML = `<div class="col col-12 col-lg-6">
    <h2 class="text-center">DETTAGLI PRODOTTO</h2>
    <img
      src=" ${details.imageUrl}"
      class="w-100 my-2"
    />
    <h3 class="text-center mt-4">${details.name}</h3>
    <p>
      ${details.description}
    </p>
    <p>PREZZO ${details.price} €</p>
    <button class= "btn btn-danger mb-3" onclick="deleteProduct()">DELETE</button>
    <a class= "btn btn-success mb-3" id="editButton" href="./backoffice.html?productId=${details._id} ">EDIT</a>
  </div>`;
};

const getSingleProductDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE3MTEzODA5NjQsImV4cCI6MTcxMjU5MDU2NH0.Sir8TZ9vzkHk34iB0vW7pg1GPM8yJQx5dSoWLOELd3Y",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((productData) => {
      generateProductDetails(productData);
    })

    .catch((err) => console.log("Error", err));
};

getSingleProductDetails();
