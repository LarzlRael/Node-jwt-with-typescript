import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/ts-jwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

    .then(db => console.log('db is conected'))
    .catch(err => console.log(err))