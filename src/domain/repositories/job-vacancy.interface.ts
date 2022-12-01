import { JobVacancyModel } from '@/infrastructure/config/database/schemas';
import { BaseInterface } from './base.interface';

export type IJobVacancyRepository = BaseInterface<JobVacancyModel>;
