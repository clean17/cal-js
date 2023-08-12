// type="module" 은 defer 속성을 가짐
// DOMContentLoaded - html 구문분석 완료 후 지연된 스크립트가 다운되고 실행될 때 이벤트 발생
// defer 실행 직후 DOMContentLoaded 이벤트 발생


document.addEventListener("DOMContentLoaded", () => {
  try {

    // 마우스 -> 숫자 버튼
    document.querySelectorAll(".num_btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target)
          inputNum(e.target.innerText);
      });
    });

    // 마우스 -> 연산자 버튼
    document.querySelectorAll(".op_btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        inputOperator(e.target.innerText);
      });
    });

    // 마우스 -> "=" 버튼
    document.getElementById("equal").addEventListener("click", () => {
      calculate();
    });

    // 마우스 -> "Clear" 버튼
    document.getElementById("clear").addEventListener("click", () => {
      stateClear();
    });

    // 마우스 -> "Backspace" 버튼
    document.getElementById("back").addEventListener("click", () => {
      cancelLastInput();
    });


    // 마우스 -> 히스토리 버튼
    document.getElementById("history_btn").addEventListener("click", () => {
      showHistory();
    })

    // 마우스 -> 히스토리 리셋 버튼
    document.getElementById("history_reset").addEventListener("click", () => {
      deleteHistory();
    })


    // 키보드 입력
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

        case "cancelLastInput":
          cancelLastInput();
          break;
      }
    }
  } catch (error) {
    alert(error);
  }




  ////////////////////////////////// cal_module 복사




  /**
   * 계산기 상태 / 입력 취소 편의를 위해 string타입
   */
  const calState = {
    preNum: "",
    nextNum: "",
    operator: "",
    checkOperator: false,
  };



  /**
   * 입력된 숫자 저장
   * @param {string} numString
   */
  function inputNum(numString) {

    if (typeof numString !== 'string' || numString === undefined || numString === "") {
      console.log('string 타입의 숫자만 입력 가능합니다.');
      throw new Error('"0 ~ 9" 버튼이나 키보드의 숫자 키로 입력하세요.');
    };

    if (numString !== ".") {
      const tempNum = Math.abs(Number(numString));
      if (!(tempNum <= 9) || tempNum === NaN) {
        console.log('숫자를 입력하세요.');
        throw new Error('입력한 값이 숫자가 아닙니다.');
      }
    }

    document.getElementById("result").innerText += numString; // 뷰

    // 연산자 입력 여부 -> 첫번째(x) / 두번째(o) 저장
    (calState.checkOperator) ? (calState.nextNum += numString) : (calState.preNum += numString);
  }



  /**
   * 입력된 연산자 저장
   * @param {string} opString
   */
  function inputOperator(opString) {

    if (typeof opString !== 'string' || !opString ) {
      console.log('string 타입의 연산자만 입력 가능합니다.');
      throw new Error('" + ", " - ", " * ", " / " 버튼이나 키보드의 연산 키로 입력하세요.');
    };

    if (!(opString === "+" || opString === "-" || opString === "*" || opString === "/")) {
      console.log('연산자 기호만 입력해야 합니다.');
      throw new Error('연산자 기호만 입력 가능합니다.');
    }

    // 연산자 저장
    calState.operator = opString;
    const result = document.getElementById("result");

    // 연산자를 연속으로 입력 시 마지막 연산자만 유효
    if(calState.checkOperator) { // 뷰
      result.innerText = result.innerText.slice(0, -1) + opString;
    } else {
      result.innerText += opString;
    }

    calState.checkOperator = true;
  }



  /**
   * 계산 트리거 ("=" 버튼이나 "Enter" 키 입력 시)
   */
  function calculate() {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    // 연산자 입력 후 두번째 숫자를 입력했을 경우에만 계산
    if (calState.nextNum) {
      turnOffBtn();
      rotateAnimation(1000)
      wait(1000).then(() => startCalculate());
    }
  }



  /**
   * 버튼 비활성화 (회색)
   */
  function turnOffBtn() {
    document.querySelectorAll("button")
      .forEach((btn) => {
        btn.disabled = true;
      });
    document.getElementById("loading").style.display = "block";
  }



  /**
   * 버튼 활성화
   */
  function turnOnBtn() {
    document.querySelectorAll("button")
      .forEach((btn) => {
        btn.disabled = false;
      });
    document.getElementById("loading").style.display = "none";
  }



  /**
   * 계산 함수 호출
   */
  function startCalculate() {
    // 계산 결과
    const calResult = calculateNum(calState.preNum, calState.operator, calState.nextNum); // ex) 3 + 6

    // inNaN함수는 항상 Number.isNaN으로 사용해야 함, isNaN은 잘못된 결과가 나온다
    if (Number.isNaN(calResult)) {
      stateClear();
      alert('계산식이 올바르지 않습니다.');
      return;
    }

    document.getElementById("result").innerText = calResult; // 뷰

    // 히스토리 저장
    insertHistory(calState.preNum, calState.operator, calState.nextNum, calResult); // '3 + 6 = 9' 저장

    // 계산 후 버튼 활성화, 상태 관리
    setState(calResult);
    turnOnBtn();
  }



  /**
   * 계산 후 상태
   * @param {number} result 
   */
  function setState(result) {
    calState.preNum = String(result);
    calState.nextNum = "";
    calState.operator = "";
    calState.checkOperator = false;
  };



  /**
   * clear 버튼 -> 상태 초기화
   */
  function stateClear() {
    document.getElementById("result").innerText = ""; // 뷰
    calState.preNum = "";
    calState.nextNum = "";
    calState.operator = "";
    calState.checkOperator = false;
  }



  /**
   * 사칙연산 함수 -> 연산 결과 반환
   * @param {string} numStringA 
   * @param {string} operation 
   * @param {string} numStringB 
   * @returns 
   */
  function calculateNum(numStringA, operation, numStringB) {
    let result;
    switch (operation) {
      case "/":
        result = Number(numStringA) / Number(numStringB);
        break;
      case "*":
        result = Number(numStringA) * Number(numStringB);
        break;
      case "-":
        result = Number(numStringA) - Number(numStringB);
        break;
      case "+":
        result = Number(numStringA) + Number(numStringB);
        break;
    }
    return parseFloat(result.toFixed(2)); // 결과는 숫자이거나 NaN
  }

 

  /**
   * 마지막 입력 취소
   */
  function cancelLastInput() {
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



  /**
   * 계산 중 애니메이션
   * @param {number} ms 
   */
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





  /**
   * 로컬 세션의 키로 사용
   */
  const myHistory = {
    prekey: "randomUser_",
    localSessionNum: 0,
  }



  /**
   * fetch 통신 -> object 반환
   * @param {string} url
   * @param {string} options 
   * @param {object} data 
   * @returns 
   */
  async function fetchData(url, options, data) {
    let method;

    if (options === "GET" || options === "DELETE") {
      method = { method: options };
    } else {
      method = {
        method: options,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    }

    let result;

    async function myFetch() {
      try {
        const res = await fetch(url, method);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`); // Error -> catch 
        }
        result = res.json();
      } catch (error) {
        console.log("Error : ", error);
        alert('서버 통신에 실패했습니다.');
      }
    }

    await myFetch();
    return result;
  }



  /**
   * 히스토리 조회 -> 렌더링
   */
  async function getHistory() {
    document.getElementById("history_list").innerHTML = "";

    const localSession = myHistory.prekey + myHistory.localSessionNum;
    const res = await fetchData(`https://5efa-220-77-145-235.ngrok-free.app/cal?username=${localSession}`, "GET", null);

    // 조건문 안의 null, 0, "", undefined -> false
    if (res) {
      for (let index = 0; index < res.length; index++) {
        const li = document.createElement("li");
        li.textContent = `${res[index].data} \n`;
        document.getElementById("history_list").append(li);
      }
    }
  }



  /**
   * 연산 결과 히스토리에 등록
   * @type {res: object}
   */
  function updatetHistory(res) {
    const li = document.createElement("li");
    li.textContent = `${res.data} \n`;
    document.getElementById("history_list").append(li);
  }



  /**
   * 히스토리 버튼 -> 히스토리 조회 -> 렌더링
   */
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



  // 즉시 실행 함수가 호출하는 함수 호이스팅 x
  (async function createLocalSession() {

    // 페이지 방문한적 있음 -> randomUser_ 로 시작하는 세션 찾기
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i); // 인덱스 키

      if (key.startsWith(myHistory.prekey)) {
        myHistory.localSessionNum = localStorage.getItem(key);

        // 찾은 세션으로 히스토리 조회
        showHistory();
        return;
      }
    }

    // 페이지 첫 방문 시 세션 생성
    if (myHistory.localSessionNum === 0) {
      const res = await fetchData("https://5efa-220-77-145-235.ngrok-free.app/user", "GET", null)
      myHistory.localSessionNum = res.length + 1;
      localStorage.setItem(myHistory.prekey + (res.length + 1), res.length + 1);
      alert('첫 방문을 환영합니다 !!');

      const data = {
        username: myHistory.prekey + myHistory.localSessionNum,
        password: 1234,
      };
      // 신규 세션 등록
      await fetchData("https://5efa-220-77-145-235.ngrok-free.app/user", "POST", data);
      showHistory();
    }
  })();



  /**
   * 계산 결과 히스토리에 등록
   * @param {string} numA 
   * @param {string} op 
   * @param {string} numB 
   * @param {number} result 
   */
  function insertHistory(numA, op, numB, result) {

    const data = {
      username: myHistory.prekey + myHistory.localSessionNum,
      data: `${numA} ${op} ${numB} = ${result}`,
    };

    fetchData("https://5efa-220-77-145-235.ngrok-free.app/cal", "POST", data)
      .then((res) => {
        updatetHistory(res);
      })
  }



  /**
   * 히스토리 리셋
   */
  function deleteHistory() {
    const username = myHistory.prekey + myHistory.localSessionNum;
    fetchData(`https://5efa-220-77-145-235.ngrok-free.app/cal?username=${username}`, "DELETE", null);
    document.getElementById("history_list").innerHTML = "";
  }

});