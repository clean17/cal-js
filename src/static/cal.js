import {
  changePreNum,
  changeNextNum,
  changePreNumLength,
  changeNextNumLength,
  changeOperation,
  changeOpBool,
  getPreNum,
  getNextNum,
  getDelayTime,
  getNextNumLength,
  getOpBool,
  getOperation,
  afterCalState,
  stateClear,
} from './cal_module.js'


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
  lastInputCancel(getOpBool());
});


/////////////////////// 키보드 ////////////////////////////
window.addEventListener("keydown", (event) => {
  // 기본 동작 취소 - 마우스 클릭하고 엔터를 누르면 마지막으로 클릭한 버튼 입력 방지
  event.preventDefault();
  const key_name = event.key; // string
  keydownFun(key_name);
});

// 계산 트리거
function calculate() {
  const all_btn = document.querySelectorAll("button");
  btnBlock(all_btn, "none"); // 버튼 비활성화
  if (getNextNum() !== "") {
    setTimeout(() => {
      loadCal();
    }, getDelayTime());
  } else {
    btnBlock(all_btn, "auto"); // 버튼 활성화
  }
}

// 버튼 활성화 / 비활성화
function btnBlock(btn, opt) {
  // css - 계산중 표시하기
  const loading = document.querySelector("#loading")
  btn.forEach((e) => {
    e.style["pointer-events"] = opt;
  });
  // opt === "auto" ? loading.style["visibility"] = "hidden" : loading.style["visibility"] = "visible";
  opt === "auto" ? loading.style["display"] = "none" : loading.style["display"] = "block";
}

// 계산 함수 호출
function loadCal() {
  const result = document.querySelector("#result");
  const all_btn = document.querySelectorAll("button");
  result.innerText = numCalculate(getPreNum(), getOperation(), getNextNum());
  btnBlock(all_btn, "auto"); // 계산 후 버튼 활성화
  afterCal();
}

// 입력된 숫자 저장
function numInput(btn) {
  const result = document.querySelector("#result");
  result.innerText += btn;
  if (getOpBool()) {
    changeNextNum(getNextNum() + btn);
    changeNextNumLength(1);
  } else {
    changePreNum(getPreNum() + btn);
    changePreNumLength(1);
  }
}

// 연산자 저장
function opInput(btn) {
  const result = document.querySelector("#result");
  changeOperation(btn);
  if (getOpBool()) { // 두번째부터
    result.innerText = result.innerText.slice(0, -1) + btn;
    return;
  }
  result.innerText += btn;
  changeOpBool(true);
}

// 숫자 계산
function numCalculate(numA, operation, numB) {
  let cal_result;
  switch (operation) {
    case "/":
      cal_result = Number(numA) / Number(numB);
      break;
    case "*":
      cal_result = Number(numA) * Number(numB);
      break;
    case "-":
      cal_result = Number(numA) - Number(numB);
      break;
    case "+":
      cal_result = Number(numA) + Number(numB);
      break;
  }
  return Number(cal_result.toFixed(2));
}

// 마지막 입력 취소
function lastInputCancel(bool) {
  const result = document.querySelector("#result");
  result.innerText = result.innerText.slice(0, -1);

  // 연산자가 마지막 입력일 경우
  if (bool && getNextNumLength() === 0) {
    changeOpBool(false);
    changeOperation("");

    // 두번째 숫자 취소
  } else if (bool && getNextNumLength() > 0) {
    changeNextNum(getNextNum().slice(0, -1));
    changeNextNumLength(-1);

    // 첫번째 숫자 취소
  } else {
    changePreNum(getPreNum().slice(0, -1));
    changePreNumLength(-1);
  }
}

// 계산 후 상태 관리
function afterCal() {
  const result = document.querySelector("#result");
  afterCalState(result.innerText, result.innerText.length)
}

// 모든 상태 초기화
function clear() {
  const result = document.querySelector("#result");
  result.innerText = "";
  stateClear()
}

// 키보드 입력, 마우스와 동일한 함수 호출
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
      lastInputCancel(getOpBool());
      break;
  }
}