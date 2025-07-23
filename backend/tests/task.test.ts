import request from 'supertest';
import { app, sequelize } from '../src/app'; // ✅ Now only imports app, not server
import { Task } from '../src/models/task.model';

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB before all tests
});

afterAll(async () => {
  await sequelize.close(); // Close DB after tests
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should fetch recent uncompleted tasks (max 5)', async () => {
    // Create 6 tasks
    for (let i = 0; i < 6; i++) {
      await Task.create({ title: `Task ${i}`, description: `Desc ${i}` });
    }

    const res = await request(app).get('/api/v1/tasks');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(5);
    expect(res.body[0]).toHaveProperty('title');
  });

  it('should mark a task as completed', async () => {
    const task = await Task.create({ title: 'To complete', description: 'Mark me done' });

    const res = await request(app).put(`/api/v1/tasks/${task.getDataValue('id')}/done`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task marked as completed');

    const check = await Task.findByPk(task.getDataValue('id'));
    expect(check?.get("is_completed")).toBe(true);
  });
});
