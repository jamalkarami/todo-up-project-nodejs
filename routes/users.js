import express from 'express';
import { body, validationResult } from 'express-validator';
import {UserControler} from '../controllers/users.js';
import tryCatch from '../utils/tryCatch.js';


const router = express();

router.post("/api/v1/signin", tryCatch(UserControler.signin));

router.post("/api/v1/signup", tryCatch(UserControler.signup));


export {router};