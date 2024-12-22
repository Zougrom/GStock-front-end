import { Subservice } from "./subservice";

export class Services {
    id!:number;
    name?: string;
    subservices?: Subservice[];
    constructor(data?: Partial<Services>) {
        Object.assign(this, data);
      }
  
}
