"use strict";

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
    clearErrorMessages();

    const newId = "id-" + Date.now().toString().slice(-5);
    const newProduct = { id: newId, title, imageUrl, price, description };

    if (!localStorage.getItem("products")) {
      const productsList = [newProduct];
      localStorage.setItem("products", JSON.stringify(productsList));
    } else {
      const oldListJson = localStorage.getItem("products");
      const existingList = JSON.parse(oldListJson);
      existingList.push(newProduct);

      localStorage.setItem("products", JSON.stringify(existingList));
    }
  }
};
