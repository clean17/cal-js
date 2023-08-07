function showHistory() {
    const history = document.querySelector("#history_list");
    const reset = document.querySelector("#history_reset");
    if (history.style.display === "block"){
      history.style.display = "none"
      reset.style.display = "none"
    }else {
      history.style.display = "block"
      reset.style.display = "block"
      getLocalStorage();
    }
}

function inputHistory(key, value) {
    window.localStorage.setItem(key, value);
}

function getLocalStorage() {
    const historyNum = window.localStorage.length;
    const history = document.querySelector("#history_list");
    history.innerHTML = "";
    for (let index = 0; index < historyNum; index++) {
        const result = window.localStorage.getItem(`cal_history_${index}`)
        const li = document.createElement("li");
        li.textContent = `${result} \n`;
        history.append(li);
    }
}

function getLocalStorageLength() {
    return window.localStorage.length;
}

function clearLocalStorage() {
    const history = document.querySelector("#history_list");
    history.innerHTML = "";
    window.localStorage.clear();
}

export {
    showHistory,
    inputHistory,
    getLocalStorage,
    getLocalStorageLength,
    clearLocalStorage,
}