const express = require('express'),
    expressValidator = require('express-validator')

const methodOverride = require('method-override')
const app = express();
const validatorOptions = {
    customValidators: {
        greaterThanOrEqual: (inputParam, minValue)=>{
            return inputParam >= minValue
        }
    }
};
app.use(expressValidator(validatorOptions));
const bodyparser = require("body-parser")
const cors = require('cors')
const compression = require('compression')
const db = require('./connect_database');
db.connect();
app.use(compression())
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyparser.json({ limit: '50mb' }))
app.use(cors({
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Origin': '*'
}))
app.disable('x-powered-by')
// app.use("/api/v1",require("./API/Routers/route"))
app.use(methodOverride('_method'))
app.use('/', require('./API/Routes/route'))

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: { message: error.message } })
})


module.exports = app

