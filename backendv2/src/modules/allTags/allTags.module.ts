import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Alltags, Comments } from "@/models";
import { AlltagsController } from "./allTags.controller";
import { AllTagsService } from "./allTags.service";

@Module({
  imports: [SequelizeModule.forFeature([Alltags, Comments])],
  providers: [AllTagsService],
  controllers: [AlltagsController],
})
export class AlltagsModule {}
