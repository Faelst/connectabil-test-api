import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type JobVacancyDocument = HydratedDocument<JobVacancy>;

@Schema()
export class JobVacancy {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => Types.ObjectId,
  })
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

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const JobVacancySchema = SchemaFactory.createForClass(JobVacancy);
