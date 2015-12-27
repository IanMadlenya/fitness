var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: process.env.MEAN_FIT_NOTIFICATIONS_SMTP_SERVICE,
    auth: {
        user: process.env.MEAN_FIT_NOTIFICATIONS_NAME,
        pass: process.env.MEAN_FIT_NOTIFICATIONS_PASS
    }
}, {
    // default values for sendMail method
    from: process.env.MEAN_FIT_NOTIFICATIONS_NAME
});

exports.sendEmail = function(req, res) {
    transporter.sendMail({
        to: req.body.recipient,
        subject: 'Fitness notification',
        text: req.body.messageContent
    }, function(error, success) {
        console.log(error);
        if (error) {
            return res.status(400).send({
                message: getErrorMessage(error)
            });
        } else {
            res.json(success);
        }
    });
};