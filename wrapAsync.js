// this function catches the error and return the value inside it we catch the function and pass it to next
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}