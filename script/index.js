// creo le card
const renderProducts = function (arrayOfProducts) {
  const row = document.getElementById("products-row");
  arrayOfProducts.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3", "mb-3");
    newCol.innerHTML = `
        <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top" alt="Product image">
            <div class="card-body d-flex flex-column justify-content-end">
                <h5 class="card-title">${product.name} </h5>
                <p class="card-text">Marca: ${product.brand} </p>
                <p class="card-text">Prezzo: ${product.price}€</p>
                <a href="./detail.html?productId=${product._id} " class="btn btn-primary">MORE INFO</a>
            </div>
        </div>
        `;
    row.appendChild(newCol);
  });
};

const hideSpinner = function () {
  // nascondo lo spinner
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getProducts = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZWZjYzEzOWM0MzAwMTg4MTQ1NjUiLCJpYXQiOjE2OTcxODE2NDUsImV4cCI6MTY5ODM5MTI0NX0.RfB0VDiFd1RQa7EvGIN9EcNBq5lzXGtOecHMh6dq2Bs",
    },
  })
    .then((res) => {
      hideSpinner();
      console.log("response", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Generical Error!");
      }
    })
    .then((products) => {
      console.log("PRODOTTI", products);

      //   ora creo le card con i prodotti
      renderProducts(products);
    })
    .catch((err) => {
      hideSpinner();
      console.log("Error", err);
    });
};
getProducts();

const searchForm = document.getElementById("custom-search");
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const searchBar = document.getElementById("search-field");
  const searchValue = searchBar.value;
  getProducts(searchValue);
});
