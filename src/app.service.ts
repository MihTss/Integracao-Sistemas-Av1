import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Electronic } from 'models/Electronic';
import { ElectronicDTO } from 'dtos/ElectronicDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Electronic)
    private electronic: typeof Electronic
  ) {}

  async putEletronic(id, postData: ElectronicDTO) {
    const electronic = await this.electronic.findOne({
      where: {
        id,
      }
    });

    if(!electronic) {
      throw new HttpException('Not Found electronic with this id', HttpStatus.NOT_FOUND)
    }

    electronic.update(postData)
    return await electronic.save()
  }
  
  createElectronic(postData: ElectronicDTO) {
    this.electronic.create({
      name: postData.name,
      company: postData.company,
      description: postData.description,
      quantity: postData.quantity,
      price: postData.price
    });
  }

  async deleteElectronic(id: number) {
    const electronic = await this.electronic.findOne({
      where: {
        id,
      }
    });

    if (!electronic) {
      throw new HttpException(
        'Not Found booking to this id', 
        HttpStatus.NOT_FOUND
      );
    }

    return await electronic.destroy();
  }
}