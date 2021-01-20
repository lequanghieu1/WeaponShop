const jwt = require('jsonwebtoken');
const Roles_Access = require('../Models/Roles_Access');


exports.add = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRECT_KEY)
        req.userData = decode;
        let check_role = await Roles_Access.findOne({ id_extra: decode.uid })
        if(!check_role){return res.status(405).json({message:"your accout has not been added roles_access"})}
        if (check_role.add === false) { return res.status(405).json({ message: "you not enough permission" }) }
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'UnAuthorized'
        })
    }
}
exports.delete = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRECT_KEY)
        req.userData = decode;
        let check_role = await Roles_Access.findOne({ id_extra: decode.uid })
        if(!check_role){return res.status(405).json({message:"your accout has not been added roles_access"})}
        if (check_role.delete === false) { return res.status(405).json({ message: "you not enough permission" }) }
        next();
    }
    catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'UnAuthorized'
        })
    }
}