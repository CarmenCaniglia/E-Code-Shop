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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWZjYzEzOWM0MzAwMTg4MTQ1NjUiLCJpYXQiOjE2OTcxODE2NDUsImV4cCI6MTY5ODM5MTI0NX0.RfB0VDiFd1RQa7EvGIN9EcNBq5lzXGtOecHMh6dq2Bs",
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
      class="w-100"
    />
    <h3 class="text-center mt-4">${details.name}</h3>
    <p>
      ${details.description}
    </p>
    <p>PREZZO ${details.price} €</p>
    <button class= "btn btn-danger" onclick="deleteProduct()">DELETE</button>
    <a class= "btn btn-success" id="editButton" href="./backoffice.html?productId=${details._id} ">EDIT</a>
  </div>`;
};

const getSingleProductDetails = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWZjYzEzOWM0MzAwMTg4MTQ1NjUiLCJpYXQiOjE2OTcxODE2NDUsImV4cCI6MTY5ODM5MTI0NX0.RfB0VDiFd1RQa7EvGIN9EcNBq5lzXGtOecHMh6dq2Bs",
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
