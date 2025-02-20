require('dotenv').config()
const express=require('express');
const cors=require('cors')
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

//middle ware
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hrpcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("TaskSprintDb");
    const TasksCollection = database.collection("Tasks");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // add a task
    app.post('/tasks',async (req,res)=>{
        const task=req.body;
        const result=await TasksCollection.insertOne(task);
        res.send(result);
    })
    // get catagorized task
    app.get('/tasks',async (req,res)=>{
       
        const {category,email}=req.query;
        let query={category,email}
     const result= await TasksCollection.find(query).toArray();
        res.send(result);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send("Server is dour partase")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })