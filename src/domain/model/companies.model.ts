export class CompaniesModel {
  _id: string;
  name: string;
  address: string;
  zip: string;
  state: string;
  city: string;
  neighborhood: string;
  number: string;
  status: boolean;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
