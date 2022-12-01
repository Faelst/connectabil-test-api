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

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesModule {
  static CREATE_COMPANY_USECASE = 'CreateCompanyUseCases';
  static GET_ALL_COMPANIES_USECASE = 'GetAllCompaniesUseCases';
  static GET_COMPANY_BY_ID_USECASE = 'GetCompanyByIdUseCases';
  static DELETE_COMPANY_BY_ID_USECASE = 'DeleteCompanyByIdUseCases';

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
      ],
      exports: [
        UsecasesModule.CREATE_COMPANY_USECASE,
        UsecasesModule.GET_ALL_COMPANIES_USECASE,
        UsecasesModule.GET_COMPANY_BY_ID_USECASE,
        UsecasesModule.DELETE_COMPANY_BY_ID_USECASE,
      ],
    };
  }
}
