"use strict";

const products = [
  {
    id: "p-1",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/475e8817-2f2c-4c1d-993c-a8f678168142/nikecourt-vapor-lite-hard-court-tennis-shoes-rkl5kR.png",
    title: "NikeCourt Vapor Lite",
    price: 1000000,
    description: "This is a very good pair of Nike shoes",
  },
  {
    id: "p-2",
    imageUrl:
      "https://salt.tikicdn.com/cache/750x750/ts/product/35/f6/e5/74d77bef5efe83c559e3b1a2888109da.jpg.webp",
    title: "SKECHERS",
    price: 1190000,
    description: "Giày sneakers nam Elite Flex Prime 232212-LGBK",
  },
  {
    id: "p-3",
    imageUrl:
      "https://salt.tikicdn.com/cache/750x750/ts/product/01/0c/36/a1efbce047d9451d2b3418dbaa00f6e1.jpg.webp",
    title: "OEM ",
    price: 1190000,
    description:
      "Giày Nam, Giày Thể Thao Nam Cổ Thấp Phong Cách Hiện Đại, Phù Hợp Đi Học, Đi Chơi QA - 405",
  },
];

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
