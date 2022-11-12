import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { SeedService } from '../src/seed/seed.service';
import { AppModule } from '../src/app.module';
import { User } from '../src/auth/entities/user.entity';
import { users } from '../src/seed/fixtures/users';

describe('Users', () => {
  let app: INestApplication;
  let httpServer: any;
  let dbConnection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<SeedService>(SeedService).getDbHandle();

    await app.init();
  });

  afterAll(async () => {
    await dbConnection.getRepository(User).delete({});
    await app.close();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const response = await request(httpServer)
        .post('/auth/signup')
        .send(users[0]);

      expect(response.status).toBe(201);

      const newUser = await dbConnection
        .getRepository(User)
        .findOne({ username: users[0].username });

      expect(newUser).toMatchObject({ username: users[0].username });
    });
  });

  describe('login', () => {
    it('should login the user', async () => {
      const userDto = users[0];
      const response = await request(httpServer)
        .post('/auth/signIn')
        .send(userDto);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });
  });
});
