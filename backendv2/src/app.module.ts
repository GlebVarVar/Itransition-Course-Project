import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AlltagsModule } from "@/modules";
import {
  Alltags,
  Comments,
  Likes,
  Photos,
  Posts,
  Ratings,
  Tags,
  Users,
} from "./models";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "itransitionsdbv2",
      models: [Alltags, Comments, Likes, Photos, Posts, Ratings, Tags, Users],
      synchronize: true,
    }),
    AlltagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
