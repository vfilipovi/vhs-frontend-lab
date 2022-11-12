import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { typeOrmConfig } from './config/typeorm.config';
import { VhsModule } from './vhs/vhs.module';
import { RentalsModule } from './rentals/rentals.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
    // AuthModule,
    VhsModule,
    RentalsModule,
    SeedModule,
  ],
})
export class AppModule {}
