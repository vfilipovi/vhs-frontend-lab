import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { VhsRepository } from '../vhs/vhs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VhsRepository])],
  providers: [SeedService],
})
export class SeedModule {}
