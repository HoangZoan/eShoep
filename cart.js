"use strict";
import { getAllProductsInCart } from "./scripts/api.js";
import { convertPrice } from "./scripts/helper.js";

const cartListEl = document.querySelector(".product-cart-list");
const receiptListEl = document.querySelector(".receipt-list");
const totalNumberEl = document.querySelector(".recepit-total .total-number");

const renderCartPage = (products) => {
  // In ra danh sách sản phẩm
  cartListEl.innerHTML = products
    .map(
      ({ title, quantity, price, imageUrl, id }) => `
        <li>
            <div class="product-cart-image">
                <img
                    src="${imageUrl}"
                    alt="${title}"
                />
            </div>

            <div class="product-cart-text-content">
                <h3>${title}</h3>
                <div><b>Giá:</b> ${convertPrice(price)}đ</div>
                <div><b>Số lượng:</b> ${quantity}</div>
            </div>

            <button class="delete-button" data-product-id="${id}">x</button>
        </li>
    `
    )
    .join("\n");

  // In ra danh sách phần đơn giá chi tiết trong tổng hóa đơn
  receiptListEl.innerHTML = products
    .map(
      ({ title, quantity, price }) => `
        <li>
            <span>- ${title} (SL: ${quantity})</span>
            <span>${convertPrice(quantity * price)}đ</span>
        </li>
    `
    )
    .join("\n");

  // In ra tổng số tiền
  totalNumberEl.textContent =
    convertPrice(
      products.reduce(
        (incre, { quantity, price }) => incre + quantity * price,
        0
      )
    ) + "đ";
};

getAllProductsInCart(renderCartPage);
