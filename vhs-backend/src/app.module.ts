import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { typeOrmConfig } from './config/typeorm.config';
import { VhsModule } from './vhs/vhs.module';
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
    VhsModule,
    SeedModule,
  ],
})
export class AppModule {}
