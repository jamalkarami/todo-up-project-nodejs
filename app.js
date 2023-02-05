import express from 'express';
import { router as userRoutes } from './routes/users.js';
import { router as taskRoutes } from './routes/tasks.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { body } from 'express-validator';
import errorHandler from './middleware/errorHandler.js';
import morgan from 'morgan';

const app = express();
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT;

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/api/v1/signin", express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use("/api/v1/signup", body('email').isEmail(), body('password').isLength({min : 4}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));

//Load routes
app.use(userRoutes);
app.use(taskRoutes);
app.use((req, res)=>{res.send('requested resource not found')});

//Add the error handler midlleware 
app.use(errorHandler);


//Connection to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
