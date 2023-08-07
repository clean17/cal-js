const calculator = {
    pre_num: "",
    pre_num_length: 0,
    next_num: "",
    next_num_length: 0,
    operation: "", // 연산자
    op_bool: false, // 연산자 입력 여부
    gray_color: "rgb(165, 165, 165)",
    num_btn_color: "rgb(245, 240, 233)",
    ob_btn_color: "rgb(236, 255, 255)",
    back_clear_btn_color: "rgb(250, 215, 215)",
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function setPreNum(str) {
    return calculator.pre_num = str;
}

function setNextNum(str) {
    return calculator.next_num = str;
}

function setOperation(str) {
    return calculator.operation = str;
}

function setOpBool(bool) {
    return calculator.op_bool = bool;
}

function setNextNumLength(num) {
    calculator.next_num_length += num;
}

function setPreNumLength(num) {
    calculator.pre_num_length += num;
}

function stateClear() {
    calculator.pre_num = "";
    calculator.pre_num_length = 0;
    calculator.next_num = "";
    calculator.next_num_length = 0;
    calculator.operation = "";
    calculator.op_bool = false;
}

function setState(str, num) {
    calculator.pre_num = str
    calculator.pre_num_length = num
    calculator.next_num = "";
    calculator.next_num_length = 0;
    calculator.operation = "";
    calculator.op_bool = false;
}

function getPreNum() {
    return calculator.pre_num;
}

function getNextNum() {
    return calculator.next_num;
}

function getNextNumLength() {
    return calculator.next_num_length;
}

function getOperation() {
    return calculator.operation;
}

function isOpBool() {
    return calculator.op_bool;
}

function lotateAnimation(ms) {
    const loading = document.querySelector("#loading")

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
    loading.animate(aliceTumbling, aliceTiming);
}

function setButton(opt) {
    opt === "auto" ? btnOn(opt) : btnOff(opt);
}

function btnOn(opt) {
    const all_btn = document.querySelectorAll("button");
    const loading = document.querySelector("#loading")
    const num_btn = document.querySelectorAll(".num_btn");
    const op_btn = document.querySelectorAll(".op_btn");
    const back = document.querySelector("#back");
    const clear = document.querySelector("#clear");
    const equal = document.querySelector("#equal");

    all_btn.forEach((btn) => {
        btn.style["pointer-events"] = opt; // "auto", "none" - 버튼
      });
    num_btn.forEach((btn) => {
        btn.style["background-color"] = calculator.num_btn_color;
    });
    op_btn.forEach((btn) => {
        btn.style["background-color"] = calculator.ob_btn_color;
    });
    back.style["background-color"] = calculator.back_clear_btn_color;
    clear.style["background-color"] = calculator.back_clear_btn_color;
    equal.style["background-color"] = calculator.ob_btn_color;

    loading.style["display"] = "none"
}

function btnOff(opt) {
    const all_btn = document.querySelectorAll("button");
    const loading = document.querySelector("#loading")
    const num_btn = document.querySelectorAll(".num_btn");
    const op_btn = document.querySelectorAll(".op_btn");
    const back = document.querySelector("#back");
    const clear = document.querySelector("#clear");
    const equal = document.querySelector("#equal");

    all_btn.forEach((btn) => {
        btn.style["pointer-events"] = opt; // "auto", "none" - 버튼
    });
    num_btn.forEach((btn) => {
        btn.style["background-color"] = calculator.gray_color;
    });
    op_btn.forEach((btn) => {
        btn.style["background-color"] = calculator.gray_color;
    });
    back.style["background-color"] = calculator.gray_color;
    clear.style["background-color"] = calculator.gray_color;
    equal.style["background-color"] = calculator.gray_color;

    loading.style["display"] = "block";
}

export {
    setPreNum,
    setNextNum,
    setPreNumLength,
    setNextNumLength,
    setOperation,
    setOpBool,
    setState,
    setButton,
    getPreNum,
    getNextNum,
    getNextNumLength,
    getOperation,
    isOpBool,
    wait,
    stateClear,
    lotateAnimation,
}