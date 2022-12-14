import { ExceptionsService } from '@/infrastructure/exceptions/exceptions.service';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';

export class RemoveAssociationJobUseCases {
  constructor(
    private readonly vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
    private readonly exceptionService: ExceptionsService,
  ) {}

  async execute(VacancyCompaniesAssociationId: string) {
    const vacancyCompaniesAssociation =
      await this.vacancyCompaniesAssociationRepository.findById(
        VacancyCompaniesAssociationId,
      );

    if (!vacancyCompaniesAssociation) {
      this.exceptionService.badRequestException({
        message: 'Vacancy companies association not found',
      });
    }

    await this.vacancyCompaniesAssociationRepository.delete(
      VacancyCompaniesAssociationId,
    );
  }
}
