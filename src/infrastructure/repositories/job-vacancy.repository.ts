import { IJobVacancyRepository } from '@/domain/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JobVacancy,
  JobVacancy as JobVacancyModel,
} from '../config/database/schemas';
import { UpdateJobVacancyDto } from '../controllers/job-vacancy/job-vacancy.dto';

export class JobVacancyRepository implements IJobVacancyRepository {
  constructor(
    @InjectModel(JobVacancyModel.name)
    private readonly jobVacancyModel: Model<JobVacancyModel>,
  ) {}

  async create(jobVacancy: JobVacancyModel): Promise<JobVacancyModel> {
    const result = await this.jobVacancyModel.create(jobVacancy);

    return result;
  }

  async update(
    id: string,
    data: UpdateJobVacancyDto,
  ): Promise<JobVacancyModel> {
    const result = await this.jobVacancyModel.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      {
        new: true,
      },
    );

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
    const result = await this.jobVacancyModel.findOne({
      _id: id,
      deleted: false,
    });
    return result;
  }
}
