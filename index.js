import express from "express"
import { excuteQuery } from "./database.js";

const app = express();

const port = 6767;

app.get('/', async(req, res)=>{
    res.send("Hello, Server is Up and running")
})


app.get("/getdata", async(req, res)=>{
    const response =await excuteQuery(`select * from users`)
    console.log(response);
    res.send(response.rows)
})

app.listen(port, () => {
    console.log(`Server is listening  check at http://localhost:${port}`);
  });