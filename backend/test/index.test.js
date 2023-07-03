const request = require('supertest');
const express = require('express');
const app = express();

const adminRoutes = require('../src/routes/admin');
const Admin = require('../src/models/admin');

// Mock Admin model methods
jest.mock('../src/models/admin', () => ({
  verifyStatus: jest.fn(),
  hashPassword: jest.fn(),
  login: jest.fn()
}));

app.use(express.json());
app.use('/', adminRoutes);

describe('POST /admin/login', () => {
  it('should return 200 and admin data if login is successfully', async () => {
    // Mock Admin.verifyStatus
    Admin.verifyStatus.mockResolvedValue([{ adminStatus: 'Active' }]);
    // Mock Admin.hashPassword
    Admin.hashPassword.mockResolvedValue([{ admin_password: 'hashedPassword' }]);
    // Mock Admin.login
    Admin.login.mockResolvedValue(['authToken', 'adminName', 'adminEmail', 'adminId']);

    const response = await request(app)
      .post('/admin/login')
      .send({
        userEmail: 'admin@root.com',
        userPassword: 'root'
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      


      status: 200,
      type: 0,
      message: 'Inicio de sesión exitoso como admin :)',
      data: [
        {
          adminId: -1,
          adminEmail: 'admin@root.com',
          adminName: 'root',
          authToken: '6339313934333864356564616537613264633164623730333763316330613035'
        }
      ]
    });
  });

  it('should return 403 if the admin account is disabled', async () => {
    // Mock Admin.verifyStatus
    Admin.verifyStatus.mockResolvedValue([{ adminStatus: 'Disabled' }]);

    const response = await request(app)
      .post('/admin/login')
      .send({
        userEmail: 'admin@example.com',
        userPassword: 'password123'
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      status: 403,
      message: 'Esta cuenta de administrador se encuentra inhabilitada!'
    });
  });

  it('should return 409 if the email or password is incorrect', async () => {
    // Mock Admin.verifyStatus
    Admin.verifyStatus.mockResolvedValue([{ adminStatus: 'Active' }]);
    // Mock Admin.hashPassword
    Admin.hashPassword.mockResolvedValue([]);
    
    const response = await request(app)
      .post('/admin/login')
      .send({
        userEmail: 'admin@example.com',
        userPassword: 'password123'
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: 'Correo o contraseña incorrectos :( , intenta de nuevo.'
    });
  });

  it('should return 400 if an error occurs', async () => {
    // Mock Admin.verifyStatus
    Admin.verifyStatus.mockRejectedValue('Some error');

    const response = await request(app)
      .post('/admin/login')
      .send({
        userEmail: 'admin@example.com',
        userPassword: 'password123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      messsage: 'Some error'
    });
  });
});


