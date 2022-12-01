import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type VacancyCompaniesAssociationDocument =
  HydratedDocument<VacancyCompaniesAssociationModel>;

@Schema()
export class VacancyCompaniesAssociationModel {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  jobVacancyId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Boolean })
  deleted: boolean;
}

export const VacancyCompaniesAssociationSchema = SchemaFactory.createForClass(
  VacancyCompaniesAssociationModel,
);
