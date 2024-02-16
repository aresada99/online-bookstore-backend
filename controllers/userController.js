import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'


export const test = (req, res) => {
    res.json({
        message: "Test route"
    })
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({message:'Kullanıcı Bulunamadı'});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req,res,next) => {

    const { username, email, password, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword 
    });

    try {
        const createdUser = await newUser.save();
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req,res,next) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        let hashedPassword = password;
        if(password){
            hashedPassword = await bcrypt.hash(password,10)
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email, password: hashedPassword }, { new: true });
        res.status(202).json(updatedUser);

    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {

    const { id } = req.params;

    try {
        await UserModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }

}