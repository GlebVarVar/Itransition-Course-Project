import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alltags } from './models/alltags.model';
import { AlltagsModule } from './modules/alltags.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'itransitionsdbv2',
      // models: [__dirname + '/models'],
      models: [Alltags],
      autoLoadModels: true,
      synchronize: true,
    }),
    AlltagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
