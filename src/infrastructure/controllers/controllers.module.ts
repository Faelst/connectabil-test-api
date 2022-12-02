import { Module } from '@nestjs/common';

import { UsecasesModule } from '../usecases/usecases.module';
import { CompaniesController } from './companies/companies.controller';
import { JobVacancyController } from './job-vacancy/job-vacancy.controller';

@Module({
  imports: [UsecasesModule.register()],
  controllers: [CompaniesController, JobVacancyController],
})
export class ControllersModule {}
