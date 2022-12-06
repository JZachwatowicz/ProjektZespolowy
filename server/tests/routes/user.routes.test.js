require('iconv-lite').encodingExists('foo')
const request = require('supertest');
const app = require('../../server');
jest.useFakeTimers();

describe('user endpoints', () => {


  it('should fetch a single user', async () => {
    const userId = 1;
    const res = await request(app).get(`/api/test/all/get/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

 it('should fetch public access content', async () => {
    const res = await request(app).get('/api/test/all');
    expect(res.statusCode).toEqual(200);
  });

 it('should return forbidden 403 code', async () => {
    const res = await request(app).get('/api/test/get');
    expect(res.statusCode).toEqual(403);
  });

});
