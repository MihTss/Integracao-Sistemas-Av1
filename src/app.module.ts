import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {Electronic} from '../models/Electronic'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'root', 
      database: 'electronicShop',
      models: [Electronic],
    }),
    SequelizeModule.forFeature([Electronic]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
