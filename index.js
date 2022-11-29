"use strict";

const localProducts = localStorage.getItem("products");
const products = JSON.parse(localProducts);

const productsListEl = document.querySelector(".products-list");

// CÁCH 1: SỬ DỤNG VÒNG LẶP FOR
const generateProductsMarkup = (productsData) => {
  const result = [];

  for (let i = 0; i < productsData.length; i++) {
    const imageUrl = productsData[i].imageUrl;
    const title = productsData[i].title;
    const price = productsData[i].price;
    const id = productsData[i].id;

    const markup = `
            <li>
                <div class="product-image">
                    <img
                    src="${imageUrl}"
                    alt="${title}"
                    />
                </div>

                <div class="product-info">
                    <a href="./product-detail.html#${id}" target="_blank">
                      <b>${title}</b>
                    </a>
                    <b>Price: ${price}</b>

                    <div class="card-action">
                      <button class="btn-primary">Thêm vào giỏ</button>
                      <button class="btn-danger btn-delete" data-product-id="${id}">Xóa</button>
                    </div>
                </div>
            </li>
        `;
    result.push(markup);
  }

  return result.join("\n");
};

// CÁCH 2: SỬ DỤNG PHƯƠNG THỨC LẶP CỦA MẢNG
// const generateProductsMarkup = (productsData) => {
//   return productsData
//     .map((prodData) => {
//       return `
//         <li>
//             <div class="product-image">
//                 <img
//                 src="${prodData.imageUrl}"
//                 alt="${prodData.title}"
//                 />
//             </div>

//             <div class="product-info">
//                 <b>${prodData.title}</b>
//                 <b>Price: ${prodData.price}</b>

//                 <button class="btn-primary">Thêm vào giỏ</button>
//             </div>
//         </li>
//     `;
//     })
//     .join("\n");
// };

productsListEl.innerHTML = generateProductsMarkup(products);

// LOGIC XÓA SẢN PHẨM
productsListEl.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".btn-delete");
  if (!deleteButton) return;

  // BAT DAU TU DAY...
  const prodId = deleteButton.dataset.productId;
  const newProductsList = products.filter(({ id }) => {
    return id !== prodId;
  });
  const newProductsListJson = JSON.stringify(newProductsList);

  localStorage.setItem("products", newProductsListJson);
  location.reload();
});
