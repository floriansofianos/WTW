module.exports = function () {
    var randomInt = function(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
    return {
        randomInt: randomInt
    }
}