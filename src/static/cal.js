// import {
//   inputNum,
//   inputOperator,
//   calculate,
//   stateClear,
//   backspace,
// } from './cal_module.js'

// import {
//   showHistory,
//   clearHistory,
// } from './history_module.js'

// type="module" 은 defer 속성을 가짐

// DOMContentLoaded - html 구문분석 완료 후 지연된 스크립트 실행될 때 이벤트 발생
// defer 실행 직후 DOMContentLoaded 이벤트 발생

document.addEventListener("DOMContentLoaded", () => {
  try {
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
    document.getElementById("equal").addEventListener("click", () => {
      calculate();
    });

    // "Clear" 버튼
    document.getElementById("clear").addEventListener("click", () => {
      stateClear();
    });

    // "Backspace" 버튼, 키
    document.getElementById("back").addEventListener("click", () => {
      backspace();
    });


    // 히스토리 보기
    document.getElementById("history_btn").addEventListener("click", () => {
      showHistory();
    })

    // 히스토리 리셋
    document.getElementById("history_reset").addEventListener("click", () => {
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
  } catch (error) {
    alert(error);
  }
});




////////////////////////////////// cal_module 복사




// 초기 상태 세팅
/* 입력 취소 및 소수점 취소의 편의를 위해 string으로 저장 */
const calState = {
  preNum: "",
  nextNum: "",
  operator: "",
  checkOperator: false,
};



// 숫자 저장
function inputNum(num) {
  if (typeof num !== 'string' || num === undefined || num === "") {
    console.log('string 타입의 숫자만 입력 가능합니다.');
    throw new Error('"0 ~ 9" 버튼이나 키보드의 숫자 키로 입력하세요.');
  };
  const tempNum = Math.abs(Number(num));
  if (!(tempNum <= 9) || tempNum === NaN) {
    console.log('숫자를 입력하세요.');
    throw new Error('입력한 값이 숫자가 아닙니다.');
  }

  document.getElementById("result").innerText += num; // 뷰

  // 연산자 입력 여부 -> 첫번째(x) / 두번째(o) 저장
  calState.checkOperator ? calState.nextNum += num : calState.preNum += num;
}



// 연산자 저장
function inputOperator(op) {
  if (typeof op !== 'string' || op === undefined || op === "") {
    console.log('string 타입의 연산자만 입력 가능합니다.');
    throw new Error('" + ", " - ", " * ", " / " 버튼이나 키보드의 연산 키로 입력하세요.');
  };
  if (!(op === "+" || op === "-" || op === "*" || op === "/")) {
    console.log('연산자 기호만 입력해야 합니다.');
    throw new Error('연산자 기호만 입력 가능합니다.');
  }

  // 연산자 저장
  calState.operator = op;
  const result = document.getElementById("result");

  // 연산자를 연속으로 입력 시 마지막 연산자만 유효
  result.innerText = calState.checkOperator ?
    result.innerText.slice(0, -1) + op : result.innerText += op; // 뷰

  calState.checkOperator = true;
}



// 계산 트리거 ("=" 버튼이나 "Enter" 키 입력 시)
async function calculate() {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  // 연산자 입력 후 두번째 숫자를 입력했을 경우에만 계산
  if (calState.nextNum !== "") {
    btnOff();
    rotateAnimation(1000)
    await wait(1000);
    startCalculate();
  }
}



function btnOff() {
  document.querySelectorAll("button")
    .forEach((btn) => {
      btn.disabled = true;
    });
  document.getElementById("loading").style.display = "block";
}



function btnOn() {
  document.querySelectorAll("button")
    .forEach((btn) => {
      btn.disabled = false;
    });
  document.getElementById("loading").style.display = "none";
}



// 계산 함수 호출
function startCalculate() {
  // 계산 결과
  const calResult = numCalculate(calState.preNum, calState.operator, calState.nextNum); // ex) 3 + 6

  if (isNaN(calResult) || calResult === undefined) {
    stateClear();
    alert('계산식이 올바르지 않습니다.');
    return;
  }
  document.getElementById("result").innerText = calResult; // 뷰

  // 히스토리 저장 후 갱신
  inputHistory(calState.preNum, calState.operator, calState.nextNum, calResult); // '3 + 6 = 9' 저장
  getHistory();

  // 계산 후 버튼 활성화, 상태 관리
  setState(calResult);
  btnOn();
}



// 계산 후 상태
function setState(result) {
  calState.preNum = result;
  calState.nextNum = "";
  calState.operator = "";
  calState.checkOperator = false;
};



// 모든 상태 초기화
function stateClear() {
  document.getElementById("result").innerText = ""; // 뷰
  calState.preNum = "";
  calState.nextNum = "";
  calState.operator = "";
  calState.checkOperator = false;
}



// 숫자 계산
function numCalculate(numA, operation, numB) {
  let result;
  switch (operation) {
    case "/":
      result = Number(numA) / Number(numB);
      break;
    case "*":
      result = Number(numA) * Number(numB);
      break;
    case "-":
      result = Number(numA) - Number(numB);
      break;
    case "+":
      result = Number(numA) + Number(numB);
      break;
  }
  return parseFloat(result.toFixed(2));
}



// 마지막 입력 취소
function backspace() {
  document.getElementById("result").innerText = result.innerText.slice(0, -1); // 뷰

  // 연산자가 마지막 입력일 경우
  if (calState.operator && calState.nextNum.length === 0) {
    calState.checkOperator = false;
    calState.operator = "";

    // 두번째 숫자가 마지막 입력일 경우
  } else if (calState.operator && calState.nextNum.length > 0) {
    calState.nextNum = calState.nextNum.slice(0, -1);

    // 첫번째 숫자가 마지막 입력일 경우
  } else {
    calState.preNum = calState.preNum.slice(0, -1);
  }
}



// 로딩 이미지 회전
function rotateAnimation(ms) {
  const range = [
    { transform: "rotate(0) scale(1)" },
    { transform: "rotate(720deg) scale(1)" },
  ];
  const time = {
    duration: ms,
    iterations: Infinity, // 반복횟수
    fill: "none", // 효과 중지
  };
  document.getElementById("loading").animate(range, time);
}




///////////////////////////////// history_module 복사





const myHistory = {
  prekey: "randomUser_",
  localSessionNum: 0,
}



function showHistory() {
  const history = document.getElementById("history_list");
  const reset = document.getElementById("history_reset");

  if (history.style.display === "block") {
    history.style.display = "none";
    reset.style.display = "none";
  } else {
    history.style.display = "block";
    reset.style.display = "block";
    getHistory();
  }
}



async function getHistory() {
  const history = document.getElementById("history_list");
  history.innerHTML = "";

  await createLocalSession();

  const localSession = myHistory.prekey + myHistory.localSessionNum;
  try {
    alert('히스토리 갱신을 위해 유저 조회 때림');
    await fetch(`http://localhost:3000/cal?username=${localSession}`)
    .then((res) => res.json())  // Promise 반환 , {} 안에 넣으면 return 필요
    .then((res) => {
      for (let index = 0; index < res.length; index++) {
        const li = document.createElement("li");
        li.textContent = `${res[index].data} \n`;
        history.append(li);
      }
    });
  } catch (error) {
    console.log("Error : ", error);
  }
}



async function createLocalSession() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); // 인덱스 키

    // 계산기 이용한적 있음 -> randomUser_ 로 시작하는 키 찾기
    if (key.startsWith(myHistory.prekey)) {
      myHistory.localSessionNum = localStorage.getItem(key);
      alert('로컬 세션 찾음');
      return;
    }
  }

  // 한번도 계산기 이용한 적이 없으면
  if (myHistory.localSessionNum === 0) {
    try {
      alert('유저 생성 할거야');
      await fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((res) => {
        // 새로운 로컬세션 생성
        myHistory.localSessionNum = res.length + 1;
        localStorage.setItem(myHistory.prekey + (res.length + 1), res.length + 1);
        alert('유저 생성 해서 넣었음');
      });
      alert('안 기다려 ?');
      const dataObj = {
        username: myHistory.prekey + myHistory.localSessionNum,
        password: 1234,
      };

      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
    } catch (error) {
      console.log("Error : ", error);
    }
  }
}



// '3 + 6 = 9' 계산 기록 저장
async function inputHistory(numA, op, numB, result) {
  await createLocalSession();

  const dataObj = {
    username: myHistory.prekey + myHistory.localSessionNum,
    data: `${numA} ${op} ${numB} = ${result}`,
  };

  try {
    alert( "계산 기록 저장함" );
    await fetch("http://localhost:3000/cal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
  } catch (error) {
    console.log("Error : ", error);
  }
}



async function clearHistory() {
  const history = document.getElementById("history_list");
  history.innerHTML = "";

  try {
    const localSession = myHistory.prekey + myHistory.localSessionNum;
    await fetch(`http://localhost:3000/cal?username=${localSession}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Error : ", error);
  }
  getHistory();
}