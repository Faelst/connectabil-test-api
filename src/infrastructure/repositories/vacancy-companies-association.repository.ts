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

  async findByCompanyId(companyId: string) {
    const result = await this.vacancyCompaniesAssociation.find({
      companyId,
    });

    return result;
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

  async getAll() {
    const result = await this.vacancyCompaniesAssociation.aggregate([
      {
        $match: {
          deleted: false,
        },
      },
      {
        $addFields: {
          companyId: { $toObjectId: '$companyId' },
          jobVacancyId: { $toObjectId: '$jobVacancyId' },
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $lookup: {
          from: 'jobvacancies',
          localField: 'jobVacancyId',
          foreignField: '_id',
          as: 'jobVacancy',
        },
      },
      {
        $unwind: {
          path: '$company',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$jobVacancy',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return result;
  }
}
