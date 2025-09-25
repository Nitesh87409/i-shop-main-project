const { VerifyToken } = require("../helper")

const adminAuth = (req, res, next) => {
    const authToken = req.headers?.authorization
    if(!authToken){
        res.send({flag:0,message:"Access Token Missing"})
    }else{
        if(VerifyToken(authToken)){
            next()
        }else{
            res.send({flag:0,message:"Invalid Access Token"})
        }
    }
}

module.exports = adminAuth