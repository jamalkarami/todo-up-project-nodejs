import User from './../model/user.js';

export class UserService {
    /**
        * 
        * @param {*} req 
        * @param {*} res 
        */
    static signup(user) {
        return User.create(user);
    };
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static signin(user) {
        return User.findOne(user).exec();
    };
    /**
     * Check whither the user allready exist
     */
    static async isAllreadyExist(email) {
        // check if user already exist
        try {
            const user = await User.findOne({ email: email }).exec();
            console.log("oldUser", user);       
            return user ? true : false;            
        } catch (error) {
            throw error;
        }
    }
}