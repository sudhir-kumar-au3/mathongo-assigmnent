const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//routes
app.use('/user', userRoute);
// output listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});