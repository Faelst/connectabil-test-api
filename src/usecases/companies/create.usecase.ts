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
    company.zip = content.zip;
    company.state = content.state;
    company.city = content.city;
    company.neighborhood = content.neighborhood;
    company.number = content.number;

    const result = await this.companyRepository.create(company as any);

    return result as any;
  }
}
