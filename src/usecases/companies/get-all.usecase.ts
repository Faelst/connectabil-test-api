import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';

export class GetAllCompaniesUseCases {
  constructor(private readonly companyRepository: CompaniesRepository) {}

  async execute(): Promise<CompaniesModel[]> {
    const result = await this.companyRepository.findAll();

    return result;
  }
}
