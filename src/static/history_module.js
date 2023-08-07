const myHistory = {
    privateKey: "cal_history_",
}

function inputHistory(key, numA, op, numB, result) {
    localStorage.setItem( myHistory.privateKey + key, `${numA} ${op} ${numB} = ${result}`);
}

function countHistory() {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith( myHistory.privateKey )) {
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
        if (key.startsWith( myHistory.privateKey )) {
            localStorage.removeItem(key);
        }
    }
}

function getLocalStorage() {
    const historyNum = countHistory();
    const history = document.querySelector("#history_list");
    history.innerHTML = "";

    for (let index = 0; index < historyNum; index++) {
        const result = localStorage.getItem( myHistory.privateKey + index);
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
        getLocalStorage();
    }
}

function getLocalStorageLength() {
    return localStorage.length;
}

export {
    showHistory,
    inputHistory,
    getLocalStorage,
    getLocalStorageLength,
    clearHistory,
}