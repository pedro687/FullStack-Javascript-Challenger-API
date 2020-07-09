const Appointments = require('../models/Appointment')
const {startOfHour, parseIso, isBefore} = require('date-fns')
const Yup = require('yup')
const User = require('../models/User')

class AppointmentController {
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