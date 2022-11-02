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
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api', require('./routes/user.routes.js'))
app.use('/api/art', require('./routes/article.routes.js'))
app.use('/api/items', require('./routes/item.routes.js'))
app.use('/api/itemTypes', require('./routes/item_type.routes.js'))
app.use('/api/activities', require('./routes/activity.routes.js'))

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})