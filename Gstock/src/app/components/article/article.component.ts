import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/commons/article';
import { ArticleService } from 'src/app/services/article.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {



  constructor(private articleService:ArticleService, private httpClient:HttpClient) { }

    pageSize:number=20
    pageNumber:number=0;
    theTotalElements:number=0;
    ;
    articles:Article[]=[];        
  ngOnInit(): void {
    

    //this.listArticles();
    this.getArticlesPaginated(this.pageNumber,this.pageSize);

  }
      //Listing all articles
        public listArticles():void{
            this.articleService.getArticles().subscribe(
              data=>{
                this.articles=data;
              },
              error=>{
                console.log("Error type",error)
              }
            );
        }
        //deleting article
        deleteArticle(id:number) {

                this.articleService.removeArticle(id).subscribe(
                  response=>{
                    console.log(response)
                    this.listArticles();
                  },
                  error=>{
                    console.log(error)
                  }
                )

          }
              // Getting articles by pagination

              public getArticlesPaginated(pageNumber: number, pageSize: number): void {
                this.articleService.getArticlesPagination(pageNumber, pageSize).subscribe(
                  response => {
                    this.articles = response.content;
                    this.theTotalElements = response.totalElements;  
                  },
                  error => {
                    console.log(error);
                  }
                );
              }

          updatePageSize(pageSize: string): void {
            this.pageSize = +pageSize;
            this.pageNumber = 0; 
            this.getArticlesPaginated(this.pageNumber,this.pageSize);
            
          }      
          generatePDF(): void {
            const data = document.getElementById('pdfTable');
            if (data) {
              html2canvas(data).then(canvas => {
                const imgWidth = 208; // A4 page width
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
                pdf.save('table.pdf');
              });
            }
          }
}
