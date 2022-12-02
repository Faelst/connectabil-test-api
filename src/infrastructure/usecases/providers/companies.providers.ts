import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';
import { CreateCompanyUseCases } from '@/usecases/companies/create.usecase';
import { DeleteCompanyByIdUseCases } from '@/usecases/companies/delete-by-id';
import { GetAllCompaniesUseCases } from '@/usecases/companies/get-all.usecase';
import { GetCompanyByIdUseCases } from '@/usecases/companies/get-by-id.usecase';
import { UseCase } from '../usecases';

export const CREATE_COMPANY_USECASE = 'CreateCompanyUseCases';
export const GET_ALL_COMPANIES_USECASE = 'GetAllCompaniesUseCases';
export const GET_COMPANY_BY_ID_USECASE = 'GetCompanyByIdUseCases';
export const DELETE_COMPANY_BY_ID_USECASE = 'DeleteCompanyByIdUseCases';

export const companiesUseCaseProviders = [
  {
    inject: [CompaniesRepository],
    provide: CREATE_COMPANY_USECASE,
    useFactory: (companiesRepository: CompaniesRepository) => {
      return new UseCase(new CreateCompanyUseCases(companiesRepository));
    },
  },
  {
    inject: [CompaniesRepository],
    provide: GET_ALL_COMPANIES_USECASE,
    useFactory: (companiesRepository: CompaniesRepository) => {
      return new UseCase(new GetAllCompaniesUseCases(companiesRepository));
    },
  },
  {
    inject: [CompaniesRepository],
    provide: GET_COMPANY_BY_ID_USECASE,
    useFactory: (companiesRepository: CompaniesRepository) => {
      return new UseCase(new GetCompanyByIdUseCases(companiesRepository));
    },
  },
  {
    inject: [CompaniesRepository],
    provide: DELETE_COMPANY_BY_ID_USECASE,
    useFactory: (companiesRepository: CompaniesRepository) => {
      return new UseCase(new DeleteCompanyByIdUseCases(companiesRepository));
    },
  },
];
