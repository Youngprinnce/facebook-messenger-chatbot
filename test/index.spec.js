const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const Chatbot = require('../src/api/models/chatbot.model');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
  beforeEach(async () => {
    await Chatbot.deleteMany({});
  });

  it('It should get the base route', (done) => {
    // Signup
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('It should get all messages', (done) => {
    const mock = {
      user: '12345',
      messages: [
        {
          name: 'Hello',
        },
        {
          birthday: '1999-01-01',
        },
        {
          option: 'yes',
        },
      ],
      name: 'Hello',
      state: 2,
    };
    const chatbot = new Chatbot(mock);

    chatbot.save();
    chai.request(server)
      .get('/messages')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.data.should.be.a('array');
        response.body.data.length.should.be.eql(1);

        const messageId = response.body.data[0]._id;
        chai.request(server)
          .get(`/messages/${messageId}`)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.data.should.be.a('object');
            response.body.data.should.have.property('_id');
            response.body.data.should.have.property('user');
            response.body.data.should.have.property('messages');
            response.body.data.should.have.property('name');
            done();
          });
      });
  });

  it('It should all message summary', (done) => {
    chai.request(server)
      .get('/summary')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.data.should.be.a('array');
        done();
      });
  });
});
