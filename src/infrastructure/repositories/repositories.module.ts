import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Companies as CompaniesModel,
  CompaniesSchema,
  JobVacancy as JobVacancyModel,
  JobVacancySchema,
} from '../config/database/schemas';

import { CompaniesRepository } from './companies.repository';
import { JobVacancyRepository } from './job-vacancy.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompaniesModel.name,
        schema: CompaniesSchema,
      },
      {
        name: JobVacancyModel.name,
        schema: JobVacancySchema,
      },
    ]),
  ],
  providers: [CompaniesRepository, JobVacancyRepository],
  exports: [CompaniesRepository, JobVacancyRepository],
})
export class RepositoriesModule {}
