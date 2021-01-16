export const notFound = (req, res, next) => {
    const error = new Error(`Not found -${req.originalUrl}`)
    res.status(404)
    return next(error)
}

export const ErrorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
}