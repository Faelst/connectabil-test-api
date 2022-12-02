import { Module } from '@nestjs/common';

import { UsecasesModule } from '../usecases/usecases.module';
import { CompaniesController } from './companies/companies.controller';
import { JobVacancyController } from './job-vacancy/job-vacancy.controller';
import { VacancyCompaniesAssociationController } from './vacancy-companies-association/vacancy-companies-association.controller';

@Module({
  imports: [UsecasesModule.register()],
  controllers: [
    CompaniesController,
    JobVacancyController,
    VacancyCompaniesAssociationController,
  ],
})
export class ControllersModule {}
