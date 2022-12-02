import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';
import { CreateCompanyUseCases } from '@/usecases/companies/create.usecase';
import { DeleteCompanyByIdUseCases } from '@/usecases/companies/delete-by-id';
import { GetAllCompaniesUseCases } from '@/usecases/companies/get-all.usecase';
import { GetCompanyByIdUseCases } from '@/usecases/companies/get-by-id.usecase';
import { UpdateCompanyUseCase } from '@/usecases/companies/update.usecase';
import { UseCase } from '../usecases';

export const CREATE_COMPANY_USECASE = 'CreateCompanyUseCases';
export const GET_ALL_COMPANIES_USECASE = 'GetAllCompaniesUseCases';
export const GET_COMPANY_BY_ID_USECASE = 'GetCompanyByIdUseCases';
export const DELETE_COMPANY_BY_ID_USECASE = 'DeleteCompanyByIdUseCases';
export const UPDATE_COMPANY_BY_ID_USECASE = 'UpdateCompanyByIdUseCases';

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
    inject: [
      CompaniesRepository,
      VacancyCompaniesAssociationRepository,
      ExceptionsService,
    ],
    provide: DELETE_COMPANY_BY_ID_USECASE,
    useFactory: (
      companiesRepository: CompaniesRepository,
      vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
      exceptionService: ExceptionsService,
    ) => {
      return new UseCase(
        new DeleteCompanyByIdUseCases(
          companiesRepository,
          vacancyCompaniesAssociationRepository,
          exceptionService,
        ),
      );
    },
  },
  {
    inject: [CompaniesRepository, ExceptionsService],
    provide: UPDATE_COMPANY_BY_ID_USECASE,
    useFactory: (
      companiesRepository: CompaniesRepository,
      exceptionsService: ExceptionsService,
    ) => {
      return new UseCase(
        new UpdateCompanyUseCase(companiesRepository, exceptionsService),
      );
    },
  },
];
