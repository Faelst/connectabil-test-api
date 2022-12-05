import { Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ConnectionModule } from './infrastructure/config/database/connection.module';

@Module({
  //
  imports: [
    EnvironmentConfigModule,
    ExceptionsModule,
    ConnectionModule,
    ControllersModule,
    RepositoriesModule,
  ],
})
export class AppModule {}
