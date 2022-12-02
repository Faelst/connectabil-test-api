import { VacancyCompaniesAssociation } from '@/infrastructure/config/database/schemas/vacancy-companies-association.schema';

export type IVacancyCompaniesAssociationRepository = {
  create: (data: VacancyCompaniesAssociation) => Promise<void>;
  findByCompanyId: (
    companyId: string,
  ) => Promise<VacancyCompaniesAssociation[]>;
};
