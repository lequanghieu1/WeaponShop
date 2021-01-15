require('dotenv').config();
const http = require('http');
const app = require('./app')
const server = http.createServer(app)
const {APP_PORT, APP_NAME} = process.env
const LogConsole = require('./API/Untils/Extension');

server.listen(APP_PORT, () => {
    LogConsole.print_log_console(`[${APP_NAME}] is running at port ${APP_PORT}`)
})
