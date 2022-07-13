const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors')
const app = express();
const errorMiddleware = require('./middlewares/error')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

//routes middleware
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes')

app.use(blogRoutes);
app.use(userRoutes);

// error middleware
app.use(errorMiddleware);

module.exports = app;