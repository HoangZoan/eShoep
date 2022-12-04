"use strict";
import { getProductById, postNewCart } from "./scripts/api.js";
import { convertPrice, showToastMessage } from "./scripts/helper.js";

const productId = location.hash.slice(1);
let quantity = 1;
let productDetail;
const productTextContentEl = document.querySelector(
  ".product-detail-text-content"
);
const addToCartButtonEl = document.querySelector(".btn-primary");
const productTitleEl = document.querySelector(".product-detail-title");
const productImageEl = document.querySelector(".product-image");
const decreaseBtn = document.querySelector(".btn-secondary.decrement");
const increaseBtn = document.querySelector(".btn-secondary.increment");
const quantityEl = document.querySelector(".product-detail-quantity-number");

const renderProductDetail = (productData) => {
  productTitleEl.textContent = productData.title;
  productImageEl.innerHTML = `
    <img
      src="${productData.imageUrl}"
      alt="${productData.title}"
    />
  `;
  productTextContentEl.innerHTML = `
    <div class="product-detail-price-text">
      <b>Giá:</b>
      <span class="product-detail-price">
        ${convertPrice(productData.price)}đ
      </span>
    </div>
    <div>
      <b>Mô tả:</b>
      <span class="product-detail-description">${productData.description}</span>
    </div> 
  `;
};

const handleQuantityChange = () => {
  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityEl.textContent = quantity;
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity <= 1) return;

    quantity--;
    quantityEl.textContent = quantity;
  });
};

const handleAddProductToCart = () => {
  addToCartButtonEl.addEventListener("click", () => {
    const { id, ...rest } = productDetail;
    postNewCart({ ...rest, quantity });
    showToastMessage("Đã thêm sản phẩm vào giỏ ✅");
  });
};

getProductById(productId, (productData) => {
  productDetail = productData;
  renderProductDetail(productData);
});
handleQuantityChange();
handleAddProductToCart();
