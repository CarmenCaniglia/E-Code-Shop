// operazioni modifica
const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE3MTEzODA5NjQsImV4cCI6MTcxMjU5MDU2NH0.Sir8TZ9vzkHk34iB0vW7pg1GPM8yJQx5dSoWLOELd3Y",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore reucpero DETAILS");
      }
    })
    .then((productDetails) => {
      // riprendo i dati del form
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imgInput = document.getElementById("img");
      const priceInput = document.getElementById("price");
      // dettagli dei prodotti
      nameInput.value = productDetails.name;
      descriptionInput.value = productDetails.description;
      brandInput.value = productDetails.brand;
      imgInput.value = productDetails.imageUrl;
      priceInput.value = productDetails.price;
    })
    .catch((err) => {
      console.log("Error", err);
    });
}

// riferimento al form
const formReference = document.getElementById("form");
formReference.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("invia dati a API");

  //   creo l'oggetto
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imgInput = document.getElementById("img");
  const priceInput = document.getElementById("price");

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
  };
  console.log("oggetto nella API", newProduct);

  //   creo le variabili per differenziare le azioni di post e put
  let methodToUse = "POST";
  if (productId) {
    methodToUse = "PUT";
  }
  let urlToUse = "https://striveschool-api.herokuapp.com/api/product/";
  if (productId) {
    urlToUse =
      "https://striveschool-api.herokuapp.com/api/product/" + productId;
  }
  // alla fine sostituisco l'url e il method della fetch con le nuove variabili
  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE3MTEzODA5NjQsImV4cCI6MTcxMjU5MDU2NH0.Sir8TZ9vzkHk34iB0vW7pg1GPM8yJQx5dSoWLOELd3Y",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log("risposta alla get", res);
      if (res.ok) {
        alert("Prodotto salvato correttamente!");
      } else {
        alert("Errore nel salvataggio!!!");
        throw new Error("Errore nella POST");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
});
