import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/commons/article';
import { Services } from 'src/app/commons/services';
import { StockMovement } from 'src/app/commons/stock-movement';
import { ArticleService } from 'src/app/services/article.service';
import { StockMovementService } from 'src/app/services/stock-movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private articleService:ArticleService, private stockService:StockMovementService) { }
  pageSize:number=20
  pageNumber:number=0;
    totalArticles:number=0;
    lowStockArticles:number=0;
    totalMovements:number=0;
    articles:Article[]=[];
    stockMovements:StockMovement[]=[];
    enteties:Services[]=[]

  ngOnInit(): void {

      this.getArticlesPaginated(this.pageNumber, this.pageSize);
        this.listStockMovement(this.pageNumber, this.pageSize);
        this.getAllEnteties();
  }

  public getArticlesPaginated(pageNumber: number, pageSize: number): void {
    this.articleService.getArticlesPagination(pageNumber, pageSize).subscribe(
      response => {
        this.articles = response.content;
        this.totalArticles = response.totalElements;  
      },
      error => {
        console.log(error);
      }
    );
  }
  listStockMovement(thePageNumber: number, thePageSize: number): void {
     {
      this.stockService.getStockMovement(thePageNumber, thePageSize).subscribe(
        data => {
          this.stockMovements = data.content;
          this.totalMovements = data.totalElements;
        },
        error => {
          console.error('Error fetching stock movements:', error);
        }
      );
    } 
    }
    public getAllEnteties():void{
      this.stockService.getServices().subscribe(
      data=>{
        this.enteties=data;
        console.log(this.enteties);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
