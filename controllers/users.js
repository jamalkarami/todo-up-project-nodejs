import { UserService } from "../services/user-service.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../model/user.js';
export class UserControler {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async signup(req, res) {
        let { firstName, lastName, email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send('all input are required!');
        }
        // check if user already exist        
        const oldUser = await User.find({ email: email }).exec();
        if (oldUser.length > 0) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token        
        user.token = token;
        // return new user
        res.status(201).json({ token: token, user: user });
    };
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
        let encryptedPassword = await bcrypt.hash(password, 10);
        
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
