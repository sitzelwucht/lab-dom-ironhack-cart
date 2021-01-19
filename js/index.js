// ITERATION 1

function updateSubtotal(product, i) {

  let price = document.querySelectorAll('.price span')[i]
  let quantity = document.querySelectorAll('.quantity input')[i]

  let priceVal = Number(price.innerHTML)
  let quantityNum = quantity.value
 
  let subTotal = quantityNum * priceVal
  document.querySelectorAll('.subtotal span')[i].innerHTML = subTotal
  
  return subTotal

}

function calculateAll() {

  // ITERATION 2
  let total = 0;
  let products = document.querySelectorAll('.product')
  
  for(let i = 0; i < products.length; i++) {
    total += updateSubtotal(products[i], i)
  }

  document.querySelector('#total-value span').innerHTML = total
  
  return total

}

// ITERATION 4
function removeProduct(event) {
  const target = event.currentTarget;
  let lvl1parent = target.parentNode
  let lvl2parent = lvl1parent.parentNode
  lvl2parent.parentNode.removeChild(lvl2parent);
}

// ITERATION 5

function createProduct() {

  let prodName = document.querySelectorAll('.create-product input')[0]
  let prodPrice = document.querySelectorAll('.create-product input')[1]

  if(!prodName.value || prodPrice.value == 0) {
    alert('Please enter product name and price')
    return
  }

  let tbody = document.querySelector('tbody')
  let rowCount = tbody.children.length
  let row = tbody.insertRow(rowCount)
  row.setAttribute('class', 'product')

  let name = row.insertCell(0)
  name.setAttribute('class', 'name')
  name.innerHTML = prodName.value

  let price = row.insertCell(1)
  price.setAttribute('class', 'price')
  price.innerHTML = `<td class="price">$<span>${prodPrice.value}.00</span></td>`

  let quantity = row.insertCell(2)
  quantity.setAttribute('class', 'quantity')
  quantity.innerHTML = '<input type="number" value="0" min="0" placeholder="Quantity" />'

  let sub = row.insertCell(3)
  sub.setAttribute('class', 'subtotal')
  sub.innerHTML = '$<span>0</span>'

  let del = row.insertCell(4)
  del.setAttribute('class', 'action')

  // removal button for dynamically created products w/ event listener
  let delBtn = document.createElement('button')
  delBtn.setAttribute('class', 'btn btn-remove')
  delBtn.innerText = 'Remove'
  del.appendChild(delBtn)
  delBtn.addEventListener('click', removeProduct)


  prodName.value = ''
  prodPrice.value = ''
}

function newProdClickHandler() {
  document.querySelector('#create').addEventListener('click', createProduct)
}

// duplicate event listener for non-dynamically created removal buttons (couldn't get it to work else...)
function removalClickHandler() {
  let delBtns = document.querySelectorAll('.btn-remove')

    for (let i = 0; i < delBtns.length; i++) {
      delBtns[i].addEventListener('click', removeProduct)
    }

}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
  newProdClickHandler()
  removalClickHandler()

});
