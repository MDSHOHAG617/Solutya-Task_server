const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//using middleware
app.use(cors());
app.use(express.json());

//user: dbuser,
//pas: LeWk7RWNx7NKNC8b

const uri =
  "mongodb+srv://dbuser:LeWk7RWNx7NKNC8b@cluster0.bxv42.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("Solutya").collection("Product");
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    //post a new product
    app.post("/product", async (req, res) => {
      const newProducts = req.body;
      console.log("adding new Products", newProducts);
      const result = await productCollection.insertOne(newProducts);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//

app.get("/", (req, res) => {
  res.send("Running your server ");
});

app.listen(port, () => {
  console.log("Solutya task server is running ");
});
