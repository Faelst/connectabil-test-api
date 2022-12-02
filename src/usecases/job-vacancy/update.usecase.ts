import { UpdateJobVacancyDto } from '@/infrastructure/controllers/job-vacancy/job-vacancy.dto';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';

export class UpdateJobVacancyUseCase {
  constructor(private readonly jobVacancyRepository: JobVacancyRepository) {}

  async execute(jobVacancyId: string, jobVacancy: UpdateJobVacancyDto) {
    const result = await this.jobVacancyRepository.update(
      jobVacancyId,
      jobVacancy,
    );

    return result;
  }
}
