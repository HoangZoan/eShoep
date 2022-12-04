"use strict";
import { postNewProduct } from "./scripts/api.js";
import { showToastMessage } from "./scripts/helper.js";

const formEl = document.querySelector(".add-product-form");

function showErrorMessage(inputName) {
  const messageEl = formEl.querySelector("#" + inputName + "~ .error");
  messageEl.classList.remove("hidden");
}

function clearErrorMessages() {
  const errorMsgEls = document.querySelectorAll(".input-wrapper .error");
  errorMsgEls.forEach((el) => el.classList.add("hidden"));
}

formEl.onsubmit = function (event) {
  event.preventDefault();

  const formData = [...new FormData(formEl)];
  const { title, imageUrl, price, description } = Object.fromEntries(formData);
  let formIsValid = true;

  if (title.trim() === "") {
    showErrorMessage("title");
    formIsValid = false;
  }

  if (imageUrl.trim() === "") {
    showErrorMessage("imageUrl");
    formIsValid = false;
  }

  if (price.trim() === "" || !Number(price)) {
    showErrorMessage("price");
    formIsValid = false;
  }

  if (description.trim() === "") {
    showErrorMessage("description");
    formIsValid = false;
  }

  if (formIsValid) {
    const newProduct = { title, imageUrl, price, description };
    postNewProduct(newProduct);
    clearErrorMessages();
    formEl.reset();
    showToastMessage("Đăng sản phẩm thành công ✅");
  }
};
