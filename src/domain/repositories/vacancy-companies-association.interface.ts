import { VacancyCompaniesAssociationModel } from '@/infrastructure/config/database/schemas/vacancy-companies-association.schema';
import { BaseInterface } from './base.interface';

export type IVacancyCompaniesAssociationRepository =
  BaseInterface<VacancyCompaniesAssociationModel>;
