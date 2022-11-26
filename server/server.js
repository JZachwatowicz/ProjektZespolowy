const express = require('express')
const cors = require('cors')


const app = express()

var corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };
  


// middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
app.use('/api/auth', require('./src/routes/auth.routes.js'))
app.use('/api/test', require('./src/routes/user.routes.js'))
app.use('/api/article', require('./src/routes/article.routes.js'))
app.use('/api/room', require('./src/routes/room.routes.js'))
app.use('/api/room_type', require('./src/routes/room_type.routes.js'))
app.use('/api/item', require('./src/routes/item.routes.js'))
app.use('/api/item_type', require('./src/routes/item_type.routes.js'))
app.use('/api/activity', require('./src/routes/activity.routes.js'))
app.use('/api/harmogram', require('./src/routes/harmonogram.routes.js'))
app.use('/api/schedule', require('./src/routes/schedule.routes.js'))
app.use('/api/address', require('./src/routes/address.routes.js'))
app.use('/api/department', require('./src/routes/department.routes.js'))

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 5000

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})