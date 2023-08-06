import jwt from 'jsonwebtoken'
import User from '../models/user';

export const checkPermission = async (req, res, next) => {
    try {
        // 1. Kiểm tra có token không?
        // 2. Token có hợp lệ ?
        // 3. Kiếm tra có quyền truy cập ?
        // 4. Cho phép qua hay không qua
        const token = req.headers?.authorization.split(' ')[1]
        console.log(token);
        if (!token) {
            res.status(401).send({
                message: "Lỗi xác thực người dùng"
            })
            return;
        }
        const decoded = jwt.verify(token, "wd18101")
        if (!decoded) {
            res.status(401).send({
                message: "Lỗi xác thực người dùng"
            })
            return;
        }
        const _id = decoded._id
        const user = await User.findById(_id)
        console.log(user);
        if (!user.isAdmin) {
            res.status(401).send({
                message: "Không có quyền truy cập tài nguyên"
            })
            return;
        }
        next()
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Có lỗi xảy ra"
        })
    }
}