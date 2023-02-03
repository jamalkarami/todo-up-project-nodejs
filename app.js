import express from 'express';
import { router as userRoutes } from './routes/users.js';
import { router as taskRoutes } from './routes/tasks.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT;

//Middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));

//Load routes
app.use(userRoutes);
app.use(taskRoutes);



//Connection to mongodb
mongoose.connect(process.env.DB_URL);
mongoose.set('strictQuery', false);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
