var postmark = require("postmark");
var client = new postmark.Client('be387452-edb6-4a5c-940e-d565624904ce');
var from = 'WhaToWatch <info@whatowatch.net>';

module.exports = function () {
    var sendWelcomeEmail = function (lang, to, username, validateUrl) {
        var templateModel = require('../i18n/WelcomeEmail-' + lang + '.json');
        templateModel.username = username;
        templateModel.validate_url = validateUrl;
        templateModel.year = new Date().getFullYear();
        client.sendEmailWithTemplate({
            "TemplateId": 3686961,
            "TemplateModel": templateModel,
            "From": from,
            "To": to
        }, function (error, result) {
            if (error) {
                console.error("Unable to send via postmark: " + error.message);
                return;
            }
            console.info("Sent to postmark for delivery")
        });
    }

    

    var sendForgotPasswordEmail = function (lang, to, username, resetUrl) {
        var templateModel = require('../i18n/ForgotPasswordEmail-' + lang + '.json');
        templateModel.username = username;
        templateModel.reset_url = resetUrl;
        templateModel.year = new Date().getFullYear();
        client.sendEmailWithTemplate({
            "TemplateId": 3698581,
            "TemplateModel": templateModel,
            "From": from,
            "To": to
        }, function (error, result) {
            if (error) {
                console.error("Unable to send via postmark: " + error.message);
                return;
            }
            console.info("Sent to postmark for delivery")
        });
    }

    return {
        sendWelcomeEmail: sendWelcomeEmail,
        sendForgotPasswordEmail: sendForgotPasswordEmail
    }
}