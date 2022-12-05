import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Companies>;

@Schema()
export class Companies {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  zip: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  neighborhood: string;

  @Prop({ type: String, required: true })
  number: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const CompaniesSchema = SchemaFactory.createForClass(Companies);
