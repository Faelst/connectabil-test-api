import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';
import { ICompaniesRepository } from '@/domain/repositories';

export class DeleteCompanyByIdUseCases {
  constructor(private readonly companyRepository: ICompaniesRepository) {}

  async execute(id: string): Promise<CompaniesModel> {
    const result = await this.companyRepository.update(
      id,
      {
        deleted: true,
        updatedAt: new Date(),
      },
      { new: true },
    );

    return result;
  }
}
