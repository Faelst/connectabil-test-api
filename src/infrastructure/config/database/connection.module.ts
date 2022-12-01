import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

const MONGO_CONNECTION = MongooseModule.forRootAsync({
  imports: [EnvironmentConfigModule],
  useFactory: async (environmentConfigService) => ({
    uri: environmentConfigService.get('MONGO_URI'),
  }),
  inject: [EnvironmentConfigService],
});

@Module({
  imports: [EnvironmentConfigModule, MONGO_CONNECTION],
})
export class ConnectionModule {}
