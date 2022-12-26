const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const path= require('path');
const { dirname } = require('path');
//routes
//const userRoutes = require('./routes/user');
//const categoryRoutes = require('./routes/category');

//environment variable or constants
env.config();
mongoose.set('strictQuery', false);
//mongodb connection
//mongodb+srv://root:<password>@cluster0.v3dfyds.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.v3dfyds.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewURLParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });
//app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use(cors({
  origin: ["http://localhost:3000/","http://localhost:4000/"]
}));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
