const Appointments = require('../models/Appointment')
const {startOfHour, parseISO, isBefore, format} = require('date-fns')
const pt = require('date-fns/locale/pt')
const Yup = require('yup')
const User = require('../models/User')
const Files = require('../models/Files')
const Notifications = require('../schemas/Notifications')

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

        const hourStart = startOfHour(parseISO(date))
        if(isBefore(hourStart, new Date())) { 
            return res.status(401).json({error: "past date not are permited" })
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

        /*
        *  Notify Appointment Notification
        */
       const users = await User.findByPk(req.userId)
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMM 'as' H:mm'h'",
            {
                locale: pt
            }
        )
        await Notifications.create({
            content: `Novo agendamento de ${users.name} para ${formattedDate}`,
            user: provider_id,
        })
        return res.json(appointments)

    }
}

module.exports = new AppointmentController()