import { ElectronicDTO } from "./ElectronicDTO";

export class ResponseCreateElectronic {
    public message: string; 
    public electronic: ElectronicDTO;

    public constructor(message, electronic: ElectronicDTO){
        this.message = message;
        this.electronic = electronic;
    }
}