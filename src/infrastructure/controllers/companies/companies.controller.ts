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
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './companies.dto';
import { UsecasesModule } from '@/infrastructure/usecases/usecases.module';
import { GetAllCompaniesUseCases } from '@/usecases/companies/get-all.usecase';
import { GetCompanyByIdUseCases } from '@/usecases/companies/get-by-id.usecase';
import { DeleteCompanyByIdUseCases } from '@/usecases/companies/delete-by-id';
import { Companies } from '@/infrastructure/config/database/schemas';
import { CompaniesModel } from '@/domain/model';

@Controller('companies')
@ApiTags('companies')
@ApiResponse({ status: 500, description: 'Internal error' })
export class CompaniesController {
  constructor(
    @Inject(UsecasesModule.CREATE_COMPANY_USECASE)
    private readonly createCompanyUseCases: UseCase<CreateCompanyUseCases>,

    @Inject(UsecasesModule.GET_ALL_COMPANIES_USECASE)
    private readonly getAllCompaniesUseCases: UseCase<GetAllCompaniesUseCases>,

    @Inject(UsecasesModule.GET_COMPANY_BY_ID_USECASE)
    private readonly getCompanyByIdUseCases: UseCase<GetCompanyByIdUseCases>,

    @Inject(UsecasesModule.DELETE_COMPANY_BY_ID_USECASE)
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
  async getAll(): Promise<any> {
    return await this.getAllCompaniesUseCases.getInstance().execute();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
  })
  async getById(@Param('id') id: string): Promise<any> {
    return await this.getCompanyByIdUseCases.getInstance().execute(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
  })
  async deleteById(@Param('id') id: string): Promise<any> {
    return await this.deleteCompanyByIdUseCases.getInstance().execute(id);
  }
}
