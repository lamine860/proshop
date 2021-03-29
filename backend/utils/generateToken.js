import jwt from 'jsonwebtoken'
export default (id) => {
    return jwt.sign({id : id}, process.env.JWT_SECRET)

}