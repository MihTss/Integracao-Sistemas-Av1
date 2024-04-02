import { ElectronicDTO } from './ElectronicDTO';

export class ResponseUpdateDTO {
  public message: string;
  public electronic: ElectronicDTO;

  public constructor(electronic: ElectronicDTO) {
    this.message = "This update of this eletronic is success";
    this.electronic = electronic;
  }
}