import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

const MONGO_CONNECTION = MongooseModule.forRootAsync({
  imports: [EnvironmentConfigModule],
  inject: [EnvironmentConfigService],
  useFactory: async (environmentConfigService) => {
    console.log(environmentConfigService.getUri('MONGO_URL'));
    return {
      uri: environmentConfigService.getUri(),
    };
  },
});

@Module({
  imports: [MONGO_CONNECTION, EnvironmentConfigModule],
})
export class ConnectionModule {}
