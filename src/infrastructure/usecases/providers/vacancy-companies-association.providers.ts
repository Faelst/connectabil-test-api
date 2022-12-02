import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';
import { GetAllJobAssociationUseCases } from '@/usecases/vacancy-companies-association/get-all-job-association.usecase';
import { PostNewJobVacancyAssociationUseCases } from '@/usecases/vacancy-companies-association/post-new-job.usecase';
import { RemoveAssociationJobUseCases } from '@/usecases/vacancy-companies-association/remove-association-job.usecase';
import { UseCase } from '../usecases';

export const POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE =
  'PostNewJobVacancyAssociationUseCases';
export const REMOVE_ASSOCIATION_JOB_USECASE = 'RemoveAssociationJobUseCases';
export const GET_ALL_JOB_ASSOCIATION_USECASE = 'GetAllJobAssociationUseCases';

export const vacancyCompaniesAssociationUseCaseProviders = [
  {
    inject: [
      VacancyCompaniesAssociationRepository,
      JobVacancyRepository,
      CompaniesRepository,
      ExceptionsService,
    ],
    provide: POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE,
    useFactory: (
      vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
      jobVacancyRepository: JobVacancyRepository,
      companiesRepository: CompaniesRepository,
      exceptionsService: ExceptionsService,
    ) => {
      return new UseCase(
        new PostNewJobVacancyAssociationUseCases(
          vacancyCompaniesAssociationRepository,
          jobVacancyRepository,
          companiesRepository,
          exceptionsService,
        ),
      );
    },
  },
  {
    inject: [VacancyCompaniesAssociationRepository, ExceptionsService],
    provide: REMOVE_ASSOCIATION_JOB_USECASE,
    useFactory: (
      vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
      exceptionsService: ExceptionsService,
    ) => {
      return new UseCase(
        new RemoveAssociationJobUseCases(
          vacancyCompaniesAssociationRepository,
          exceptionsService,
        ),
      );
    },
  },
  {
    inject: [VacancyCompaniesAssociationRepository],
    provide: GET_ALL_JOB_ASSOCIATION_USECASE,
    useFactory: (
      vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
    ) => {
      return new UseCase(
        new GetAllJobAssociationUseCases(vacancyCompaniesAssociationRepository),
      );
    },
  },
];
