var Mailchimp = require('mailchimp-api-v3')
var mailchimp = new Mailchimp('3a869efa9a205114f55ece06a4cab720-us17');
var _ = require('underscore');

module.exports = function () {
    var getWelcomeCampaign = function (done) {
        mailchimp.get('/campaigns')
            .then(function (results) {
                var campaign = _.find(results.campaigns, function (c) { return c.settings.title == 'Welcome' });
                if (!campaign) return done(true);
                else {
                    mailchimp.get('/campaigns/' + campaign.id + '/content')
                        .then(function (result) {
                            return done(null, result.html);
                        })
                        .catch(function (err) {
                            return done(true);
                        })
                }
            })
            .catch(function (err) {
                return done(true);
            })
    }
    return {
        getWelcomeCampaign: getWelcomeCampaign
    }
}