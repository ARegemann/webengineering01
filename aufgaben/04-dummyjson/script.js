
function getProduct() {
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(console.log);
}

function getAllProducts() {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(console.log);
}

function addProduct() {
    fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    title: 'Allianz Pencil',
  })
})
.then(res => res.json())
.then(console.log);
}

function modifyProduct() {
    fetch('https://dummyjson.com/products/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Huhahaha'
        })
      })
      .then(res => res.json())
      .then(console.log);
}

function deleteProduct() {
    fetch('https://dummyjson.com/products/1', {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log);
}

document.getElementById('getProductButton').addEventListener('click', getProduct);

document.getElementById('getAllProductsButton').addEventListener('click', getAllProducts);

document.getElementById('addProductButton').addEventListener('click', addProduct);

document.getElementById('modifyProductButton').addEventListener('click', modifyProduct);

document.getElementById('deleteProductButton').addEventListener('click', deleteProduct);
