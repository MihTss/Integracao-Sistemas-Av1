import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Electronic } from 'models/Electronic';
import { ElectronicDTO } from 'dtos/ElectronicDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Electronic)
    private electronic: typeof Electronic
  ) {}

  createElectronic(postData: ElectronicDTO) {
    this.electronic.create({
      name: postData.name,
      company: postData.company,
      description: postData.description,
      quantity: postData.quantity,
      price: postData.price
    });
  }
}