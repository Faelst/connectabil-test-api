import { BaseInterface } from './base.interface';
import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';

export type ICompaniesRepository = BaseInterface<CompaniesModel> & {
  update(
    id: string,
    data: { deleted: boolean; updatedAt: Date },
    options: any,
  ): Promise<CompaniesModel>;
};
