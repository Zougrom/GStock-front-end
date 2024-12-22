import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateNewArticleComponent } from './components/create-new-article/create-new-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import { StockMovementComponent } from './components/stock-movement/stock-movement.component';
import { ArticleService } from './services/article.service';
import { StockMovementService } from './services/stock-movement.service';
import { CreatStockMovementComponent } from './components/creat-stock-movement/creat-stock-movement.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import { ServicesComponent } from './components/services/services.component';
import { SubdivisionComponent } from './components/subdivision/subdivision.component';
import { EntetiesComponent } from './components/enteties/enteties.component';
import { ServicesDetailsComponent } from './components/services-details/services-details.component';
import { FinalStockComponent } from './components/final-stock/final-stock.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LowStockComponent } from './components/low-stock/low-stock.component';


const routes:Routes=[
  {path :'', component:ArticleComponent},
  {path:'nouveau-service',component:ServicesComponent},
  {path:'nouvlle-subdivision',component:SubdivisionComponent},
  {path:'new-article', component :CreateNewArticleComponent},
  {path :'stock-movements', component:StockMovementComponent},
  {path:'new-stock-movement', component:CreatStockMovementComponent},
  {path:'enteties',component:EntetiesComponent},
  { path: 'service-details/:id/:type/:name', component: ServicesDetailsComponent },
  { path: 'final-stock', component:FinalStockComponent },
  { path: 'stock-movements/:type', component: StockMovementComponent },
  {path: 'dashboard',component:DashboardComponent},
  {path: 'low-stock',component: LowStockComponent},


]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CreateNewArticleComponent,
    StockMovementComponent,
    CreatStockMovementComponent,
    MenuComponent,
    ServicesComponent,
    SubdivisionComponent,
    EntetiesComponent,
   ServicesDetailsComponent,
   FinalStockComponent,
   DashboardComponent,
   LowStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule
    
  ],
  providers: [ArticleService ,StockMovementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
