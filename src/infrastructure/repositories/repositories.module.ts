import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Companies,
  CompaniesSchema,
  JobVacancy,
  JobVacancySchema,
  VacancyCompaniesAssociation,
  VacancyCompaniesAssociationSchema,
} from '../config/database/schemas';

import { CompaniesRepository } from './companies.repository';
import { JobVacancyRepository } from './job-vacancy.repository';
import { VacancyCompaniesAssociationRepository } from './vacancy-companies-association.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Companies.name,
        schema: CompaniesSchema,
      },
      {
        name: JobVacancy.name,
        schema: JobVacancySchema,
      },
      {
        name: VacancyCompaniesAssociation.name,
        schema: VacancyCompaniesAssociationSchema,
      },
    ]),
  ],
  providers: [
    CompaniesRepository,
    JobVacancyRepository,
    VacancyCompaniesAssociationRepository,
  ],
  exports: [
    CompaniesRepository,
    JobVacancyRepository,
    VacancyCompaniesAssociationRepository,
  ],
})
export class RepositoriesModule {}
