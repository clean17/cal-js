import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getConn } from './mysql.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use((_req, res, next) => { // cors 헤더 설정 - 외부에서 접근 허용
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next(); // 다음 미들웨어 호출
});
app.use(express.json()); // json 데이터 해석해주는 미들웨어
// app.use(express.urlencoded({ extended: true })); //  x-www-form-urlencoded 해석
app.use("/static", express.static(__dirname + "/static"));
app.use("/model", express.static(__dirname + "/model")); // 모델
// app.use("/etc", express.static(__dirname + "/etc")); // 기타



app.get('/', (req, res) => {
    res.render('cal');
});




// 계산 히스토리 조회, 추가, 삭제
app.route('/cal')
    .get(async (req, res) => {
        // 파라미터... /cal/:username -> const username = req.params.username; -> WHERE username = ?' -> conn.query(query, [username])
        const username = req.query.username;
        const conn = await getConn();
        const query = 'SELECT * FROM CAL_HISTORY WHERE USERNAME ="' + username + '"';
        let [rows, fields] = await conn.query(query, []);
        conn.release();

        res.json(rows);
        // res.send(); 인수에 따라 타입 자동 설정 // 객체, 배열 -> application/json // 문자 -> text/html 으로 
    })
    .post(async (req, res) => {
        const json = req.body;
        const conn = await getConn();
        const query = `INSERT INTO CAL_HISTORY (USERNAME, DATA, CREATED_AT) VALUES (?, ?, NOW());`;
        const params = [json.username, json.data];
        conn.query(query, params); // 두번째 파라미터에 콜백함수 넣을 수 없다. // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator)) // 배열에 못 넣음 -> let [rows, fields] = 
        conn.release();

        res.json(json);
    })
    .delete(async (req, res) => {
        const username = req.query.username;
        const conn = await getConn();
        const query = 'DELETE FROM CAL_HISTORY WHERE USERNAME ="' + username + '"';
        await conn.query(query, []);
        conn.release();
    });



// 유저 조회, 추가
app.route('/user')
    .get(async (req, res) => {
        const conn = await getConn();
        const query = 'SELECT * FROM USER';
        let [rows, fields] = await conn.query(query, []);
        conn.release();

        res.json(rows);
    })
    .post(async (req, res) => {
        const json = req.body;
        const conn = await getConn();
        const query = `INSERT INTO USER (USERNAME, PASSWORD, CREATED_AT) VALUES (?, ?, NOW());`;
        const params = [json.username, json.password];
        conn.query(query, params);
        conn.release();

        res.json(json);
    });

 
app.listen(3000);