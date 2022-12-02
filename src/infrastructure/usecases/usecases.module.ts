import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { DynamicModule } from '@nestjs/common';

import {
  companiesUseCaseProviders,
  CREATE_COMPANY_USECASE,
  DELETE_COMPANY_BY_ID_USECASE,
  GET_ALL_COMPANIES_USECASE,
  GET_COMPANY_BY_ID_USECASE,
} from './providers/Companies.providers';
import {
  CREATE_JOB_VACANCY_USECASE,
  DELETE_JOB_VACANCY_BY_ID_USECASE,
  GET_ALL_JOB_VACANCY_USECASE,
  GET_JOB_VACANCY_BY_ID_USECASE,
  jobVacancyUseCaseProviders,
} from './providers/job-vacancy.providers';
import {
  POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE,
  REMOVE_ASSOCIATION_JOB_USECASE,
  vacancyCompaniesAssociationUseCaseProviders,
} from './providers/vacancy-companies-association.providers';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesModule {
  static register(): DynamicModule {
    return {
      module: UsecasesModule,
      providers: [
        ...companiesUseCaseProviders,
        ...jobVacancyUseCaseProviders,
        ...vacancyCompaniesAssociationUseCaseProviders,
      ],
      exports: [
        CREATE_COMPANY_USECASE,
        GET_ALL_COMPANIES_USECASE,
        GET_COMPANY_BY_ID_USECASE,
        DELETE_COMPANY_BY_ID_USECASE,
        CREATE_JOB_VACANCY_USECASE,
        GET_ALL_JOB_VACANCY_USECASE,
        GET_JOB_VACANCY_BY_ID_USECASE,
        DELETE_JOB_VACANCY_BY_ID_USECASE,
        POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE,
        REMOVE_ASSOCIATION_JOB_USECASE,
      ],
    };
  }
}
