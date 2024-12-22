import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StockMovement } from 'src/app/commons/stock-movement';
import { EntetiesServiceService } from 'src/app/services/enteties-service.service';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.css']
})
export class ServicesDetailsComponent implements OnInit {

  constructor(private entetiesService:EntetiesServiceService, private route:ActivatedRoute) { }
  stockMovements:StockMovement[]=[];
  entityId!:number;
  entityType!:string;
  entityName!:string;
  ngOnInit(): void {
    this.entityId = +this.route.snapshot.paramMap.get('id')!;
    this.entityType = this.route.snapshot.paramMap.get('type')!;
    this.entityName = this.route.snapshot.paramMap.get('name')!;

    this.loadStockMovements();
  }

  loadStockMovements(): void {
    if (this.entityType === 'service') {
      this.entetiesService.getServiceMovements(this.entityId).subscribe(
        (data) => {
          this.stockMovements = data;
          console.log('Service Movements:', this.stockMovements); // Add this line
        },
        (error) => {
          console.error('Error fetching stock movements', error);
        }
      );
    } else if (this.entityType === 'subservice') {
      this.entetiesService.getSubserviceMovements(this.entityId).subscribe(
        (data) => {
          this.stockMovements = data;
          console.log('Subservice Movements:', this.stockMovements); // Add this line
        },
        (error) => {
          console.error('Error fetching stock movements', error);
        }
      );
    }
  }
  

}
