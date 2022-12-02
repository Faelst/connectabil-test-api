import { CompaniesModel } from '../../domain/model';
import { Companies } from '@/infrastructure/config/database/schemas';

import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';

export class CreateCompanyUseCases {
  constructor(private readonly companyRepository: CompaniesRepository) {}

  async execute(content: CompaniesModel): Promise<Companies> {
    const company = new CompaniesModel();

    company.name = content.name;
    company.address = content.address;
    company.status = content.status;

    const result = await this.companyRepository.create(company as any);

    return result as any;
  }
}
