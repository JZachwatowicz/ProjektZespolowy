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
app.use('/api/auth', require('./src/routes/auth.routes.js'))
app.use('/api', require('./src/routes/user.routes.js'))
app.use('/api/art', require('./src/routes/article.routes.js'))
app.use('/api/activities', require('./src/routes/activity.routes.js'))
app.use('/api/harmo', require('./src/routes/harmonogram.routes.js'))
app.use('/api/sche', require('./src/routes/schedule.routes.js'))


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})