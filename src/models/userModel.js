import mongoose from "mongoose";

const { Schema } = mongoose

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmn: {
        type: Boolean,
        default: false
    }
})
const User = mongoose.model("users", UserSchema)

export default User