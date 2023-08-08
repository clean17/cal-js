function testImgPromise() {
    fetch("https://media.istockphoto.com/id/1414744533/ko/%EC%82%AC%EC%A7%84/%EC%97%AC%EC%9E%90-%EC%86%90-%EC%8B%A0%EC%9A%A9-%EC%B9%B4%EB%93%9C%EB%A5%BC-%EB%93%A4%EA%B3%A0-%EC%9D%B8%ED%84%B0%EB%84%B7-%EB%B1%85%ED%82%B9%EC%97%90-%EC%A7%80%EB%B6%88-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%87%BC%ED%95%91%EC%97%90-%EB%8C%80-%ED%95%9C-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0%EC%9D%84-%EC%82%AC%EC%9A%A9-%ED%95%98-%EC%97%AC.jpg?s=2048x2048&w=is&k=20&c=xZQFYjG4XGES_N38QcAoc0grZHFExATF2IP1nLfeqk4=")
        .then((response) => response.blob())
        .then((myBlob) => {
            let objectURL = URL.createObjectURL(myBlob);
            let image = document.createElement("img");
            image.src = objectURL;
            document.body.appendChild(image);
        })
        .catch((e) => {
            alert('Something was long !', e.message);
        })
        .finally(() => {
            console.log('finally !!')
        })
}

/* 원하는 조건이 아닐때 프로미스가 reject를 응답 -> catch 
    new Promise((resolve, reject) => {
    if (message === "" || typeof message !== "string") {
        reject("Message is empty or not a string");
    } else if (interval < 0 || typeof interval !== "number") {
        reject("Interval is negative or not a number");
    } else {
        setTimeout(function () {
            resolve(message);
        }, interval);
    }
})  */

export { testImgPromise }