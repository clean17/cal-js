let pre_num = "";
let pre_num_length = 0;
let next_num = "";
let next_num_length = 0;
let operation = ""; // 연산자
let op_bool = false; // 연산자 입력 여부
let delay_time = 1000;

const wait = () => new Promise((resolve) => setTimeout(resolve, delay_time))

function changePreNum(str) {
    return pre_num = str;
}

function changeNextNum(str) {
    return next_num = str;
}

function changeOperation(str) {
    return operation = str;
}

function changeOpBool(bool) {
    return op_bool = bool;
}

function changeNextNumLength(num) {
    next_num_length += num;
}

function changePreNumLength(num) {
    pre_num_length += num;
}

function stateClear() {
    pre_num = "";
    pre_num_length = 0;
    next_num = "";
    next_num_length = 0;
    operation = "";
    op_bool = false;
}

function afterCalState(str, num) {
    pre_num = str
    pre_num_length = num
    next_num = "";
    next_num_length = 0;
    operation = "";
    op_bool = false;
}

function getPreNum() {
    return pre_num;
}

function getNextNum() {
    return next_num;
}

function getNextNumLength() {
    return next_num_length;
}

function getDelayTime() {
    return delay_time;
}

function getOperation() {
    return operation;
}

function getOpBool() {
    return op_bool;
}

function lotateAnimation(opt) {
    const loading = document.querySelector("#loading")

    const aliceTumbling = [
        { transform: "rotate(0) scale(1)" },
        { transform: "rotate(720deg) scale(1)" },
    ];
    const aliceTiming = {
        duration: delay_time,
        iterations: Infinity, // 반복횟수
        fill: "forwards", // 효과 유지
    };
    // visibility - hidden/visible
    opt === "auto" ? btnOn() : btnOff()
    loading.animate(aliceTumbling, aliceTiming);
}

function btnOff() {
    const loading = document.querySelector("#loading")
    const num_btn = document.querySelectorAll(".num_btn");
    const op_btn = document.querySelectorAll(".op_btn");
    const back = document.querySelector("#back");
    const clear = document.querySelector("#clear");
    const equal = document.querySelector("#equal");
    num_btn.forEach((btn) => {
        btn.style["background-color"] = "gray";
    });
    op_btn.forEach((btn) => {
        btn.style["background-color"] = "gray";
    });
    back.style["background-color"] = "gray";
    clear.style["background-color"] = "gray";
    equal.style["background-color"] = "gray";

    loading.style["display"] = "block";
}

function btnOn() {
    const loading = document.querySelector("#loading")
    const num_btn = document.querySelectorAll(".num_btn");
    const op_btn = document.querySelectorAll(".op_btn");
    const back = document.querySelector("#back");
    const clear = document.querySelector("#clear");
    const equal = document.querySelector("#equal");
    num_btn.forEach((btn) => {
        btn.style["background-color"] = "rgb(245, 240, 233)";
    });
    op_btn.forEach((btn) => {
        btn.style["background-color"] = "rgb(236, 255, 255)";
    });
    back.style["background-color"] = "rgb(250, 215, 215)";
    clear.style["background-color"] = "rgb(250, 215, 215)";
    equal.style["background-color"] = "rgb(236, 255, 255)";

    loading.style["display"] = "none"
}

export {
    changePreNum,
    changeNextNum,
    changePreNumLength,
    changeNextNumLength,
    changeOperation,
    changeOpBool,
    getPreNum,
    getNextNum,
    wait,
    getNextNumLength,
    getOpBool,
    getOperation,
    afterCalState,
    stateClear,
    lotateAnimation,
}