import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/commons/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.css']
})
export class LowStockComponent implements OnInit {
  articles:Article[]=[];
  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
      this.listLowStock()
  }
   public listLowStock():void {
    this.articleService.getLowStock().subscribe(
      data=>{
        this.articles=data;
      },
      error=>{
        console.log(error)
      }
    )
    
  }

}
