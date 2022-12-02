import { JobVacancy } from '@/infrastructure/config/database/schemas';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';

export class GetAllJobVacancyUseCases {
  constructor(private readonly repository: JobVacancyRepository) {}

  async execute(): Promise<JobVacancy[]> {
    return await this.repository.findAll();
  }
}
