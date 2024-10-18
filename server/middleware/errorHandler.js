/**
 * this function create dynamic error message
 * @param {Number} statusCode  send to client
 * @param {String} message custome message send to cliet
 * @returns 
 */
const errorHandler = (statusCode, message) => {
    const error = new Error() // need to study
    error.success = false
    error.statusCode = statusCode;
    error.message = message
    return error
}
export default errorHandler;


export const routesErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error!',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // todo : need to study
    });
};


