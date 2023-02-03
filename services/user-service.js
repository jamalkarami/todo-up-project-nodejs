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
}