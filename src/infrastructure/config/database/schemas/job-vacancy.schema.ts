import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type JobVacancyDocument = HydratedDocument<JobVacancyModel>;

@Schema()
export class JobVacancyModel {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  type: 'REMOTE' | 'PRESENCIAL' | 'MIXED';

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Boolean })
  deleted: boolean;
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancyModel);
