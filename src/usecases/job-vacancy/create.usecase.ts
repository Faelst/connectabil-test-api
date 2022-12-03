import { JobVacancyModel } from '@/domain/model/job-vacancy.model';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';
import { JobVacancy } from '../../infrastructure/config/database/schemas';

export class CreateJobVacancyUseCases {
  constructor(private readonly JobVacancyRepository: JobVacancyRepository) {}

  async execute(content: JobVacancyModel): Promise<JobVacancy> {
    const jobVacancy = new JobVacancy();

    jobVacancy.title = content.title;
    jobVacancy.description = content.description;
    jobVacancy.status = content.status;
    jobVacancy.type = content.type;

    const result = await this.JobVacancyRepository.create(jobVacancy);

    return result as any;
  }
}
