import { JobVacancy } from '@/infrastructure/config/database/schemas';
import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { JobVacancyRepository } from '@/infrastructure/repositories/job-vacancy.repository';

export class DeleteJobVacancyByIdUseCases {
  constructor(
    private readonly repository: JobVacancyRepository,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute(id: string): Promise<JobVacancy> {
    const jobVacancy = await this.repository.findById(id);

    if (!jobVacancy) {
      this.exceptionService.badRequestException({
        message: 'Job vacancy not found',
      });
    }

    const result = await this.repository.delete(id);

    return result;
  }
}
