import { Companies } from '@/infrastructure/config/database/schemas';
import { UpdateCompanyDto } from '@/infrastructure/controllers/companies/companies.dto';
import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';

export class UpdateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompaniesRepository,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute(companyId: string, data: UpdateCompanyDto): Promise<Companies> {
    const companyFound = await this.companyRepository.findById(companyId);

    if (!companyFound) {
      this.exceptionService.badRequestException({
        message: 'Company not found',
      });
    }

    const companyUpdated = await this.companyRepository.update(companyId, data);

    return companyUpdated;
  }
}
