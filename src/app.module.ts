import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/connectabil_test'),
    EnvironmentConfigModule,
    ExceptionsModule,
    ControllersModule,
    RepositoriesModule,
  ],
})
export class AppModule {}