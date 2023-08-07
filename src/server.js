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