import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { UserRepository } from '../auth/user.repository';
import { RentalRepository } from '../rentals/rental.repository';
import { VhsRepository } from '../vhs/vhs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RentalRepository, VhsRepository]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
