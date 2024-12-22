import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockMovement } from '../commons/stock-movement';
import { Services } from '../commons/services';
import { Subservice } from '../commons/subservice';
import { Article } from '../commons/article';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {


  constructor(private httpClient:HttpClient) { }

      private baseUrl='http://localhost:8080/api/stock-movements';
      private servicesUrl='http://localhost:8080/api/services/all';
      private subserviceUrl='http://localhost:8080/api/subservices/all'

      public newStockMovement( stockMovement :StockMovement):Observable<StockMovement>{
        const addStockMovementUrl=`${this.baseUrl}/new`
        return this.httpClient.post<StockMovement>(addStockMovementUrl,stockMovement)
      }

      public getStockMovement( pageNumber:number, pageSize:number):Observable<GetResponseStockMovement>{

        const allMovements=`${this.baseUrl}/all-movements?page=${pageNumber}&size=${pageSize}`
        return this.httpClient.get<GetResponseStockMovement>(allMovements);
      }

      public getServices():Observable<Services[]>{
              return this.httpClient.get<Services[]>(this.servicesUrl)
      }
      public getSubservices():Observable<Subservice[]>{
        return this.httpClient.get<Subservice[]>(this.subserviceUrl)
}
        public addService(service:Services):Observable<Services>{
          const addServicesUrl='http://localhost:8080/api/services/nouveau-service'
          return this.httpClient.post<Services>(addServicesUrl,service);
        }
            public addSubdivision(subdivision:Subservice):Observable<Subservice>{
              const addSubserviceUrl='http://localhost:8080/api/subservices/new-subservice';
              return this.httpClient.post<Subservice>(addSubserviceUrl,subdivision);
            }

            public searchStockMovements(articleName: string): Observable<StockMovement[]> {
              const searchUrl = `${this.baseUrl}/search?articleName=${articleName}`;
              return this.httpClient.get<StockMovement[]>(searchUrl);
            }

            public getFinalStock():Observable<Article[]>{
              const finalStockUrl='http://localhost:8080/api/articles/finalStock';
              return this.httpClient.get<Article[]>(finalStockUrl);
            }
            filterdStock(type: string): Observable<GetResponseStockMovement> {
              const filterMovementsUrl = `${this.baseUrl}/all-movements/${type}`;
              return this.httpClient.get<GetResponseStockMovement>(filterMovementsUrl);
            }

            resetInitialAndFinalStock(): Observable<Article[]> {
                const updateUrl='http://localhost:8080/api/articles/reset'
              return this.httpClient.put<Article[]>(updateUrl, {});
            }

}
interface GetResponseStockMovement {
  content: StockMovement[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}
