var postmark = require("postmark");
var client = new postmark.Client("4693bbbf-0f42-4e54-a639-40546310b4e2");

module.exports = function () {
    var sendEmail = function (from, to, subject, content, variables) {
        client.sendEmail({
            "From": from,
            "To": to,
            "Subject": subject,
            "HtmlBody": content
        });
    }
    return {
        sendEmail: sendEmail
    }
}