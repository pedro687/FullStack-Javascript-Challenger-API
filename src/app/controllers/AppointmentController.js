const Appointments = require('../models/Appointment')
const {startOfHour, parseIso, isBefore} = require('date-fns')
const Yup = require('yup')
const User = require('../models/User')
const Files = require('../models/Files')

class AppointmentController {
    async index(req, res) {
        const { page = 1 } = req.query

        const appointment = await Appointments.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [{
                model: User,
                as: 'provider',
                attributes: ['id', 'name', 'email'],
                include: [{
                    model: Files,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                }]
            }]
        })
        
        if(!appointment) {
            return res.status(400).json({ message: "You dont have appointments" })
        }

        return res.status(200).json(appointment)
    }
    
    async store(req, res) {
        const Schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required()
        })

        if(!(await Schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation Fails" })
        }


        const { date, provider_id } = req.body

        const Providers = await User.findOne({
            where: { id: provider_id, provider: true }
        })

        if(!Providers) {
            return res.status(401).json({ error: "Provider does not exists" })
        }

        /*
        *check for past dates
        */

        const hourStart = startOfHour(parseIso(date))
        if(isBefore(hourStart, new Date())) { 
            return res.statu(401).json({error: "past date not are permited" })
        }

        /* check for availibility
        */

        const checkAvailability = await Appointments.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        })

        if(checkAvailability) {
            return res.status(400).json({ error: "appointment date is not availability" })
        }


        const appointments = await Appointments.create({
            user_id: req.userId,
            provider_id: provider_id,
            date: date
        })

        return res.json(appointments)

    }
}

module.exports = new AppointmentController()