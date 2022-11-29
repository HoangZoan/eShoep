"use strict";

const decreaseBtn = document.querySelector(".btn-secondary.decrement");
const increaseBtn = document.querySelector(".btn-secondary.increment");
const quantityEl = document.querySelector(".product-detail-quantity-number");

let quantity = 1;

increaseBtn.addEventListener("click", () => {
  quantity++;
  quantityEl.textContent = quantity;
});

decreaseBtn.addEventListener("click", () => {
  if (quantity <= 1) return;

  quantity--;
  quantityEl.textContent = quantity;
});
console.log(location.hash);
