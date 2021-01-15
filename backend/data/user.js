import bcrypt from 'bcryptjs'

const salt = 10

export default  [
    {
        name: 'admin',
        email: 'contact@admin.com',
        password: bcrypt.hashSync('admin', salt),
        isAdmin: true
    },
    {
        name: 'user',
        email: 'contact@user.com',
        password: bcrypt.hashSync('user', salt),
    },
    {
        name: 'user2',
        email: 'contact@user2.com',
        password: bcrypt.hashSync('user2', salt),
        isAdmin: true
    }

]