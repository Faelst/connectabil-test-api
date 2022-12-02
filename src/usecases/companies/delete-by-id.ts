import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';

export class DeleteCompanyByIdUseCases {
  constructor(private readonly companyRepository: CompaniesRepository) {}

  async execute(id: string): Promise<CompaniesModel> {
    const result = await this.companyRepository.delete(id);

    return result;
  }
}
