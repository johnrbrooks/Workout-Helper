const dotenv = require("dotenv");
dotenv.config()

module.exports = {
    MONGO_PW: process.env.MONGO_PW,
    PORT: process.env.PORT,
    ORIGIN: process.env.ORIGIN,
}