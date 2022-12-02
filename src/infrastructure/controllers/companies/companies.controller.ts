import { UseCase } from '@/infrastructure/usecases/usecases';
import { CreateCompanyUseCases } from '@/usecases/companies/create.usecase';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto, UpdateCompanyDto } from './companies.dto';
import { UsecasesModule } from '@/infrastructure/usecases/usecases.module';
import { GetAllCompaniesUseCases } from '@/usecases/companies/get-all.usecase';
import { GetCompanyByIdUseCases } from '@/usecases/companies/get-by-id.usecase';
import { DeleteCompanyByIdUseCases } from '@/usecases/companies/delete-by-id';
import { Companies } from '@/infrastructure/config/database/schemas';
import { CompaniesModel } from '@/domain/model';
import {
  CREATE_COMPANY_USECASE,
  DELETE_COMPANY_BY_ID_USECASE,
  GET_ALL_COMPANIES_USECASE,
  GET_COMPANY_BY_ID_USECASE,
  UPDATE_COMPANY_BY_ID_USECASE,
} from '@/infrastructure/usecases/providers/Companies.providers';
import { UpdateCompanyUseCase } from '@/usecases/companies/update.usecase';

@Controller('companies')
@ApiTags('companies')
@ApiResponse({ status: 500, description: 'Internal error' })
export class CompaniesController {
  constructor(
    @Inject(CREATE_COMPANY_USECASE)
    private readonly createCompanyUseCases: UseCase<CreateCompanyUseCases>,

    @Inject(GET_ALL_COMPANIES_USECASE)
    private readonly getAllCompaniesUseCases: UseCase<GetAllCompaniesUseCases>,

    @Inject(GET_COMPANY_BY_ID_USECASE)
    private readonly getCompanyByIdUseCases: UseCase<GetCompanyByIdUseCases>,

    @Inject(UPDATE_COMPANY_BY_ID_USECASE)
    private readonly updateCompanyUseCase: UseCase<UpdateCompanyUseCase>,

    @Inject(DELETE_COMPANY_BY_ID_USECASE)
    private readonly deleteCompanyByIdUseCases: UseCase<DeleteCompanyByIdUseCases>,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() bodyData: CreateCompanyDto): Promise<Companies> {
    return await this.createCompanyUseCases
      .getInstance()
      .execute(bodyData as CompaniesModel);
  }

  @Get()
  @ApiResponse({
    status: 200,
  })
  async getAll(): Promise<Companies[]> {
    return await this.getAllCompaniesUseCases.getInstance().execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async getById(@Param('id') id: string): Promise<Companies> {
    return await this.getCompanyByIdUseCases.getInstance().execute(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async deleteById(@Param('id') id: string): Promise<Companies> {
    return await this.deleteCompanyByIdUseCases.getInstance().execute(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
  })
  async updateById(
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
  ): Promise<Companies> {
    return await this.updateCompanyUseCase.getInstance().execute(id, data);
  }
}
