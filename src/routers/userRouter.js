import { Router } from 'express'
import { signIn, signUp } from '../controllers/UserController'


const userRouter = Router()

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)

export default userRouter