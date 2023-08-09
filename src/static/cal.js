import {
  inputNum,
  inputOperator,
  calculate,
  stateClear,
  backspace,
} from './cal_module.js'

import {
  showHistory,
  clearHistory,
} from './history_module.js'


////////////////////// 마우스 ////////////////////////////

// 숫자 버튼
document.querySelectorAll(".num_btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputNum(e.target.innerText);
  });
});

// 연산자
document.querySelectorAll(".op_btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputOperator(e.target.innerText);
  });
});

// "=" 버튼, Enter 키
document.querySelector("#equal").addEventListener("click", () => {
  calculate();
});

// "Clear" 버튼
document.querySelector("#clear").addEventListener("click", () => {
  stateClear();
});

// "Backspace" 버튼, 키
document.querySelector("#back").addEventListener("click", () => {
  backspace();
});


// 히스토리 보기
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
  const keyName = event.key; // string
  pressKey(keyName);
});

function pressKey(keyName) {
  switch (keyName) {
    case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ".":
      inputNum(keyName);
      break;

    case "+": case "-": case "*": case "/":
      inputOperator(keyName);
      break;

    case "Enter":
      calculate();
      break;

    case "Backspace":
      backspace();
      break;
  }
}