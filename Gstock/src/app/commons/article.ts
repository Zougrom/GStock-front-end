export class Article {
    creationDate?: Date;
    
   
    constructor(
        public id:number,
        public name: string,
        public initialStock: number,
        public securityStock: number,
        public unitOfMeasurement: string,
        public finalStock:number,
        public totalComing:number,
        public totalGoing:number,
        public situation:string,
    ) {
       
    }
   
}
