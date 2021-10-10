const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
const connection = require("./db/db");

app.use(express.json());

app.use(cors());

// ruqia 
const gymRouter = require("./routers/routes/gym")
app.use("/gym" , gymRouter)



// kulthoum 
const resturantRouter =require("./routers/routes/resturant")
app.use("/resturan",resturantRouter)

//abdallah

const trainerRouter = require("./routers/routes/trainer")
app.use("/trainer" , trainerRouter);

//rashed  25 - 30
const productsRouter = require("./routers/routes/product");
const gymUserRouter = require('./routers/routes/gymUser');
app.use("/products",productsRouter );
app.use('/gymUser' , gymUserRouter);
//Islam
const usersRouter = require("./routers/routes/auth/signUp");
app.use("/users", usersRouter);
const loginRouter = require("./routers/routes/auth/login")
app.use(loginRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
