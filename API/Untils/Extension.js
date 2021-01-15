module.exports = {
    print_log_console(message) {
        let current_time = new Date()
        let date = current_time.getDate() >= 10 ? current_time.getDate() : `0${current_time.getDate()}`
        let month = current_time.getMonth() + 1 >= 10 ? current_time.getMonth() + 1 : `0${current_time.getMonth() + 1}`
        let year = current_time.getFullYear()
        let hour = current_time.getHours() >= 10 ? current_time.getHours() : `0${current_time.getHours()}`
        let minutes = current_time.getMinutes() >= 10 ? current_time.getMinutes() : `0${current_time.getMinutes()}`
        let seconds = current_time.getSeconds() >= 10 ? current_time.getSeconds() : `0${current_time.getSeconds() }`
        let mil = current_time.getMilliseconds() 
        return console.log(`[ ${process.env.APP_NAME} ] ${date}-${month}-${year} ${hour}:${minutes}:${seconds}.${mil} : ${message}`)
    },

}
