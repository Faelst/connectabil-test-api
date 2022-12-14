import {
  GET_ALL_JOB_ASSOCIATION_USECASE,
  POST_NEW_JOB_VACANCY_ASSOCIATION_USECASE,
  REMOVE_ASSOCIATION_JOB_USECASE,
} from '@/infrastructure/usecases/providers/vacancy-companies-association.providers';
import { UseCase } from '@/infrastructure/usecases/usecases';
import { GetAllJobAssociationUseCases } from '@/usecases/vacancy-companies-association/get-all-job-association.usecase';

import {
  PostNewJobVacancyAssociationUseCases,
  PostNewJobVacancyAssociationUseCasesResponse,
} from '@/usecases/vacancy-companies-association/post-new-job.usecase';
import { RemoveAssociationJobUseCases } from '@/usecases/vacancy-companies-association/remove-association-job.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
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

    @Inject(GET_ALL_JOB_ASSOCIATION_USECASE)
    private readonly getAllJobAssociationUseCases: UseCase<GetAllJobAssociationUseCases>,
  ) {}

  @Get()
  async findAll(): Promise<any> {
    const result = await this.getAllJobAssociationUseCases
      .getInstance()
      .execute();

    return result;
  }

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

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.removeAssociationJobUseCases.getInstance().execute(id);
  }
}
