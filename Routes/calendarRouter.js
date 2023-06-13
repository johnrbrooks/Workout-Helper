const Router = require('express').Router()
const calendarController = require('../Controllers/calendarController.js')

//Full route: localhost:3001/calendars/**username**

Router.get('/', calendarController.getCalendars)
Router.get('/:username', calendarController.getCalendar)
Router.post('/createcalendar', calendarController.createCalendar)
Router.put('/add/:updateRequestInfo', calendarController.addToCalendar)
Router.put('/remove/:updateRequestInfo', calendarController.removeFromCalendar)

module.exports = Router