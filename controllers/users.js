import { UserService } from "../services/user-service.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../model/user.js';
import { validationResult } from 'express-validator';
export class UserControler {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async signup(req, res) {
        //check there was an error durring validation
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send('You have to enter a valid email and a password with at least 4 character !');
        }
        try {
            
            let isUserExist = await UserService.isAllreadyExist(req.body.email);

            if (!isUserExist) {
                const { firstName, lastName, email, password } = req.body;
                let encryptedPassword = await bcrypt.hash(password, 10);
                UserService.signup({
                    firstName,
                    lastName,
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                }).then(user => {
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
                }, error => {                    
                    res.status(400).send('An unkown error occured!')
                });
            } else {
                res.status(409).send('A user with the same email allready exist!');
            }
        } catch (error) {
            res.status(400).send('An unkown error occured!')
        }
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async signin(req, res) {
        console.log(req.body);
        let { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('all input are required!');
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
            return res.status(404).send("User not found");
        }
    }
}
