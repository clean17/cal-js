let pre_num = "";
let pre_num_length = 0;
let next_num = "";
let next_num_length = 0;
let operation = ""; // 연산자
let op_bool = false; // 연산자 입력 여부
let delay_time = 1000;


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

export {
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
}