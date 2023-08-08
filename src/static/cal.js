import {
  numInput,
  opInput,
  calculate,
  clear,
  lastInputCancel,
} from './cal_module.js'

import {
  showHistory,
  clearHistory,
} from './history_module.js'


////////////////////// 마우스 ////////////////////////////

// 숫자 버튼
document.querySelectorAll(".num_btn").forEach((butten) => {
  butten.addEventListener("click", (e) => {
    numInput(e.target.innerText);
  });
});

// 연산자
document.querySelectorAll(".op_btn").forEach((butten) => {
  butten.addEventListener("click", (e) => {
    opInput(e.target.innerText);
  });
});

// "=", Enter - 계산
document.querySelector("#equal").addEventListener("click", () => {
  calculate();
});

// Clear
document.querySelector("#clear").addEventListener("click", () => {
  clear();
});

// Backspace - 입력 취소
document.querySelector("#back").addEventListener("click", () => {
  lastInputCancel();
});


// 히스토리
document.querySelector("#history_btn").addEventListener("click", () => {
  showHistory();
})

// 히스토리 리셋
document.querySelector("#history_reset").addEventListener("click", () => {
  clearHistory();
})


/////////////////////// 키보드 ////////////////////////////

window.addEventListener("keydown", (event) => {
  event.preventDefault(); // 기본 동작 취소
  const key_name = event.key; // string
  keydownFun(key_name);
});

// 키보드 입력
function keydownFun(key_name) {
  switch (key_name) {
    case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
      numInput(key_name);
      break;

    case "+": case "-": case "*": case "/":
      opInput(key_name);
      break;

    case "Enter":
      calculate();
      break;

    case "Backspace":
      lastInputCancel();
      break;
  }
}