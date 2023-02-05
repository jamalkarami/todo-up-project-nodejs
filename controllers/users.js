import { UserService } from "../services/user-service.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../model/user.js';
import { validationResult } from 'express-validator';
export class UserControler {
    /**
     * Register a user in db
     * @param {*} req 
     * @param {*} res 
     */
    static async signup(req, res) {
        //check  if there was an error durring validation
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error('You have to enter a valid email and a password with at least 4 character !');
        }
        //Check if the is allready exist
        let isUserExist = await UserService.isAllreadyExist(req.body.email);
        if (!isUserExist) {
            const { firstName, lastName, email, password } = req.body;
            let user = { firstName, lastName, email, password };
            let encryptedPassword = await bcrypt.hash(password, 10);
            //register the user
            await UserService.signup({
                firstName,
                lastName,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });
            //Generating the token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // return new user with his token
            res.status(201).json({ token: token, user: user });
        } else {
            throw new Error('A user with the same email allready exist!');
        }
    }
    /**
     * Login the user
     * @param {*} req 
     * @param {*} res 
     */
    static async signin(req, res) {
        let { email, password } = req.body;
        console.log(req.body);
        if (!(email && password)) {
            throw new Error('the email and password are required!');
        }
        let errors = validationResult(req);
        console.log(errors.array());
        // check if user already exist   
        const user = await User.findOne({ email: email }).exec();
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // return new user
            res.status(201).json({ token: token, user: user });
        } else {
            throw new Error("Email or password is wrong");
        }
    }
}
