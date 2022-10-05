const express = require('express')
const cors = require('cors')


const app = express()

var corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };
  


// middleware

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
app.use('/api/auth', require('./routes/authRoutes.js'))
app.use('/api', require('./routes/userRoutes.js'))
app.use('/api/products', require('./routes/productRouter.js'))

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})