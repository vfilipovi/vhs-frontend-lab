import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { RentalRepository } from './rental.repository';
import { UserRepository } from '../auth/user.repository';
import { VhsRepository } from '../vhs/vhs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentalRepository, VhsRepository, UserRepository]),
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
