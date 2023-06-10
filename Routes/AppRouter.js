const express = require('express');
const Router = express.Router()
const MakeRouter = require('./makesRouter')
const PhoneRouter = require('./phonesRouter')
const PlatformRouter = require('./platformsRouter')
const iosRouter = require('./iosRouter')
const androidRouter = require('./androidRouter')


Router.use('/makes', MakeRouter)
Router.use('/phones', PhoneRouter)
Router.use('/platforms', PlatformRouter)
Router.use('/ios', iosRouter)
Router.use('/android', androidRouter)


module.exports = Router