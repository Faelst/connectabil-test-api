import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

import { ICompaniesRepository } from '@/domain/repositories';

export class GetAllCompaniesUseCases {
  constructor(private readonly companyRepository: ICompaniesRepository) {}

  async execute(): Promise<CompaniesModel[]> {
    const result = await this.companyRepository.findAll();

    return result;
  }
}
