import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';
import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';

import { CompaniesRepository } from '@/infrastructure/repositories/companies.repository';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';

export class DeleteCompanyByIdUseCases {
  constructor(
    private readonly companyRepository: CompaniesRepository,
    private readonly vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute(id: string): Promise<CompaniesModel> {
    const haveJobAssociations =
      await this.vacancyCompaniesAssociationRepository.findByCompanyId(id);

    if (haveJobAssociations.length) {
      this.exceptionService.badRequestException({
        message: 'This company has job vacancies associated',
      });
    }

    const result = await this.companyRepository.delete(id);

    return result;
  }
}
