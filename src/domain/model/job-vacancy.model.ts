export class JobVacancyModel {
  _id: string;
  title: string;
  description: string;
  type: 'REMOTE' | 'PRESENCIAL' | 'MIXED';
  status: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deleted?: Date;
}
