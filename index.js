import express from "express"

const app = express();

const port = 3000;

app.get('/', async(req, res)=>{
    res.send("Hello I am ljwkgjyrig")
})



app.get('/Home', async(req, res)=>{
    res.send("Hello I am server")
})



// Start the server
app.listen(port, () => {
    console.log(`Server is listening  check at http://localhost:${port}`);
  });