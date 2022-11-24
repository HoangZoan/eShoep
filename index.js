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

    const markup = `
            <li>
                <div class="product-image">
                    <img
                    src="${imageUrl}"
                    alt="${title}"
                    />
                </div>

                <div class="product-info">
                    <b>${title}</b>
                    <b>Price: ${price}</b>

                    <button class="btn-primary">Thêm vào giỏ</button>
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
