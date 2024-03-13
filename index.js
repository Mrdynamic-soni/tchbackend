import express from "express"
import { excuteQuery } from "./database.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const app = express();

const port = 3000;

app.use(express.json())

app.get('/', async(req, res)=>{
    res.send("Hello, Server is Up and running")
})


app.get("/getdata", async(req, res)=>{
    const response =await excuteQuery(`select * from users`)
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

app.put("/update-user", async ( req, res)=>{
    const {id, data} = req.body;
    const response = await excuteQuery(`update users set ${data[0]} = '${data[1]}' where id ='${id}' returning * `);
    res.send({msg:"user updated", data:response.rows[0]});
})




// app.post('/register', async (req, res) => {
//     const { phone, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         const result = await excuteQuery(`INSERT INTO users (phone, password) VALUES ('${phone}', '${hashedPassword}') RETURNING *`);
//         res.status(201).send(`User added with ID: ${result.rows[0]}`);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error registering user');
//     }
// });


// app.post('/login', async (req, res) => {
//     const { phone, password } = req.body;
//     try {
//         const result = await excuteQuery('SELECT * FROM users WHERE phone = $1', [phone]);
//         const user = result.rows[0];
//         if (user && await bcrypt.compare(password, user.password)) {
//             const token = jwt.sign({ id: user.id }, 'qwertyuiop1234567890');
//             res.status(200).json({ token });
//         } else {
//             res.status(401).send('Invalid username or password');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error logging in');
//     }
// });

app.listen(port, () => {
    console.log(`Server is listening  check at http://localhost:${port}`);
  });