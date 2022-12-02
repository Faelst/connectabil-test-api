import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type VacancyCompaniesAssociationDocument =
  HydratedDocument<VacancyCompaniesAssociation>;

@Schema()
export class VacancyCompaniesAssociation {
  @Prop({
    type: Types.ObjectId,
    required: true,
    default: () => Types.ObjectId,
  })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  jobVacancyId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const VacancyCompaniesAssociationSchema = SchemaFactory.createForClass(
  VacancyCompaniesAssociation,
);
