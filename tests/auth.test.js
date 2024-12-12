const request = require('supertest');
const app = require('../app'); 

describe('Authentication Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        username: 'abiodun',
        password: 'password'
      }, 10000); // Increase timeout to 10 seconds
    expect(res.statusCode).toEqual(201);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'abiodun',
        password: 'password'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'abiodun',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error');
  });
});
