require('dotenv').config()
const express=require('express');
const cors=require('cors')
const app=express();
const port=process.env.PORT || 5000;

//middle ware
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Server is dour partase")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })