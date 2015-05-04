import Notification = require('models/notification')

module NotificationMapper {
    function mapResponseToNotification(data) : Notification {
        return  {
            message: data.message,
            date: new Date(data.date)
        };
    }
}

export = NotificationMapper;