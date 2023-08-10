import {
    inputHistory,
    getHistory,
    getHistoryLength,
} from './history_module.js'

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
    if(typeof num !== 'string' || num === undefined || num === "") {
        console.log('string 타입의 숫자만 입력 가능합니다.');
        throw new Error('"0 ~ 9" 버튼이나 키보드의 숫자 키로 입력하세요.');
    };
    const tempNum = Math.abs(Number(num));
    if( !(tempNum <= 9) || tempNum === NaN ) {
        console.log('숫자를 입력하세요.');
        throw new Error('입력한 값이 숫자가 아닙니다.');
    }

    document.querySelector("#result").innerText += num; // 뷰

    // 연산자 입력 여부 -> 첫번째(x) / 두번째(o) 저장
    calState.checkOperator ? calState.nextNum += num : calState.preNum += num;
}

// 연산자 저장
function inputOperator(op) {
    if(typeof op !== 'string') {
        console.log('string 타입의 연산자만 입력 가능합니다.');
        alert('" + ", " - ", " * ", " / " 버튼이나 키보드의 연산 키로 입력하세요.');
        return;
    };

    // 연산자 저장
    calState.operator = op;
    const result = document.querySelector("#result");

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
    document.querySelector("#loading").style.display = "block";
}

function btnOn() {
    document.querySelectorAll("button")
        .forEach((btn) => {
            btn.disabled = false;
        });
    document.querySelector("#loading").style.display = "none";
}



// 계산 함수 호출
function startCalculate() {
    // 계산 결과
    const calResult = numCalculate(calState.preNum, calState.operator, calState.nextNum); // ex) 3 + 6

    if(isNaN(calResult) || calResult === undefined) {
        stateClear();
        alert('계산식이 올바르지 않습니다.');
        return;
    }
    document.querySelector("#result").innerText = calResult; // 뷰
    
    // 히스토리 저장 후 갱신
    inputHistory(getHistoryLength(), 
        calState.preNum, calState.operator, calState.nextNum, calResult); // '3 + 6 = 9' 저장
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
    document.querySelector("#result").innerText = ""; // 뷰
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
    document.querySelector("#result").innerText = result.innerText.slice(0, -1); // 뷰

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
    document.querySelector("#loading").animate(range, time);
}


export {
    inputNum,
    inputOperator,
    calculate,
    stateClear,
    backspace,
}