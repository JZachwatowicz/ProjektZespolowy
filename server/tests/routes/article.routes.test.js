require('iconv-lite').encodingExists('foo')
const request = require('supertest');
const app = require('../../server');
jest.useFakeTimers();

describe('article endpoints', () => {
  it('should create a new article', async () => {
    const res = await request(app)
      .post('/api/article/add')
      .send({
        title: 'test is cool',
        content: 'Lorem ipsum',
        user_id: 1,
      });
    expect(res.statusCode).toEqual(201);
    // expect(res.body).toHaveProperty('');
  });
  it('should return forbidden 403', async () => {
    const res = await request(app)
      .post('/api/article/add')
      .send({
        title: 'test is cool',
        content: 'Lorem ipsum',
        user_id: 1,
      });
    expect(res.statusCode).toEqual(403);
    // expect(res.body).toHaveProperty('');
  });
  it('should return forbidden 403', async () => {
    const res = await request(app)
      .put('/api/article/edit/1')
      .send({
        user_id: 1,
        title: 'updated title',
        content: 'Lorem ipsum',
      });

    expect(res.statusCode).toEqual(403);
    // expect(res.body).toHaveProperty('x');
    // expect(res.body.post).toHaveProperty('x', 'updated title');
  });
  it('should return status code 404', async () => {
    const res = await request(app)
      .post('/api/article')
      .send({
        title: 'test is cool',
        content: 'Lorem ipsum',
      });
    expect(res.statusCode).toEqual(404);
    // expect(res.body).toHaveProperty('error');
  });

  it('should return 404 if item to delete not found', async () => {
    const res = await request(app).delete('/api/article/222');
    expect(res.statusCode).toEqual(404);
  });
  it('should respond with status code 404', async () => {
    const res = await request(app).get(`/api/article/${99}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should fetch home articles', async () => {
    const res = await request(app).get(`/api/article/`);
    expect(res.statusCode).toEqual(200);
  });
  it('should fetch all articles', async () => {
    const res = await request(app).get(`/api/article/get`);
    expect(res.statusCode).toEqual(200);
  });
  it('should fetch a single article', async () => {
    const articleId = 1;
    const res = await request(app).get(`/api/article/get/${articleId}`);
    expect(res.statusCode).toEqual(200);
  });

});
