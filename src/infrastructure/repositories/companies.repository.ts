import { Injectable } from '@nestjs/common';

import { Companies as CompaniesModel } from '@/infrastructure/config/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { ICompaniesRepository } from '@/domain/repositories';

@Injectable()
export class CompaniesRepository implements ICompaniesRepository {
  constructor(
    @InjectModel(CompaniesModel.name)
    private readonly companiesModel: Model<CompaniesModel>,
  ) {}

  async create(company: CompaniesModel): Promise<CompaniesModel> {
    const result = await this.companiesModel.create({
      _id: randomUUID(),
      name: company.name,
      address: company.address,
      status: company.status,
    });

    return result;
  }

  async update(id: string, company: CompaniesModel): Promise<CompaniesModel> {
    const result = await this.companiesModel.findByIdAndUpdate(id, company, {
      new: true,
    });

    return result;
  }

  async delete(id: string): Promise<CompaniesModel> {
    const result = await this.companiesModel.findByIdAndDelete(id);

    return result;
  }

  async findAll(): Promise<CompaniesModel[]> {
    const result = await this.companiesModel.find();

    return result;
  }

  async findById(id: string): Promise<CompaniesModel> {
    const result = await this.companiesModel.findById(id);

    return result;
  }

  async deleteById(id: string): Promise<CompaniesModel> {
    const result = await this.companiesModel.findByIdAndDelete(id);

    return result;
  }
}
