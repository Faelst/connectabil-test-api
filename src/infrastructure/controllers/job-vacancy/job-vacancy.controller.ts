import { JobVacancyModel } from '@/domain/model/job-vacancy.model';
import { JobVacancy } from '@/infrastructure/config/database/schemas';
import { UseCase } from '@/infrastructure/usecases/usecases';
import { UsecasesModule } from '@/infrastructure/usecases/usecases.module';
import { CreateJobVacancyUseCases } from '@/usecases/job-vacancy/create.usecase';
import { DeleteJobVacancyByIdUseCases } from '@/usecases/job-vacancy/delete-by-id';
import { GetAllJobVacancyUseCases } from '@/usecases/job-vacancy/get-all.usecases';
import { GetJobVacancyByIdUseCases } from '@/usecases/job-vacancy/get-by-id.usecase';
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
import { CreateJobVacancyDto } from './job-vacancy.dto';

@Controller('job-vacancy')
@ApiTags('job-vacancy')
@ApiResponse({ status: 500, description: 'Internal error' })
export class JobVacancyController {
  constructor(
    @Inject(UsecasesModule.CREATE_JOB_VACANCY_USECASE)
    private readonly createJobVacancyUseCases: UseCase<CreateJobVacancyUseCases>,

    @Inject(UsecasesModule.GET_ALL_JOB_VACANCY_USECASE)
    private readonly getAllJobVacancyUseCases: UseCase<GetAllJobVacancyUseCases>,

    @Inject(UsecasesModule.GET_JOB_VACANCY_BY_ID_USECASE)
    private readonly getJobVacancyByIdUseCases: UseCase<GetJobVacancyByIdUseCases>,

    @Inject(UsecasesModule.DELETE_JOB_VACANCY_BY_ID_USECASE)
    private readonly deleteJobVacancyByIdUseCases: UseCase<DeleteJobVacancyByIdUseCases>,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() bodyData: CreateJobVacancyDto,
  ): Promise<JobVacancyModel> {
    const result = await this.createJobVacancyUseCases
      .getInstance()
      .execute(bodyData as JobVacancyModel);

    return result as any;
  }

  @Get()
  @ApiResponse({
    status: 200,
  })
  async getAll(): Promise<any> {
    return await this.getAllJobVacancyUseCases.getInstance().execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async getById(@Param('id') id: string): Promise<JobVacancy> {
    const result = await this.getJobVacancyByIdUseCases
      .getInstance()
      .execute(id);

    return result;
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async deleteById(@Param('id') id: string): Promise<JobVacancy> {
    const result = await this.deleteJobVacancyByIdUseCases
      .getInstance()
      .execute(id);

    return result;
  }
}
