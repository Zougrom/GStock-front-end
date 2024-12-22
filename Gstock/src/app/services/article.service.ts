import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../commons/article';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient:HttpClient) { }


    private baseUrl='http://localhost:8080/api/articles'

    public getArticles():Observable<Article[]>{
      const articlesUrl=`${this.baseUrl}/all`
      return this.httpClient.get<Article[]>(articlesUrl)
    }
    public addArticle(article:Article):Observable<Article>{
      const newArticleUrl=`${this.baseUrl}/nouveau-article`
      return this.httpClient.post<Article>(newArticleUrl, article)
    }

    public removeArticle(id:number){
        const deleteArticleUrl = `http://localhost:8080/api/articles/remove/${id}`;


      return this.httpClient.delete(deleteArticleUrl);
    }

    public searchArticle(keyword: string): Observable<Article[]> {
      const searchUrl = `${this.baseUrl}/search/${keyword}`;
      return this.httpClient.get<Article[]>(searchUrl);
    }

    public getArticlesPagination(pageNumber: number, pageSize: number): Observable<GetResponseArticle> {
      const paginationUrl = `${this.baseUrl}/all?page=${pageNumber}&size=${pageSize}`;
      return this.httpClient.get<GetResponseArticle>(paginationUrl);
    }
          
    public getLowStock():Observable<Article[]>{
      const lowStockUrl="http://localhost:8080/api/articles/lowStock";
       return this.httpClient.get<Article[]>(lowStockUrl)
    }


            
}

interface GetResponseArticle {
  content: Article[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}