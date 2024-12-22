import { Article } from "./article";
import { Services } from "./services";
import { Subservice } from "./subservice";

// Define the enum for MovementType
export enum MovementType {
    Entree = 'ENTREE',
    Sortie = 'SORTIE',
    Perdu = 'PERDU'
}

export class StockMovement {
    movementDate?: Date;
    movementReference?: MovementType;
    incomingQuantity?: number;
    deliveredQuantity?: number;
    article?: Article;
    service?: Services;
    subservice?: Subservice;
    retour?: string;

    constructor(data?: Partial<StockMovement>) {
        Object.assign(this, data);
    }
}
