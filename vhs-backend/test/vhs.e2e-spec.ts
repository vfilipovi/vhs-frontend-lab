import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { SeedService } from '../src/seed/seed.service';
import { AppModule } from '../src/app.module';
import { Vhs } from '../src/vhs/entities/vhs.entity';
import { VhsService } from '../src/vhs/vhs.service';
import { vhs } from '../src/seed/fixtures/vhs';
import { UpdateVhsDto } from '../src/vhs/dto/update-vhs.dto';

describe('Vhs', () => {
  let app: INestApplication;
  let httpServer: any;
  let dbConnection: Connection;

  let vhsService: VhsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<SeedService>(SeedService).getDbHandle();

    vhsService = moduleRef.get<VhsService>(VhsService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.getRepository(Vhs).delete({});
  });

  describe('getAllVhs', () => {
    it('should return an array of vhs', async () => {
      await vhsService.createVhs(vhs[0]);
      const response = await request(httpServer).get('/vhs');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([vhs[0]]);
    });
  });

  describe('getVhsById', () => {
    it('should return one vhs', async () => {
      const newVhs = await vhsService.createVhs(vhs[0]);
      const response = await request(httpServer).get(`/vhs/${newVhs.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(vhs[0]);
    });
  });

  describe('createVhs', () => {
    it('should create a new vhs', async () => {
      const vhsDto = vhs[0];
      const response = await request(httpServer).post('/vhs').send(vhsDto);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(vhsDto);

      const newVhs = await dbConnection
        .getRepository(Vhs)
        .findOne({ title: vhsDto.title });

      expect(newVhs).toMatchObject(vhsDto);
    });
  });

  describe('updateVhs', () => {
    it('should update a vhs', async () => {
      const newVhs = await vhsService.createVhs(vhs[0]);

      const partialUpdateData: UpdateVhsDto = {
        genre: 'action',
        duration: 101,
        rentalPrice: 50,
      };

      const response = await request(httpServer)
        .patch(`/vhs/${newVhs.id}`)
        .send(partialUpdateData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(partialUpdateData);

      const updatedVhs = await dbConnection
        .getRepository(Vhs)
        .findOne({ id: newVhs.id });

      expect(updatedVhs).toMatchObject(partialUpdateData);
    });
  });

  describe('deleteVhs', () => {
    it('should delete a vhs', async () => {
      const newVhs = await vhsService.createVhs(vhs[0]);

      const response = await request(httpServer).delete(`/vhs/${newVhs.id}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});

      const deletedVhs = await dbConnection
        .getRepository(Vhs)
        .findOne({ id: newVhs.id });

      expect(deletedVhs).toBeUndefined();
    });
  });
});
