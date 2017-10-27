var postmark = require("postmark");
var client = new postmark.Client("e5c9adff-f7d4-4b0d-b790-f65a20a35bf1");
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
    return {
        sendWelcomeEmail: sendWelcomeEmail
    }
}