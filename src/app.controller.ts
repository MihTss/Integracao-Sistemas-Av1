import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ElectronicDTO } from 'dtos/ElectronicDTO';

import { InjectModel } from '@nestjs/sequelize';
import { Electronic } from 'models/Electronic';
import { ResponseCreateElectronic } from 'dtos/ResponseCreateElectronic';

@Controller('electronic-shop')
export class AppController {
  constructor(
    @InjectModel(Electronic)
    private electronic: typeof Electronic,
    private readonly appService: AppService,
  ) {}

  //POST

  @Post('/electronic')
  async createElectronic(
    @Body() postData: ElectronicDTO,
  ): Promise<ResponseCreateElectronic> {
    this.electronic.create({
      name: postData.name,
      company: postData.company,
      description: postData.description,
      quantity: postData.quantity,
      price: postData.price
    });

    return new ResponseCreateElectronic('the insert was successfull', postData);
  }

  @Post('/electronic-service')
  async createElectronicWithService(
    @Body() postData: ElectronicDTO,
  ): Promise<ResponseCreateElectronic> {
    this.appService.createElectronic(postData);
    return new ResponseCreateElectronic('the insert was successfulll', postData);
  }

  //GET

  @Get('/electronics')
  async getElectronic(): Promise<Electronic[]> {
    return this.electronic.findAll();
  }

  @Get('/electronic-querystring')
  async getElectronicByQueryString(@Query('name') name: string): Promise<Electronic[]> {
    return this.electronic.findAll({
      where: {
        name,
      },
    });
  }
}