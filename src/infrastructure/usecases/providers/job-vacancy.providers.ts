import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';
import { CreateJobVacancyUseCases } from '@/usecases/job-vacancy/create.usecase';
import { DeleteJobVacancyByIdUseCases } from '@/usecases/job-vacancy/delete-by-id.usecase';
import { GetAllJobVacancyUseCases } from '@/usecases/job-vacancy/get-all.usecases';
import { GetJobVacancyByIdUseCases } from '@/usecases/job-vacancy/get-by-id.usecase';
import { UpdateJobVacancyUseCase } from '@/usecases/job-vacancy/update.usecase';
import { UseCase } from '../usecases';

export const CREATE_JOB_VACANCY_USECASE = 'CreateJobVacancyUseCases';
export const GET_ALL_JOB_VACANCY_USECASE = 'GetAllJobVacancyUseCases';
export const GET_JOB_VACANCY_BY_ID_USECASE = 'GetJobVacancyByIdUseCases';
export const DELETE_JOB_VACANCY_BY_ID_USECASE = 'DeleteJobVacancyByIdUseCases';
export const UPDATE_JOB_VACANCY_BY_ID_USECASE = 'UpdateJobVacancyByIdUseCases';

export const jobVacancyUseCaseProviders = [
  {
    inject: [JobVacancyRepository],
    provide: CREATE_JOB_VACANCY_USECASE,
    useFactory: (JobVacancyRepository: JobVacancyRepository) => {
      return new UseCase(new CreateJobVacancyUseCases(JobVacancyRepository));
    },
  },
  {
    inject: [JobVacancyRepository],
    provide: GET_ALL_JOB_VACANCY_USECASE,
    useFactory: (JobVacancyRepository: JobVacancyRepository) => {
      return new UseCase(new GetAllJobVacancyUseCases(JobVacancyRepository));
    },
  },
  {
    inject: [JobVacancyRepository],
    provide: GET_JOB_VACANCY_BY_ID_USECASE,
    useFactory: (JobVacancyRepository: JobVacancyRepository) => {
      return new UseCase(new GetJobVacancyByIdUseCases(JobVacancyRepository));
    },
  },
  {
    inject: [JobVacancyRepository],
    provide: DELETE_JOB_VACANCY_BY_ID_USECASE,
    useFactory: (JobVacancyRepository: JobVacancyRepository) => {
      return new UseCase(
        new DeleteJobVacancyByIdUseCases(JobVacancyRepository),
      );
    },
  },
  {
    inject: [JobVacancyRepository],
    provide: UPDATE_JOB_VACANCY_BY_ID_USECASE,
    useFactory: (JobVacancyRepository: JobVacancyRepository) => {
      return new UseCase(new UpdateJobVacancyUseCase(JobVacancyRepository));
    },
  },
];
