var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Test Routes', () => {
    describe('/GET test', () => {
        it('it should return the test object', (done) => {
            chai.request(server)
                .get('/api/test')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('test');
                    res.body.test.should.equal('Hello World From API');
                    done();
                });
        });
    });
});