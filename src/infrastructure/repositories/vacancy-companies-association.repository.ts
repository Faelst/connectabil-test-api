import { InjectModel } from '@nestjs/mongoose';
import { VacancyCompaniesAssociation } from '@/infrastructure/config/database/schemas';
import { Model } from 'mongoose';
import { IVacancyCompaniesAssociationRepository } from '@/domain/repositories';

export class VacancyCompaniesAssociationRepository
  implements IVacancyCompaniesAssociationRepository
{
  constructor(
    @InjectModel(VacancyCompaniesAssociation.name)
    private readonly vacancyCompaniesAssociation: Model<VacancyCompaniesAssociation>,
  ) {}

  async create(vacancyCompaniesAssociation) {
    await this.vacancyCompaniesAssociation.create(vacancyCompaniesAssociation);
  }

  async findByCompanyIdAndJobVacancyId({ companyId, jobVacancyId }) {
    const result = await this.vacancyCompaniesAssociation.findOne({
      companyId,
      jobVacancyId,
      deleted: false,
    });

    return result;
  }

  async findById(id: string) {
    const result = await this.vacancyCompaniesAssociation.findById(id);
    return result;
  }

  async delete(vacancyCompaniesAssociationId: string) {
    await this.vacancyCompaniesAssociation.findByIdAndUpdate(
      vacancyCompaniesAssociationId,
      { deleted: true, updatedAt: new Date() },
    );
  }
}
