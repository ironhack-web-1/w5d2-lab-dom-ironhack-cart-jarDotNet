// ITERATION 1

function updateSubtotal(product) {

  const price = product.querySelector('.price span').innerHTML;
  const quantity = product.querySelector('.quantity input').value;

  let subtotalPrice = (price * quantity).toFixed(2);
  const subtotal = product.querySelector('.subtotal span');
  subtotal.innerHTML =  subtotalPrice;

  return parseFloat(subtotalPrice);
}

function calculateAll() {

  const products = document.getElementsByClassName('product');
  const totalPrice = [...products]
    .map(product => updateSubtotal(product))
    .reduce((sum, subtotal) => sum + subtotal, 0)
    .toFixed(2);

  const total = document.querySelector('#total-value span');
  total.innerHTML = totalPrice;
}

// ITERATION 4

function removeProduct(event) {

  const target = event.currentTarget;
  const td = target.parentNode;
  const tr = td.parentNode;
  const tbody = tr.parentNode;
  tbody.removeChild(tr);
  calculateAll();
}

// ITERATION 5

function createProduct() {
  /*
  const productName = document.querySelector('.create-product input [type="text"]').value;
  const productPrice = document.querySelector('.create-product input [type="number"]').value;
  alert(productName + " - " + productPrice);
  */
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeProductBtn = document.getElementsByClassName('btn-remove');
  //const removeProductBtn = document.querySelectorAll('td button');
  [...removeProductBtn].forEach(btn => btn.addEventListener('click', removeProduct));

  /*
  const removeBtns = document.querySelectorAll('.btn-remove');
  for (let removeBtn of removeBtns) {
    removeBtn.addEventListener('click', removeProduct);
  }

  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);  */
});
