import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/commons/article';
import { Services } from 'src/app/commons/services';
import { StockMovement, MovementType } from 'src/app/commons/stock-movement';
import { Subservice } from 'src/app/commons/subservice';
import { ArticleService } from 'src/app/services/article.service';
import { StockMovementService } from 'src/app/services/stock-movement.service';

@Component({
  selector: 'app-creat-stock-movement',
  templateUrl: './creat-stock-movement.component.html',
  styleUrls: ['./creat-stock-movement.component.css']
})
export class CreatStockMovementComponent implements OnInit {

  createStockMovement!: FormGroup;
  services: Services[] = [];
  subservices: Subservice[] = [];
  articles: Article[] = [];
  movementTypes = MovementType; // Add this line to expose the enum

  constructor(
    private fb: FormBuilder,
    private stockService: StockMovementService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.createStockMovement = this.fb.group({
      dateCreation: [''],
      articleName: [''],
      movementReference: [''],
      incomingQuantity: [''],
      goingQuantity: [''],
      service: [''],
      subservice: [''],
      retour: [],
    });

    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });

    this.stockService.getServices().subscribe(data => {
      this.services = data;
    }, error => {
      console.log(error);
    });

    this.stockService.getSubservices().subscribe(data => {
      this.subservices = data;
    }, error => {
      console.log(error);
    });

    this.onArticleNameChange();
  }

  onArticleNameChange(): void {
    this.createStockMovement.get('articleName')?.valueChanges.subscribe(keyword => {
      if (keyword && keyword.length > 2) {
        this.articleService.searchArticle(keyword).subscribe(
          data => {
            this.articles = data;
          },
          error => {
            console.error('Error searching articles', error);
          }
        );
      } else {
        this.articles = [];
      }
    });
  }

  selectArticle(article: Article): void {
    this.createStockMovement.patchValue({
      articleName: article.name
    });

    this.articles = [];
  }

  onSubmit() {
    const selectedArticleName = this.createStockMovement.get('articleName')?.value;
    const selectedServiceId = this.createStockMovement.get('service')?.value;
    const selectedSubserviceId = this.createStockMovement.get('subservice')?.value;

    const selectedArticle = this.articles.find(a => a.name === selectedArticleName);
    const selectedService = this.services.find(s => s.id === +selectedServiceId);
    const selectedSubservice = this.subservices.find(ss => ss.id === +selectedSubserviceId);

    // Convert movementReference to enum value
    const movementReference = this.createStockMovement.get('movementReference')?.value as MovementType;

    const stockMovement: StockMovement = {
      article: selectedArticle || undefined,
      movementReference: movementReference,
      incomingQuantity: this.createStockMovement.get('incomingQuantity')?.value || 0,
      deliveredQuantity: this.createStockMovement.get('goingQuantity')?.value || 0,
      service: selectedService || undefined,
      subservice: selectedSubservice || undefined,
      retour: this.createStockMovement.get('retour')?.value || ''
    };

    console.log('Stock Movement Object:', stockMovement);

    this.stockService.newStockMovement(stockMovement).subscribe(
      response => {
        console.log("Stock movement created successfully", response);
        alert("Movement enregistré");
      },
      error => {
        console.error("Error creating stock movement", error);
        alert("Réessayez");
      }
    );
  }
}
