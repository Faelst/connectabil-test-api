import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from '@/infrastructure/repositories/repositories.module';
import { ExceptionsModule } from '@/infrastructure/exceptions/exceptions.module';
import { DynamicModule } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/companies.repository';
import { CreateCompanyUseCases } from '@/usecases/companies/create.usecase';
import { UseCase } from './usecases';
import { GetAllCompaniesUseCases } from '@/usecases/companies/get-all.usecase';
import { GetCompanyByIdUseCases } from '@/usecases/companies/get-by-id.usecase';
import { DeleteCompanyByIdUseCases } from '@/usecases/companies/delete-by-id';
import { JobVacancyRepository } from '../repositories/job-vacancy.repository';
import { CreateJobVacancyUseCases } from '@/usecases/job-vacancy/create.usecase';
import { GetAllJobVacancyUseCases } from '@/usecases/job-vacancy/get-all.usecases';
import { GetJobVacancyByIdUseCases } from '@/usecases/job-vacancy/get-by-id.usecase';
import { DeleteJobVacancyByIdUseCases } from '@/usecases/job-vacancy/delete-by-id';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesModule {
  static CREATE_COMPANY_USECASE = 'CreateCompanyUseCases';
  static GET_ALL_COMPANIES_USECASE = 'GetAllCompaniesUseCases';
  static GET_COMPANY_BY_ID_USECASE = 'GetCompanyByIdUseCases';
  static DELETE_COMPANY_BY_ID_USECASE = 'DeleteCompanyByIdUseCases';

  static CREATE_JOB_VACANCY_USECASE = 'CreateJobVacancyUseCases';
  static GET_ALL_JOB_VACANCY_USECASE = 'GetAllJobVacancyUseCases';
  static GET_JOB_VACANCY_BY_ID_USECASE = 'GetJobVacancyByIdUseCases';
  static DELETE_JOB_VACANCY_BY_ID_USECASE = 'DeleteJobVacancyByIdUseCases';

  static register(): DynamicModule {
    return {
      module: UsecasesModule,
      providers: [
        {
          inject: [CompaniesRepository],
          provide: UsecasesModule.CREATE_COMPANY_USECASE,
          useFactory: (companiesRepository: CompaniesRepository) => {
            return new UseCase(new CreateCompanyUseCases(companiesRepository));
          },
        },
        {
          inject: [CompaniesRepository],
          provide: UsecasesModule.GET_ALL_COMPANIES_USECASE,
          useFactory: (companiesRepository: CompaniesRepository) => {
            return new UseCase(
              new GetAllCompaniesUseCases(companiesRepository),
            );
          },
        },
        {
          inject: [CompaniesRepository],
          provide: UsecasesModule.GET_COMPANY_BY_ID_USECASE,
          useFactory: (companiesRepository: CompaniesRepository) => {
            return new UseCase(new GetCompanyByIdUseCases(companiesRepository));
          },
        },
        {
          inject: [CompaniesRepository],
          provide: UsecasesModule.DELETE_COMPANY_BY_ID_USECASE,
          useFactory: (companiesRepository: CompaniesRepository) => {
            return new UseCase(
              new DeleteCompanyByIdUseCases(companiesRepository),
            );
          },
        },
        {
          inject: [JobVacancyRepository],
          provide: UsecasesModule.CREATE_JOB_VACANCY_USECASE,
          useFactory: (JobVacancyRepository: JobVacancyRepository) => {
            return new UseCase(
              new CreateJobVacancyUseCases(JobVacancyRepository),
            );
          },
        },
        {
          inject: [JobVacancyRepository],
          provide: UsecasesModule.GET_ALL_JOB_VACANCY_USECASE,
          useFactory: (JobVacancyRepository: JobVacancyRepository) => {
            return new UseCase(
              new GetAllJobVacancyUseCases(JobVacancyRepository),
            );
          },
        },
        {
          inject: [JobVacancyRepository],
          provide: UsecasesModule.GET_JOB_VACANCY_BY_ID_USECASE,
          useFactory: (JobVacancyRepository: JobVacancyRepository) => {
            return new UseCase(
              new GetJobVacancyByIdUseCases(JobVacancyRepository),
            );
          },
        },
        {
          inject: [JobVacancyRepository],
          provide: UsecasesModule.DELETE_JOB_VACANCY_BY_ID_USECASE,
          useFactory: (JobVacancyRepository: JobVacancyRepository) => {
            return new UseCase(
              new DeleteJobVacancyByIdUseCases(JobVacancyRepository),
            );
          },
        },
      ],
      exports: [
        UsecasesModule.CREATE_COMPANY_USECASE,
        UsecasesModule.GET_ALL_COMPANIES_USECASE,
        UsecasesModule.GET_COMPANY_BY_ID_USECASE,
        UsecasesModule.DELETE_COMPANY_BY_ID_USECASE,
        UsecasesModule.CREATE_JOB_VACANCY_USECASE,
        UsecasesModule.GET_ALL_JOB_VACANCY_USECASE,
        UsecasesModule.GET_JOB_VACANCY_BY_ID_USECASE,
        UsecasesModule.DELETE_JOB_VACANCY_BY_ID_USECASE,
      ],
    };
  }
}
