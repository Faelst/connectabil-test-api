import { JobVacancy } from '@/infrastructure/config/database/schemas';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';

export class GetJobVacancyByIdUseCases {
  constructor(private readonly repository: JobVacancyRepository) {}

  async execute(id: string): Promise<JobVacancy> {
    return await this.repository.findById(id);
  }
}
