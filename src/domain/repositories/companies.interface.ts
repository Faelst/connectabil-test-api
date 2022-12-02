import { BaseInterface } from './base.interface';
import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

export type ICompaniesRepository = BaseInterface<CompaniesModel>;
