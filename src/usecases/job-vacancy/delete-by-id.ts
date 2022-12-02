import { JobVacancy } from '@/infrastructure/config/database/schemas';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';

export class DeleteJobVacancyByIdUseCases {
  constructor(private readonly repository: JobVacancyRepository) {}

  async execute(id: string): Promise<JobVacancy> {
    const result = await this.repository.delete(id);

    return result;
  }
}
