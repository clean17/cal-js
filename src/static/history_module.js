const myHistory = {
    prekey: "cal_history_",
}

// '3 + 6 = 9' 저장
function inputHistory(key, numA, op, numB, result) {
    localStorage.setItem( myHistory.prekey + key, 
        `${numA} ${op} ${numB} = ${result}`);
}

function getHistoryLength() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(myHistory.prekey)) {
            count++;
        }
    }
    return count;
}

function clearHistory() {
    const history = document.querySelector("#history_list");
    history.innerHTML = "";

    for (let i = localStorage.length - 1; i >= 0; i--) {
        let key = localStorage.key(i); // 인덱스 키
        if (key.startsWith(myHistory.prekey)) {
            localStorage.removeItem(key);
        }
    }
}

function getHistory() {
    const historyNum = getHistoryLength();
    const history = document.querySelector("#history_list");
    history.innerHTML = "";

    for (let index = 0; index < historyNum; index++) {
        const result = localStorage.getItem(myHistory.prekey + index);
        const li = document.createElement("li");
        li.textContent = `${result} \n`;
        history.append(li);
    }
}

function showHistory() {
    const history = document.querySelector("#history_list");
    const reset = document.querySelector("#history_reset");

    if (history.style.display === "block") {
        history.style.display = "none";
        reset.style.display = "none";
    } else {
        history.style.display = "block";
        reset.style.display = "block";
        getHistory();
    }
}

export {
    showHistory,
    inputHistory,
    getHistory,
    getHistoryLength,
    clearHistory,
}