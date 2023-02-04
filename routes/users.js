import express from 'express';
import { body, validationResult } from 'express-validator';
import {UserControler} from '../controllers/users.js';


const router = express();

router.post("/api/v1/signin", UserControler.signin);

router.post("/api/v1/signup", UserControler.signup);


export {router};