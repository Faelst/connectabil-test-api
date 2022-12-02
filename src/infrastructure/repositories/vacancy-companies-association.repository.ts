import { InjectModel } from '@nestjs/mongoose';
import { VacancyCompaniesAssociation } from '@/infrastructure/config/database/schemas';
import { Model } from 'mongoose';
import { IVacancyCompaniesAssociationRepository } from '@/domain/repositories';

export class VacancyCompaniesAssociationRepository
  implements IVacancyCompaniesAssociationRepository
{
  constructor(
    @InjectModel(VacancyCompaniesAssociation.name)
    private readonly companiesModel: Model<VacancyCompaniesAssociation>,
  ) {}

  async create(vacancyCompaniesAssociation) {
    await this.companiesModel.create(vacancyCompaniesAssociation);
  }

  async findByCompanyIdAndJobVacancyId({ companyId, jobVacancyId }) {
    const result = await this.companiesModel.findOne({
      companyId,
      jobVacancyId,
    });

    return result;
  }
}
