const express =require("express") 
const dotenv = require("dotenv")
dotenv.config();
const { router } = require( "./routes/route.js");
const {pool} = require('../src/config/db.js') 
// const Redis = require('redis') 
const rateLimit = require("express-rate-limit");
const Redis = require('redis') 

//create a server
const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // maximum number of requests within the window
});
// Apply the rate limiter to all routes
app.use(limiter);

// impliment redis to chache
const redisClient = Redis.createClient();

//middleware to accept json from body
app.use(express.json());

app.use(express.urlencoded({extended:true}))

//specify the router
app.use("/", router);


app.listen(process.env.PORT, () => {
  redisClient
    .connect()
    .then(() => console.log("conncted to server & redis succesfully"));
});

// Connect to the database
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err);
  }
  console.log("Connected to the database");
  release();
});

module.exports={redisClient}