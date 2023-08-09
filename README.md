## calculator - js
- 기본적인 express 서버
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
- 기본 파일 구조와 `ejs` 파일 생성 (html5) <br>
![image](https://github.com/clean17/cal-js/assets/118657689/d1c17839-0bff-48ca-a865-329cc017e423)
![image](https://github.com/clean17/cal-js/assets/118657689/02df726b-5f0b-456a-a7aa-61645a2859dc)

- nodemon 설치 후 실행 <br>

`nodemon --exec babel-node ./src/server.js`
`nodemon.json`
```
{
    "exec":  "babel-node src/server.js"
}
```

- package.json 수정
```
  "scripts": {
    "dev": "nodemon"
  },
  //...,
  "type": "module"

```

- node 서버 실행 -> nodemon 으로 실행
```
npm run dev
```

- localtunnel 설치 후 실행 ->  `https://[주소이름].loca.lt` 생성 <br>
로컬 서버를 외부에서 접속하게 해준다.
```
lt -p 3000 -s [주소이름] 
```
- 모듈 패턴 분리 -> `export`, `import`
```html
<script type="module" src="/static/cal.js"></script>
```
- jest 테스트
```
$ npm i --save-D jest
```
스크립트 추가
```
"test": "jest"
```