import express from "express"
import { excuteQuery } from "./database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cors from 'cors';

const app = express();

const port = 6767;

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/', async(req, res)=>{
    res.send("Hello, Server is Up and running")
})


app.get("/getdata", async(req, res)=>{
    const response =await excuteQuery(`select * from users  where deleted is false`)
    console.log(response);
    res.send(response.rows)
})

app.post("/create-user", async(req, res)=>{
    const {name, email, phone, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await excuteQuery(`insert into users (name, email, phone, password) values ('${name}', '${email}', '${phone}', '${hashedPassword}') returning * `)
    res.send({msg:"user created", data:response.rows[0]});
})


app.get("/get-user-detail", async(req, res)=>{
    const {id, name} = req.query;
    const response = await excuteQuery(`select * from users where name ='${name}'`)
    res.send(response.rows[0])
})

app.get("/get-a-user-detail/:id", async(req, res)=>{
    const id = req.params.id; 
    const response = await excuteQuery(`select * from users where id ='${id}'`)
    res.send({pathVariablesData:response.rows[0]})
})


app.put("/update-user", async ( req, res)=>{
    const {id, data} = req.body;
    const response = await excuteQuery(`update users set ${data[0]} = '${data[1]}' where id ='${id}' returning * `);
    res.send({msg:"user updated", data:response.rows[0]});
})


app.delete("/delete-user", async(req, res)=>{
    const {id, data} = req.body;
    const response = await excuteQuery(`update users set ${data[0]} = '${data[1]}' where id ='${id}' `);
    res.send({msg:"user deleted"});
})



app.listen(port, () => {
    console.log(`Server is listening  check at http://localhost:${port}`);
  });