import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';
import { UseCase } from '@/infrastructure/usecases/usecases';
import { UsecasesModule } from '@/infrastructure/usecases/usecases.module';
import {
  PostNewJobVacancyAssociationUseCases,
  PostNewJobVacancyAssociationUseCasesResponse,
} from '@/usecases/vacancy-companies-association/post-new-job.usecase';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostNewJobVacancyAssociationDto } from './vacancy-companies-association.dto';

@Controller('job-vacancy-association')
@ApiTags('job-vacancy-association')
@ApiResponse({ status: 500, description: 'Internal error' })
export class VacancyCompaniesAssociationController {
  constructor(
    @Inject(UsecasesModule.POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE)
    private readonly postNewJobVacancyAssociationUseCases: UseCase<PostNewJobVacancyAssociationUseCases>,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
  })
  async create(
    @Body()
    { companyId, jobVacancyId }: PostNewJobVacancyAssociationDto,
  ): Promise<PostNewJobVacancyAssociationUseCasesResponse> {
    const result = await this.postNewJobVacancyAssociationUseCases
      .getInstance()
      .execute({
        companyId,
        jobVacancyId,
      });

    return result;
  }
}
