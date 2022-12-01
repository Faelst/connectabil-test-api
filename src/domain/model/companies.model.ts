export class CompaniesModel {
  _id: string;
  name: string;
  address: string;
  status: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
