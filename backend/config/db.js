import mongoose from 'mongoose'

const connect = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URL,
            {
                useUnifiedTopology: true,
                useCreateIndex: true,
                useNewUrlParser: true
            })

        console.log(`Mongo connected ${conn.connection.host}`.magenta.underline)

    }catch(error) {
        console.log(`Mongo Error ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connect