import { Injectable } from '@nestjs/common';
import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICompaniesRepository } from '@/domain/repositories';
import { UpdateCompanyDto } from '../controllers/companies/companies.dto';

@Injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(
    @InjectModel(CompaniesModel.name)
    private readonly companiesModel: Model<CompaniesModel>,
  ) {}

  async create(company: CompaniesModel): Promise<CompaniesModel> {
    const result = await this.companiesModel.create(company);

    return result;
  }

  async update(id: string, company: UpdateCompanyDto): Promise<CompaniesModel> {
    const result = await this.companiesModel.findByIdAndUpdate(
      id,
      {
        ...company,
        updatedAt: new Date(),
      },
      { new: true },
    );

    return result;
  }

  async delete(id: string): Promise<CompaniesModel> {
    const result = await this.companiesModel.findByIdAndUpdate(
      id,
      { deleted: true, updatedAt: new Date() },
      { new: true },
    );

    return result;
  }

  async findAll(): Promise<CompaniesModel[]> {
    const result = await this.companiesModel.find({ deleted: false });

    return result;
  }

  async findById(id: string): Promise<CompaniesModel> {
    const result = await this.companiesModel.findOne({
      _id: id,
      deleted: false,
    });

    return result;
  }
}
