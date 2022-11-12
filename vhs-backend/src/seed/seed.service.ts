import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';

import { VhsRepository } from '../vhs/vhs.repository';
import { vhs } from './fixtures/vhs';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private configService: ConfigService,
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(VhsRepository) private vhsRepository: VhsRepository,
  ) {}

  getDbHandle(): Connection {
    return this.connection;
  }

  async onApplicationBootstrap() {
    const seed = parseInt(this.configService.get('SEED_DB'));
    const vhsCount = await this.vhsRepository.count();

    if (seed && !vhsCount) {
      // Seed admin users
      // await Promise.all(
      //   admins.map(async (admin) => {
      //     await this.userRepository.signUp(admin, UserRole.ADMIN);
      //   }),
      // );

      // Seed normal users
      // await Promise.all(
      //   users.map(async (user) => {
      //     await this.userRepository.signUp(user);
      //   }),
      // );

      // Seed VHS tapes
      await Promise.all(
        vhs.map(async (vhs) => {
          await this.vhsRepository.createVhs(vhs);
        }),
      );

      // Seed rentals
      // await Promise.all(
      //   rentals.map(async (rental) => {
      //     const user = await this.userRepository.findOne(rental.userId);
      //     const vhs = await this.vhsRepository.findOne(rental.vhsId);

      //     await this.rentalRepository.createRental(user, vhs);
      //   }),
      // );

      this.logger.log('Database seeding completed.');
    }
  }
}
