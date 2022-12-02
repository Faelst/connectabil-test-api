import {
  POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE,
  REMOVE_ASSOCIATION_JOB_USECASE,
} from '@/infrastructure/usecases/providers/vacancy-companies-association.providers';
import { UseCase } from '@/infrastructure/usecases/usecases';

import {
  PostNewJobVacancyAssociationUseCases,
  PostNewJobVacancyAssociationUseCasesResponse,
} from '@/usecases/vacancy-companies-association/post-new-job.usecase';
import { RemoveAssociationJobUseCases } from '@/usecases/vacancy-companies-association/remove-association-job.usecase';
import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostNewJobVacancyAssociationDto } from './vacancy-companies-association.dto';

@Controller('job-vacancy-association')
@ApiTags('job-vacancy-association')
@ApiResponse({ status: 500, description: 'Internal error' })
export class VacancyCompaniesAssociationController {
  constructor(
    @Inject(POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE)
    private readonly postNewJobVacancyAssociationUseCases: UseCase<PostNewJobVacancyAssociationUseCases>,

    @Inject(REMOVE_ASSOCIATION_JOB_USECASE)
    private readonly removeAssociationJobUseCases: UseCase<RemoveAssociationJobUseCases>,
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

  @Delete()
  @ApiResponse({
    status: 200,
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.removeAssociationJobUseCases.getInstance().execute(id);
  }
}
