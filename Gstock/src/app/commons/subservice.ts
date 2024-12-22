import { Services } from "./services";

export class Subservice {
    id!:number;
    name?: string;
    services?: Services;

    constructor(data?: Partial<Subservice>) {
        Object.assign(this, data);
      }
   
}
