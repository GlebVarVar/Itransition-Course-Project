import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alltags } from '../models/alltags.model';
import { AlltagsController } from './alltags.controller';
import { AllTagsService } from './alltags.service';

@Module({
  imports: [SequelizeModule.forFeature([Alltags])],
  providers: [AllTagsService],
  controllers: [AlltagsController]
})
export class AlltagsModule {}
