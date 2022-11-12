import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { SeedService } from '../src/seed/seed.service';
import { AppModule } from '../src/app.module';
import { RentalsService } from '../src/rentals/rentals.service';
import { Rental } from '../src/rentals/entities/rental.entity';
import { UpdateRentalDto } from '../src/rentals/dto/update-rental.dto';
import { VhsService } from '../src/vhs/vhs.service';
import { AuthService } from '../src/auth/auth.service';
import { vhs } from '../src/seed/fixtures/vhs';
import { User } from '../src/auth/entities/user.entity';
import { Vhs } from '../src/vhs/entities/vhs.entity';
import { users } from '../src/seed/fixtures/users';
import { CreateRentalDto } from '../src/rentals/dto/create-rental.dto';

describe('Rentals', () => {
  let app: INestApplication;
  let httpServer: any;
  let dbConnection: Connection;

  let rentalsService: RentalsService;
  let vhsService: VhsService;
  let authService: AuthService;

  let testUser: User;
  let testVhs: Vhs;
  let testRentalDto: CreateRentalDto;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<SeedService>(SeedService).getDbHandle();

    rentalsService = moduleRef.get<RentalsService>(RentalsService);
    authService = moduleRef.get<AuthService>(AuthService);
    vhsService = moduleRef.get<VhsService>(VhsService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await authService.signUp(users[0]);

    testUser = await dbConnection
      .getRepository(User)
      .findOne({ username: users[0].username });

    testVhs = await vhsService.createVhs(vhs[0]);
    testRentalDto = { userId: testUser.id, vhsId: testVhs.id };
  });

  afterEach(async () => {
    await dbConnection.getRepository(Rental).delete({});
    await dbConnection.getRepository(User).delete({});
    await dbConnection.getRepository(Vhs).delete({});
  });

  describe('getAllRentals', () => {
    it('should return an array of rentals', async () => {
      await rentalsService.createRental(testRentalDto);
      const response = await request(httpServer).get('/rentals');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([{ lateFee: 0, returned_at: null }]);
    });
  });

  describe('getRentalById', () => {
    it('should return one rental', async () => {
      const newVhs = await rentalsService.createRental(testRentalDto);
      const response = await request(httpServer).get(`/rentals/${newVhs.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        user: testUser,
        vhs: { ...testVhs, quantity: 0 },
      });
    });
  });

  describe('createRental', () => {
    it('should create a new rental', async () => {
      const response = await request(httpServer)
        .post('/rentals')
        .send(testRentalDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        user: testUser,
        vhs: { ...testVhs, quantity: 0 },
      });
    });
  });

  describe('updateRental', () => {
    it('should update rental', async () => {
      const newRental = await rentalsService.createRental(testRentalDto);

      const partialUpdateData: UpdateRentalDto = {
        returned_at: new Date(new Date().toISOString()),
      };

      const response = await request(httpServer)
        .patch(`/rentals/${newRental.id}`)
        .send(partialUpdateData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        user: testUser,
        vhs: testVhs,
      });
      expect(response.body).toHaveProperty('returned_at');

      const updatedRental = await dbConnection
        .getRepository(Rental)
        .findOne({ id: newRental.id });

      expect(updatedRental).toMatchObject({
        user: testUser,
        vhs: testVhs,
      });
    });
  });

  describe('deleteRental', () => {
    it('should delete a vhs', async () => {
      const newRental = await rentalsService.createRental(testRentalDto);

      const response = await request(httpServer).delete(
        `/rentals/${newRental.id}`,
      );

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      const deletedRental = await dbConnection
        .getRepository(Rental)
        .findOne({ id: newRental.id });

      expect(deletedRental).toBeUndefined();
    });
  });
});
