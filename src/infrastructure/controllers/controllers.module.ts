import { Module } from '@nestjs/common';

import { UsecasesModule } from '../usecases/usecases.module';
import { CompaniesController } from './companies/companies.controller';

@Module({
  imports: [UsecasesModule.register()],
  controllers: [CompaniesController],
})
export class ControllersModule {}
