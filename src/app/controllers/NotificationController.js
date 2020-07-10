const User = require('../models/User')
const Notifications = require('../schemas/Notifications')

class NotificationController {
    async index(req, res) {
        const UserIsProvider = User.findOne({
            where: { id: req.userId, provider: true }
        })

        if(!UserIsProvider) {
            return res.status(401).json({ error: "Only providers can load notifications"})
        }

        const notifications = await Notifications.find({
            user: req.userId,
        }).sort({ createdAt: 'DESC' }).limit(20)


        return res.json(notifications)
    }
}

module.exports = new NotificationController()