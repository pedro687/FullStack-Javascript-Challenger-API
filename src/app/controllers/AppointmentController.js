const Appointments = require('../models/Appointment')
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


        const appointments = await Appointments.create({
            user_id: req.userId,
            provider_id: provider_id,
            date: date
        })

        return res.json(appointments)

    }
}

module.exports = new AppointmentController()