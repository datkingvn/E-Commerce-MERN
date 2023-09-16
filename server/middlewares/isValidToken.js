const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const isValidAccessToken = asyncHandler(async (req, res, next) => {
    // Xác thực token trong Authorization, thông thường sẽ có định dạng "Bearer <token>". "Bearer" là từ khóa xác định loại xác thực và <token> là giá trị của token.
    // Header: {authorization: Bearer <token>}
    if (req.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];

        // Xác thực token có hợp lệ hay không => verify token success => err = null
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    msg: 'Invalid Access Token'
                });
            }
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            success: false,
            msg: 'Require Authentication!'
        });
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const {role} = req.user;
    if (role !== 'admin')
        return res.status(401).json({
            success: false,
            msg: 'You do not have Permission!'
        });
    next();
})
module.exports = {
    isValidAccessToken, isAdmin
}