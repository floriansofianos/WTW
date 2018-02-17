var mdbHelper = require('../helpers/mdbHelper')();
var cache = require('memory-cache');
var _ = require('underscore');

module.exports = function () {
    var makeRequest = function (method, page, query, done) {
        var requests = cache.get('movieDBRequests');
        if (!requests) requests = [];
        var cachedRequests = _.filter(requests, function (r) { return r.method == method && _.isEqual(r.query, query) });
        if (_.size(cachedRequests) > 0) {
            // Do we have a perfect match?
            var requestResult = _.find(cachedRequests, function (r) { return r.page == page });
            if (requestResult) {
                return done(null, requestResult.data);
            }
            else {
                var maxPage = cachedRequests[0].data.total_pages;
                query.page = Math.min(maxPage, page);
                mdbHelper.makeMovieDBRequest(method, query, function (err, data) {
                    if (err || !data) return done(err, null);
                    else {
                        // get rid of the page information in the query object
                        delete query.page;
                        requests.push({
                            query: query,
                            page: page,
                            method: method,
                            data: data
                        });
                        cache.put('movieDBRequests', requests);
                        return done(null, data);
                    }
                });
            }
        }
        else {
            // We are in the dark, we don't know how many pages we have -> make two requests: one without pages to get the paging and one with the page wanted.
            mdbHelper.makeMovieDBRequest(method, query, function (err, data) {
                if (err || !data) return done(err, null);
                else {
                    // We have the total_pages
                    var maxPage = data.total_pages;
                    query.page = Math.min(maxPage, page);
                    mdbHelper.makeMovieDBRequest(method, query, function (err, data) {
                        if (err || !data) return done(err, null);
                        else {
                            // get rid of the page information in the query object
                            delete query.page;
                            requests.push({
                                query: query,
                                page: page,
                                method: method,
                                data: data
                            });
                            cache.put('movieDBRequests', requests);
                            return done(null, data);
                        }
                    });
                }
            });
        }
    }

    return {
        makeRequest: makeRequest
    }
}