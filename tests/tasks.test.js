const request = require('supertest');
const app = require('../app'); 

describe('Tasks API', () => {
  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', 'Bearer ACCESS_TOKEN'); 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('tasks');
  });

  it('should create a new task', async () => {
    const newTask = { title: 'Test Task', description: 'Test Description' };
    title: 'Test Task', description: 'Test Description' };
    const res = await request(app).post('/tasks').send(newTask);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('task');
    expect(res.body.task.title).toBe(newTask.title);
  });

  it('should get a task by id', async () => {
    const taskId = 1; // Adjust the task ID as needed
    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('task');
  });

  it('should update a task', async () => {
    const taskId = 1; // Adjust the task ID as needed
    const updatedTask = { title: 'Updated Task', description: 'Updated Description' };
    const res = await request(app).put(`/tasks/${taskId}`).send(updatedTask);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('task');
    expect(res.body.task.title).toBe(updatedTask.title);
  });

  it('should delete a task', async () => {
    const taskId = 1; // Adjust the task ID as needed
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);
  });
});