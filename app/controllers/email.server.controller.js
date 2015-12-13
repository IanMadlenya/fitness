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

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.sendEmail = function(req, res) {
    transporter.sendMail({
        to: req.body.recipient,
        subject: req.body.subject,
        text: req.body.message
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