export const validateAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            statusCode: 403,
            message: "Only Admin can access these facility!"
        })
    }
}


export const validateSellerRole = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'seller')) {
        next();
    } else {    
        res.status(403).json({
            success: false,
            statusCode: 403,
            message: "Only Admin or seller can access these facility!"
        })
    }
}