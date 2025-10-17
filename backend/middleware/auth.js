const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status('404').message('no token');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = payload;
        next();
    } catch(e) {res.status(401).json({ms: 'invalid token'})}

}