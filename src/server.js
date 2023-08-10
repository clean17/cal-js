import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getConn } from './mysql.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(express.json()); // json 데이터 해석해주는 미들웨어
// app.use(express.urlencoded({ extended: true })); //  x-www-form-urlencoded 해석
app.use("/static", express.static(__dirname + "/static"));
app.use("/model", express.static(__dirname + "/model")); // 모델
// app.use("/etc", express.static(__dirname + "/etc")); // 기타





app.get('/', (req, res) => {
    res.render('cal');
    console.log('호출');
});

app.get('/test', (req, res) => {
    res.send('테스트');
    console.log('테스트 호출');
});


app.route('/cal')
    .get(async (req, res) => {
        console.log('기록 조회');
        // 파라미터... /cal/:username -> const username = req.params.username; -> WHERE username = ?' -> conn.query(query, [username])
        const username = req.query.username;
        const conn = await getConn();
        const query = 'SELECT * FROM cal_history where username ="' + username + '"';
        let [rows, fields] = await conn.query(query, []);
        conn.release();

        res.json(rows);
        // res.send(); 인수에 따라 타입 자동 설정 // 객체, 배열 -> application/json // 문자 -> text/html 으로 
    })
    .post(async (req, res) => {
        console.log('기록 저장');
        const json = req.body;
        const conn = await getConn();
        const query = `INSERT INTO cal_history (username, data, created_at) VALUES (?, ?, now());`;
        const params = [json.username, json.data];
        conn.query(query, params); // 두번째 파라미터에 콜백함수 넣을 수 없다. // TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator)) // 배열에 못 넣음 -> let [rows, fields] = 
        conn.release();

        res.json(json);
    })
    .delete(async (req, res) => {
        console.log('리셋');
        const username = req.query.username;
        const conn = await getConn();
        const query = 'DELETE FROM cal_history where username ="' + username + '"';
        await conn.query(query, []);
        conn.release();
    });

app.route('/user')
    .get(async (req, res) => {
        console.log('유저 조회');
        const conn = await getConn();
        const query = 'SELECT * FROM user';
        let [rows, fields] = await conn.query(query, []);
        conn.release();

        res.json(rows);
    })  
    .post(async (req, res) => {
        console.log('유저 생성');
        const json = req.body;
        const conn = await getConn();
        const query = `INSERT INTO user (username, password, created_at) VALUES (?, ?, now());`;
        const params = [json.username, json.password];
        conn.query(query, params);
        conn.release();

        res.json(json);
    });

app.listen(3000);