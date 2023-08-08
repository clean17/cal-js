import { myCal } from '../model/cal.js'

import {
    inputHistory,
    getHistory,
    getHistoryLength,
} from './history_module.js'



const my_btn_dom = (function () {
    const my_all_btn = document.querySelectorAll("button");
    const my_loading = document.querySelector("#loading")
    const my_num_btn = document.querySelectorAll(".num_btn");
    const my_op_btn = document.querySelectorAll(".op_btn");
    const my_back = document.querySelector("#back");
    const my_clear = document.querySelector("#clear");
    const my_equal = document.querySelector("#equal");

    return { // 표현식 안됨
        all_btn: function () { return my_all_btn },
        loading: function () { return my_loading },
        num_btn: function () { return my_num_btn },
        op_btn: function () { return my_op_btn },
        back: function () { return my_back },
        clear: function () { return my_clear },
        equal: function () { return my_equal },
    };
})();

// 계산 트리거
async function calculate() {
    const wait =
        (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    btnToggle("none"); // 버튼 OFF
    if (myCal.getNextNum() !== "") {
        await wait(1000);
        loadCalculate();
    } else {
        btnToggle("auto"); // 버튼 ON
    }
}

// 버튼 ON / OFF
function btnToggle(opt) {
    setButton(opt);
    lotateAnimation(1000);
}

// 계산 함수 호출
function loadCalculate() {
    const result = document.querySelector("#result");

    // 계산 결과 반영
    const calResult = numCalculate(myCal.getPreNum(), myCal.getOperation(), myCal.getNextNum()); // ex) 3 + 6
    result.innerText = calResult;

    // 히스토리 저장 후 갱신
    const historyNum = getHistoryLength();
    inputHistory(historyNum, myCal.getPreNum(), myCal.getOperation(), myCal.getNextNum(), calResult);
    getHistory();

    // 계산 후 버튼 활성화, 상태 관리
    btnToggle("auto");
    myCal.setState(result.innerText, result.innerText.length)
}

// 입력된 숫자 저장
function numInput(btn) {
    const result = document.querySelector("#result");
    result.innerText += btn;

    if (myCal.isOpBool()) {
        myCal.setNextNum(myCal.getNextNum() + btn);
        myCal.setNextNumLength(1);
    } else {
        myCal.setPreNum(myCal.getPreNum() + btn);
        myCal.setPreNumLength(1);
    }
}

// 연산자 저장
function opInput(btn) {
    const result = document.querySelector("#result");
    myCal.setOperation(btn);
    if (myCal.isOpBool()) { // 두번째부터
        result.innerText = result.innerText.slice(0, -1) + btn;
        return;
    }
    result.innerText += btn;
    myCal.setOpBool(true);
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
function lastInputCancel() {
    const result = document.querySelector("#result");
    result.innerText = result.innerText.slice(0, -1);

    // 연산자가 마지막 입력일 경우
    if (myCal.isOpBool() && myCal.getNextNumLength() === 0) {
        myCal.setOpBool(false);
        myCal.setOperation("");

        // 두번째 숫자 취소
    } else if (myCal.isOpBool() && myCal.getNextNumLength() > 0) {
        myCal.setNextNum(myCal.getNextNum().slice(0, -1));
        myCal.setNextNumLength(-1);

        // 첫번째 숫자 취소
    } else {
        myCal.setPreNum(myCal.getPreNum().slice(0, -1));
        myCal.setPreNumLength(-1);
    }
}

// 모든 상태 초기화
function clear() {
    const result = document.querySelector("#result");
    result.innerText = "";
    myCal.setStateClear()
}

// "auto", "none" - 버튼 활성 / 비활성
function setButton(opt) {
    my_btn_dom.all_btn().forEach((btn) => {
        btn.style["pointer-events"] = opt;
    });
    my_btn_dom.num_btn().forEach((btn) => {
        btn.style["background-color"] = opt === "auto" ? myCal.primary_color : myCal.gray_color;
    });
    my_btn_dom.op_btn().forEach((btn) => {
        btn.style["background-color"] = opt === "auto" ? myCal.second_color : myCal.gray_color;
    });
    my_btn_dom.back().style["background-color"] = opt === "auto" ? myCal.third_color : myCal.gray_color;
    my_btn_dom.clear().style["background-color"] = opt === "auto" ? myCal.third_color : myCal.gray_color;
    my_btn_dom.equal().style["background-color"] = opt === "auto" ? myCal.second_color : myCal.gray_color;

    my_btn_dom.loading().style["display"] = opt === "auto" ? "none" : "block";
}

function lotateAnimation(ms) {
    const aliceTumbling = [
        { transform: "rotate(0) scale(1)" },
        { transform: "rotate(720deg) scale(1)" },
    ];
    const aliceTiming = {
        duration: ms,
        iterations: Infinity, // 반복횟수
        fill: "forwards", // 효과 유지
    };

    const loading = document.querySelector("#loading")
    loading.animate(aliceTumbling, aliceTiming);
}


export {
    numInput,
    opInput,
    calculate,
    clear,
    lastInputCancel,
}