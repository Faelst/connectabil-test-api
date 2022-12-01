import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Companies as CompaniesModel,
  CompaniesSchema,
} from '../config/database/schemas';

import { CompaniesRepository } from './companies.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompaniesModel.name,
        schema: CompaniesSchema,
      },
    ]),
  ],
  providers: [CompaniesRepository],
  exports: [CompaniesRepository],
})
export class RepositoriesModule {}
