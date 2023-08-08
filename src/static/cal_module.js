import { state as calModel } from '../model/cal.js'

import {
    inputHistory,
    getHistory,
    getHistoryLength,
} from './history_module.js'

const myDom = (function () {
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
        (ms) => new Promise(
            (resolve) => setTimeout(resolve, ms)
        )

    btnToggle("none"); // 버튼 비활성화
    if (getNextNum() !== "") {
        await wait(1000);
        loadCalculate();
    } else {
        btnToggle("auto"); // 버튼 활성화
    }
}

// 버튼 활성화 / 비활성화
function btnToggle(opt) {
    setButton(opt);
    lotateAnimation(1000);
}

// 계산 함수 호출
function loadCalculate() {
    const result = document.querySelector("#result");

    // 계산 결과 반영
    const calResult = numCalculate(getPreNum(), getOperation(), getNextNum()); // ex) 3 + 6
    result.innerText = calResult;

    // 히스토리 저장
    const historyNum = getHistoryLength();
    inputHistory(historyNum, getPreNum(), getOperation(), getNextNum(), calResult);

    // 계산 후 버튼 활성화, 상태 관리
    btnToggle("auto");
    setState(result.innerText, result.innerText.length)

    // 히스토리 갱신
    getHistory();
}

// 입력된 숫자 저장
function numInput(btn) {
    const result = document.querySelector("#result");
    result.innerText += btn;
    if (isOpBool()) {
        setNextNum(getNextNum() + btn);
        setNextNumLength(1);
    } else {
        setPreNum(getPreNum() + btn);
        setPreNumLength(1);
    }
}

// 연산자 저장
function opInput(btn) {
    const result = document.querySelector("#result");
    setOperation(btn);
    if (isOpBool()) { // 두번째부터
        result.innerText = result.innerText.slice(0, -1) + btn;
        return;
    }
    result.innerText += btn;
    setOpBool(true);
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
    const bool = isOpBool();
    const result = document.querySelector("#result");
    result.innerText = result.innerText.slice(0, -1);

    // 연산자가 마지막 입력일 경우
    if (bool && getNextNumLength() === 0) {
        setOpBool(false);
        setOperation("");

        // 두번째 숫자 취소
    } else if (bool && getNextNumLength() > 0) {
        setNextNum(getNextNum().slice(0, -1));
        setNextNumLength(-1);

        // 첫번째 숫자 취소
    } else {
        setPreNum(getPreNum().slice(0, -1));
        setPreNumLength(-1);
    }
}

// 모든 상태 초기화
function clear() {
    const result = document.querySelector("#result");
    result.innerText = "";
    setStateClear()
}

/////////////////////////////////////


function setPreNum(str) {
    return calModel.pre_num = str;
}

function setNextNum(str) {
    return calModel.next_num = str;
}

function setOperation(str) {
    return calModel.operation = str;
}

function setOpBool(bool) {
    return calModel.op_bool = bool;
}

function setNextNumLength(num) {
    calModel.next_num_length += num;
}

function setPreNumLength(num) {
    calModel.pre_num_length += num;
}

function setState(str, num) {
    calModel.pre_num = str
    calModel.pre_num_length = num
    calModel.next_num = "";
    calModel.next_num_length = 0;
    calModel.operation = "";
    calModel.op_bool = false;
}

function setStateClear() {
    calModel.pre_num = "";
    calModel.pre_num_length = 0;
    calModel.next_num = "";
    calModel.next_num_length = 0;
    calModel.operation = "";
    calModel.op_bool = false;
}

// "auto", "none" - 버튼 활성 / 비활성
function setButton(opt) {
    myDom.all_btn().forEach((btn) => {
        btn.style["pointer-events"] = opt; 
    });
    myDom.num_btn().forEach((btn) => {
        btn.style["background-color"] = opt === "auto" ? calModel.primary_color : calModel.gray_color;
    });
    myDom.op_btn().forEach((btn) => {
        btn.style["background-color"] = opt === "auto" ? calModel.second_color : calModel.gray_color;
    });
    myDom.back().style["background-color"] = opt === "auto" ? calModel.third_color : calModel.gray_color;
    myDom.clear().style["background-color"] = opt === "auto" ? calModel.third_color : calModel.gray_color;
    myDom.equal().style["background-color"] = opt === "auto" ? calModel.second_color : calModel.gray_color;

    myDom.loading().style["display"] = opt === "auto" ? "none" : "block";
}

function getPreNum() {
    return calModel.pre_num;
}

function getNextNum() {
    return calModel.next_num;
}

function getNextNumLength() {
    return calModel.next_num_length;
}

function getOperation() {
    return calModel.operation;
}

function isOpBool() {
    return calModel.op_bool;
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
    
    // visibility - hidden/visible
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