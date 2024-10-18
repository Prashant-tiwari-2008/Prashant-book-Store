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