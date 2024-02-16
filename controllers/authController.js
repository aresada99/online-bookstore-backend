import bcrypt from 'bcryptjs'
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'

export const test = (req, res) => {
    res.json({
        message: "Test route"
    })
}

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email:email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message:'Geçersiz e-posta adresi veya parola'})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        const {password: pass, ...sentUserInfo} = user._doc;
        res
            .cookie('access_token', token, {httpOnly:true})
            .status(200)
            .json(sentUserInfo);

    } catch (error) {
        next(error);
    }
}


export const logout = (req, res, next) => {
    res.clearCookie('access_token'); 
    res.status(200).json({ message: 'Oturum kapatıldı' });
};