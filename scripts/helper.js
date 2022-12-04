// ĐỔI DẠNG SỐ THÀNH DẠNG TIỀN TỆ (CÁCH 1)
export const convertPrice = (num) => {
  const resultArr = [];
  let str = num.toString();
  const loopCount = Math.ceil(str.length / 3);

  for (let i = 1; i <= loopCount; i++) {
    const part = i === loopCount ? str : str.slice(-3);
    resultArr.unshift(part);

    if (i < loopCount) {
      str = str.slice(0, -3);
    }
  }

  return resultArr.join(".");
};

// ĐỔI DẠNG SỐ THÀNH DẠNG TIỀN TỆ (CÁCH 2)
// const convertPrice2 = (num) => {
//   const strArr = num.toString().split("");
//   let str = "";

//   for (let i = strArr.length - 1; i >= 0; i--) {
//     if ((strArr.length - i) % 3 === 0) {
//       str = i === 0 ? strArr[i] + str : "." + strArr[i] + str;
//     } else {
//       str = strArr[i] + str;
//     }
//   }

//   return str;
// };

export function showToastMessage(message) {
  const toastEl = document.querySelector(".toast-message");

  toastEl.textContent = message;
  toastEl.classList.toggle("active");

  setTimeout(() => {
    toastEl.classList.toggle("active");
  }, 2000);
}
