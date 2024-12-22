import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMovement } from '../commons/stock-movement';

@Injectable({
  providedIn: 'root'
})
export class EntetiesServiceService {

  constructor(private httpClient:HttpClient) { }

      private stocksUrl='http://localhost:8080/api/stock-movements';
      


    public getServiceMovements(id:number):Observable<StockMovement[]>{
      const serviceMoveUrl = `${this.stocksUrl}/${id}`
        return  this.httpClient.get<StockMovement[]>(serviceMoveUrl);

          }

          public getSubserviceMovements(id: number): Observable<StockMovement[]> {
            const subserviceMoveUrl = `${this.stocksUrl}/subdivision-movement/${id}`;
            return this.httpClient.get<StockMovement[]>(subserviceMoveUrl);
          }
}
