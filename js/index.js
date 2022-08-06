// ITERATION 1

function updateSubtotal(product) {

  const price = product.querySelector('.price > span').innerHTML;
  const quantity = product.querySelector('.quantity input').value;

  let subtotalPrice = (price * quantity).toFixed(2);
  const subtotal = product.querySelector('.subtotal > span');
  subtotal.innerHTML =  subtotalPrice;

  return parseFloat(subtotalPrice);
}

function calculateAll() {

  const products = document.getElementsByClassName('product');
  const totalPrice = [...products].reduce(
    (sum, subtotal) => sum + updateSubtotal(subtotal), 
    0
  );

  const total = document.querySelector('#total-value > span');
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

  const productTxt = document.querySelector('.create-product input[type="text"]');
  const productNum = document.querySelector('.create-product input[type="number"]');

  const product = {
    nameElement: productTxt,
    priceElement: productNum,
    nameValue: productTxt.value,
    priceValue: Number(productNum.value)
  };

  if (productValuesAreValid(product)) {
    addNewProductRow(product);
    clearNewProductFields(product);
  }
}

function productValuesAreValid(product) {

  if(product.nameValue.length === 0) {
    alert('Product name is required!');
    product.nameElement.focus();
    return false;
  }

  if(product.priceValue === 0) {
    alert('Product price has to be greater than cero!');
    product.priceElement.focus();
    return false;
  }

  return true;
}

function clearNewProductFields(product) {

  product.nameElement.value = '';
  product.priceElement.value = 0;
}

function addProductToCart(product) {

  const cartTableBodyElement = document.querySelector('#cart tbody');
  cartTableBodyElement.insertAdjacentHTML("afterend",`
    <tr class="product">
      <td class="name">
        <span>${product.nameValuee}</span>
      </td>
      <td class="price">$<span>${product.priceValue.toFixed(2)}</span></td>
      <td class="quantity">
        <input type="number" value="0" min="0" placeholder="Quantity" />
      </td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action">
        <button class="btn btn-remove">Remove</button>
      </td>
    </tr>
  `);

  const lastRemoveBtn = Array.from(
    document.getElementsByClassName('btn-remove')
  ).pop();
  lastRemoveBtn.addEventListener('click', removeProduct);
}

function addNewProductRow(product) {

  const tbody = document.querySelector('#cart tbody');

  let tr = document.createElement("tr");
  tr.className = 'product';

  let tdName = createTDName(product.nameValue);
  let tdPrice = createTDPrice(product.priceValue);
  let tdQuantity = createTDQuantity();
  let tdSubtotal = createTDSubtotal();
  let tdRemoveBtn = createTDRemoveBtn();

  tr.appendChild(tdName);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdSubtotal);
  tr.appendChild(tdRemoveBtn);

  tbody.appendChild(tr);
}

function createTDName(productName) {

  let tdName = document.createElement("td");
  tdName.className = 'name';

  let tdNameSpan = document.createElement("span");
  tdNameSpan.innerHTML = productName;

  tdName.appendChild(tdNameSpan);

  return tdName;
}

function createTDPrice(productPrice) {

  let tdPrice = document.createElement("td");
  tdPrice.className = 'price';
  tdPrice.innerHTML = '$';

  let tdPriceSpan = document.createElement("span");
  tdPriceSpan.innerHTML = productPrice.toFixed(2);

  tdPrice.appendChild(tdPriceSpan);

  return tdPrice;
}

function createTDQuantity() {

  let tdQuantity = document.createElement("td");
  tdQuantity.className = 'quantity';

  let tdQuantityInput = document.createElement("input");
  tdQuantityInput.type = 'number';
  tdQuantityInput.value = 0;
  tdQuantityInput.min = 0;
  tdQuantityInput.placeholder = 'Quantity';

  tdQuantity.appendChild(tdQuantityInput);

  return tdQuantity;
}

function createTDRemoveBtn() {

  let tdAction = document.createElement("td");
  tdAction.className = 'action';

  let tdRemoveBtn = document.createElement("button");
  tdRemoveBtn.className = 'btn btn-remove';
  tdRemoveBtn.innerHTML = 'Remove';
  tdRemoveBtn.addEventListener('click', removeProduct);

  tdAction.appendChild(tdRemoveBtn);

  return tdAction;
}

function createTDSubtotal() {

  let tdSubtotal = document.createElement("td");
  tdSubtotal.className = 'subtotal';
  tdSubtotal.innerHTML = '$';

  let tdSubtotalSpan = document.createElement("span");
  tdSubtotalSpan.innerHTML = 0;

  tdSubtotal.appendChild(tdSubtotalSpan);

  return tdSubtotal;
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeProductBtn = document.getElementsByClassName('btn-remove');
  [...removeProductBtn].forEach(btn => btn.addEventListener('click', removeProduct));

  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);
});
