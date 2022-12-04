"use strict";
import { convertPrice } from "./scripts/helper.js";
import { getAllProducts, updateProductList } from "./scripts/api.js";

const productsListEl = document.querySelector(".products-list");
let products;

// Hàm này sử dụng để tạo ra code HTML cho thẻ ul để in ra danh sách sản phẩm dựa theo
// tham số nhận vào là một mảng gồm các object chứa thông tin về sản phẩm.

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
                    <b>${title}</b>
                    <b>Price: ${convertPrice(price)}</b>

                    <div class="card-action">
                      <a href="./product-detail.html#${id}" target="_blank">
                        <button class="btn-primary">Xem chi tiết</button>
                      </a>
                      
                      <button class="btn-danger btn-delete" data-product-id="${id}">Xóa</button>
                    </div>
                </div>
            </li>
        `;
    result.push(markup);
  }

  return result.join("\n");
};

// Hàm này sử dụng để render ra code HTML ngoài giao diện trình duyệt, thông qua thuộc tính
// 'innerHTML' của thẻ 'ul' dựa theo dữ liệu sản phẩm nhận được. Trong logic hiện tại, thẻ
// 'ul' sẽ cần render khi trang mới được tải hoặc sau khi xóa sản phẩm cần cập nhật lại danh
// sách sản phẩm mới ở ngoài giao diện trình duyệt.
const handleRenderProducts = (productsData) => {
  productsListEl.innerHTML = generateProductsMarkup(productsData);
  products = productsData;
};

// Gọi hàm để fetch dữ liệu về danh sách sản phẩm. Hàm 'getAllProducts' được khai báo và
// import từ file 'scripts/api.js'.
getAllProducts(handleRenderProducts);

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

// LOGIC XÓA SẢN PHẨM
productsListEl.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".btn-delete");
  if (!deleteButton) return;

  // Bắt đầu từ đây...
  const isDeleting = confirm("Bạn muốn xóa sản phẩm này?");

  if (!isDeleting) return;

  const prodId = deleteButton.dataset.productId;
  const newProductsList = products.filter(({ id }) => {
    return id !== prodId;
  });

  // Sau khi lấy được danh sách sản phẩm mới đã loại đi sản phẩm cần xóa, gọi hàm
  // 'updateProductList' (import từ 'scripts/api.js'). Để gọi API với phương thức
  // PUT để cập nhật danh sách sản phẩm mới lên database.
  updateProductList(newProductsList, handleRenderProducts);
});
