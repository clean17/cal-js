class Calculator {
    #pre_num = "";
    #pre_num_length = 0;
    #next_num = "";
    #next_num_length = 0;
    #operation = "";
    #op_bool = false;
    #gray_color = "rgb(165, 165, 165)";
    #primary_color = "rgb(245, 240, 233)";
    #second_color = "rgb(236, 255, 255)";
    #third_color = "rgb(250, 215, 215)";

    setPreNum(str) {
        this.#pre_num = str;
    }
    
    setNextNum(str) {
        this.#next_num = str;
    }
    
    setOperation(str) {
        this.#operation = str;
    }
    
    setOpBool(bool) {
        this.#op_bool = bool;
    }
    
    setNextNumLength(num) {
        this.#next_num_length += num;
    }
    
    setPreNumLength(num) {
        this.#pre_num_length += num;
    }
    
    setState(str, num) {
        this.#pre_num = str
        this.#pre_num_length = num
        this.#next_num = "";
        this.#next_num_length = 0;
        this.#operation = "";
        this.#op_bool = false;
    }
    
    setStateClear() {
        this.#pre_num = "";
        this.#pre_num_length = 0;
        this.#next_num = "";
        this.#next_num_length = 0;
        this.#operation = "";
        this.#op_bool = false;
    }

    getPreNum() {
        return this.#pre_num;
    }
    
    getNextNum() {
        return this.#next_num;
    }
    
    getNextNumLength() {
        return this.#next_num_length;
    }
    
    getOperation() {
        return this.#operation;
    }
    isOpBool() {
        return this.#op_bool;
    }

    getGrayColor() {
        return this.#gray_color;
    }

    getPrimaryColor() {
        return this.#primary_color;
    }

    getSecondColor() {
        return this.#second_color;
    }

    getThirdColor() {
        return this.#third_color;
    }
}

const myCal = new Calculator();

export { myCal };