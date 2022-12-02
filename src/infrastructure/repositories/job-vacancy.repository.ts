import { IJobVacancyRepository } from '@/domain/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import {
  JobVacancy,
  JobVacancy as JobVacancyModel,
} from '../config/database/schemas';

export class JobVacancyRepository implements IJobVacancyRepository {
  constructor(
    @InjectModel(JobVacancyModel.name)
    private readonly jobVacancyModel: Model<JobVacancyModel>,
  ) {}

  async create(jobVacancy: JobVacancyModel): Promise<JobVacancyModel> {
    const result = await this.jobVacancyModel.create({
      _id: randomUUID(),
      title: jobVacancy.title,
      description: jobVacancy.description,
      status: jobVacancy.status,
      type: jobVacancy.type,
    });

    return result;
  }

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: boolean;
    },
  ): Promise<JobVacancyModel> {
    const result = await this.jobVacancyModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return result;
  }

  async delete(id: string): Promise<JobVacancy> {
    const result = await this.jobVacancyModel.findByIdAndUpdate(
      id,
      { deleted: true, updatedAt: new Date() },
      { new: true },
    );

    return result;
  }

  async findAll(): Promise<JobVacancyModel[]> {
    const result = await this.jobVacancyModel.find({ deleted: false });
    return result;
  }

  async findById(id: string): Promise<JobVacancyModel> {
    const result = await this.jobVacancyModel.findById(id);
    return result;
  }
}
