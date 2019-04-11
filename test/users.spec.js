const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src');


chai.should();

chai.use(chaiHttp);

describe('Server should be able to perform "/users/*" operation', () => {
  it('it should get /users/foods', done => {
    chai.request(server).get('/users/foods').end((err, res) => {
      if(err) {
        done(err);
        return;
      }
      res.should.have.status(200);
      res.should.be.a('object');
      res.body.should.be.a('array');

      done();
    })
  });
  it('it should post to /users/food', done => {
    chai.request(server)
      .post('/users/food')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        hero_name: 'Professor X',
        first_name: 'xavier',
        last_name: 'x-men'
      }).end((error, response, body) => {
        if (error) {
          done(error);
        } else {
          done();
        }
      })
  });
  it('it should call DELETE to /users/food', done => {
    // todo
    done();
  });
});
