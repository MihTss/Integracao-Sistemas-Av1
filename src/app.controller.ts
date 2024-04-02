import { Controller, Get, Put, Param, Body, Post, Query, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ElectronicDTO } from 'dtos/ElectronicDTO';

import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Electronic } from 'models/Electronic';
import { ResponseCreateElectronic } from 'dtos/ResponseCreateElectronic';
import { ResponseDeleteDTO } from 'dtos/ResponseDeleteDTO';
import { ResponseUpdateDTO } from 'dtos/ResponseUpdateDTO';

@Controller('electronic-shop')
export class AppController {
  constructor(
    @InjectModel(Electronic)
    private electronic: typeof Electronic,
    private readonly appService: AppService,
  ) { }

  
  //GET

  @Get('/electronics')
  async getElectronic(): Promise<Electronic[]> {
    return this.electronic.findAll();
  }

  @Get('/search')
  async getElectronicByQueryString(@Query('name') name: string): Promise<Electronic[]> {
    return this.electronic.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  }

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

  //PUT
  @Put('/electronic/:id')
  async updateElectronic(
    @Param('id') id: number,
    @Body() updateData: ElectronicDTO,
  ): Promise<ResponseUpdateDTO> {

    this.validation(id, updateData)

    return new ResponseUpdateDTO(
      await this.appService.putEletronic(id, updateData)
    )
  }

  // DELETE

  @Delete('/electronic')
  async deleteElectronic(
    @Query('id') id: number,
  ): Promise<ResponseDeleteDTO> {
    this.validationIdElement(id);
    this.appService.deleteElectronic(id);

    return new ResponseDeleteDTO();
  }
  
  // Validations 

  private validation(
    id: number,
    body: ElectronicDTO
  ) {
    this.validationIdElement(id)
    this.validationBody(body)
  }

  private validationIdElement(id: number) {
    if (!id) {
      throw new HttpException(
        'Server Error - id Request not found',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  private validationBody(body: ElectronicDTO) {
    if (!Object.keys(body).length) {
      throw new HttpException(
        'Server Error - Body Request not found',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}