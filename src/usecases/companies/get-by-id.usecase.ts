import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

import { ICompaniesRepository } from '@/domain/repositories';

export class GetCompanyByIdUseCases {
  constructor(private readonly companyRepository: ICompaniesRepository) {}

  async execute(id: string): Promise<CompaniesModel> {
    const result = await this.companyRepository.findById(id);
    return result;
  }
}
