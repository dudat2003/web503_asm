import Joi from "joi"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel"



const signupSchema = Joi.object({
    lastname: Joi.string().required().messages({
        "string.empty": "Du lieu bat buoc"
    }),
    firstname: Joi.string().required().messages({
        "string.empty": "Du lieu bat buoc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Du lieu bat buoc",
        "string.email": "Email khong dung dinh dang"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Du lieu bat buoc",
        "string.min": "Toi thieu 8 ki tu"
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "Mat khau khong khop"
    })
})


const signinSchema = Joi.object({

    email: Joi.string().email().required().messages({
        "string.empty": "{#label} Du lieu bat buoc",
        "string.email": "{#label} Email khong dung dinh dang"
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "{#label} Du lieu bat buoc",
        "string.min": "{#label} Toi thieu 8 ki tu"
    })
})

export const signUp = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, {
            abortEarly: false
        })
        if (!error) {
            const { lastname, firstname, email, password } = req.body
            const hash = bcrypt.hashSync(password, 10)
            const user = await User.create({
                lastname, firstname, email, password: hash
            })
            res.send({
                messages: "Sign Up Successfully",
                date: user
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages

            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
    res.end()
}


export const signIn = async (req, res) => {

    try {

        const { error } = signinSchema.validate(req.body, { abortEarly: false })

        if (error) {
            const message = error.details.map(item => item.message)
            res.status(400).send({
                message: message
            })
            return;
        }
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(401).send({
                message: "Thong tin dang nhap khong hop le"
            })
            res.end()
        }
        const check = bcrypt.compareSync(password, user.password)
        if (!check) {
            res.status(401).send({
                message: "Thong tin dang nhap khong hop le"
            })
            res.end()
        }
        const token = jwt.sign({ _id: user._id }, "wd18101", { expiresIn: "1d" })
        res.send({
            message: "Sign In Complete",
            accessToken: token
        })
        res.end()
    } catch (err) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

