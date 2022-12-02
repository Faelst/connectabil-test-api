import { VacancyCompaniesAssociation } from '@/infrastructure/config/database/schemas';
import { VacancyCompaniesAssociationRepository } from '@/infrastructure/repositories/vacancy-companies-association.repository';

export class GetAllJobAssociationUseCases {
  constructor(
    private readonly vacancyCompaniesAssociationRepository: VacancyCompaniesAssociationRepository,
  ) {}

  async execute(): Promise<VacancyCompaniesAssociation[]> {
    return this.vacancyCompaniesAssociationRepository.getAll();
  }
}
