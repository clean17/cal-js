
## express 서버
```js
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use("/static", express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.render('cal');
});

app.listen(3000);
```
CORS 허용 ( 외부접근 )
```js
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next(); // 다음 미들웨어 호출
  });
```
## 기본 파일 구조와 `ejs` 파일 생성 (html5) <br>
![image](https://github.com/clean17/cal-js/assets/118657689/d1c17839-0bff-48ca-a865-329cc017e423)
![image](https://github.com/clean17/cal-js/assets/118657689/02df726b-5f0b-456a-a7aa-61645a2859dc)





## babel-node

ES6 이상의 문법을 사용해서 nodejs서버를 열게 된다면 이번 버전의 자바스크립트를 사용하는 브라우저의 호환성을 위해서 babel을 이용해야 한다.

```
$ npm i @babel/core @babel/cli @babel/node @babel/preset-env -d
```

`babel.config.json` 파일을 생성하고 아래 코드를 넣는다.
```
{
    "presets": ["@babel/preset-env"]
}
```



## nodemon  <br>

nodemon은 nodejs서버의 변경사항을 핫리로드 시켜준다.<br>

`nodemon --exec babel-node ./src/server.js` 이렇게 길게 커맨드를 입력하지 않도록 아래 파일을 만든다.<br>
`nodemon.json`파일을 만든뒤 아래 코드를 넣는다.
```
{
    "exec":  "babel-node src/server.js"
}
```

package.json 수정
```
  "scripts": {
    "dev": "nodemon"
  },
  //...,
  "type": "module"

```

node 서버 실행 -> nodemon 으로 실행
```
npm run dev
```

## 외부 접속 방법 1 - localtunnel  <br>
->  `https://[주소이름].loca.lt` 생성 <br>
로컬 서버를 외부에서 접속하게 해준다.
```
lt -p 3000 -s [주소이름] 
```
## 외부 접속 방법 2 - ngrok 
```
$ choco install ngrok
```
```
$ ngrok config add-authtoken [홈페이지 로그인 후 받은 토큰 번호]
```
```
$ ngrok http [로컬 서버 포트]
```
생성된 주소를 통해 외부에서 접속 가능 <br>
![image](https://github.com/clean17/cal-js/assets/118657689/fe8039b1-8ec0-4553-b372-550e6bca864e)

다운 받아 실행할 때는 ngrok으로부터 받은 주소로 수정하면 된다.

## 모듈 패턴 분리 -> `export`, `import`
모듈로 선언된 스크립트안에서 `import`, `export` 가능
```html
<script type="module" src="/static/cal.js"></script>
```

## mysql 연결
```
$ npm i mysql
```
`mysql2`는 Promise API를 제공한다. ( `async/await` )
```
$ npm i mysql2
```
또한 `mysql2`는 caching_sha2_password 인증을 지원한다. <br>
>
mysql 8.0 버전부터
`caching_sha2_password` 인증방식을 도입한다.<br>
사용자 인증방식을 `native password` 방식으로 변경 제안<br>
```
$ ALTER USER 'your_username'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
$ FLUSH PRIVILEGES;
```
두번째 커맨드는 GRANT 및 REVOKE 명령을 제외한 권한 변경사항을 즉시 적용한다.<br>

사용자가 없어서 접근을 못하면<br>
```
$ mysql -u [user] -p
$ SELECT user, host FROM mysql.user WHERE user='user_name' AND host='host_name';
$ CREATE USER 'user_name'@'host_name' IDENTIFIED BY 'password';
$ DROP USER 'user_name'@'host_name';
```
두번째 커맨드 부터 사용자 있는지 확인<br>
사용자 신규<br>
사용자 삭제<br>

db 접근권한이 없을 경우<br>
```
$ GRANT ALL PRIVILEGES ON [database_name].* TO 'user_name'@'localhost';
$ FLUSH PRIVILEGES;
```


## `??`, `||` 차이

`??` 는 `null` 또는 `undefined`일 경우에만 오른쪽 값을 리턴한다. (nullish 체크)
```js
let result = "" ?? "default"; // result = ""
```
`||` 는 `falsy` 값일 경우 오른쪽 값을 리턴한다. (falsy 체크)<br>
`falsy` 는 `false`, `0`, `""`, `null`, `undefined`, `NaN` 의 값
```js
let result = undefined || "default"; // result = "default"
```



## 자바스크립트 `null` 체크 <br>

조건문 안에서 `null`, `""`, `0`, `undefined` 은 false 값이 된다.
```js
let obj = "";

if(obj === "") console.log('false'); // false
if(!obj) console.log('false'); // false
```
`obj`의 값은 `false`가 되므로 `if(!obj)` 로 작성하면 실행된다.

따라서 배열의 길이가 비어 있는 조건으로 실행을 하고 싶다면 아래의 코드를 사용한다.
비어있다면 false, 비어있지 않다면 true를 반환합니다.
```js
if(!array.length)
```

## `isNaN` 함수<br>
전역함수 `inNaN`은 전혀 다른 결과가 나온다.
```js
console.log(isNaN('string')); // true
console.log(Number.isNaN('string')); // false
```

## `for in`, `for of` 차이 <br>

`for in`문 은 객체의 요소를 반복할때 사용한다. <br>
객체의 속성만 아니라 프로토타입 체인으로부터 상속받은 속성도 반복한다.
```js
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    console.log(key);  // a, b, c를 순서대로 출력
}
```
`for of`문 은 반복 가능한(iterable) 객체의 요소를 반복할때 사용한다.<br>(배열, 문자열, Set, Map)
```js
const arr = [1, 2, 3];
for (let value of arr) {
    console.log(value);  // 1, 2, 3을 순서대로 출력
}

const str = "hello";
for (let char of str) {
    console.log(char);  // h, e, l, l, o를 순서대로 출력
}
```
