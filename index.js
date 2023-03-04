require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// const { logger } = require('./middleware/logEvents')
// const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./app/middlewares/verifyJWT')
const credentials = require('./app/middlewares/credentials')
const corsOptions = require('./app/config/corsOptions')
const connectDB = require('./app/config/dbConn')

const PORT = process.env.PORT || 3001

// Connect to Database
connectDB();

// app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

// Routes
// app.use('/', require('./routes/root'))
app.use('/register', require('./app/routes/register'))
app.use('/login', require('./app/routes/auth'))
app.use('/logout', require('./app/routes/logout'))
// app.use('/refresh', require('./app/routes/refresh'))
app.use('/admin/add-product', require('./app/routes/newProduct'))
app.use('/admin', require('./app/routes/priceTable'))
app.use('/admin', require('./app/routes/product'))
// app.use('/test-drive', require('./app/routes/testDrive'))
app.use('/', require('./app/routes/user'))
app.use('/intro', require('./app/routes/intro'))
app.use('/contact', require('./app/routes/contact'))

// app.use(verifyJWT);

app.get("/", (req, res) => {
    res.json({
        message: 'Hello! Welcome to Card Store.'
    })
})

app.post('/post', (req, res) => {
    console.log('Connected to react!')
    res.redirect('/')
})

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
