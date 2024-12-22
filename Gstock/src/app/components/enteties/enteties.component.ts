import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from 'src/app/commons/services';
import { StockMovementService } from 'src/app/services/stock-movement.service';

@Component({
  selector: 'app-enteties',
  templateUrl: './enteties.component.html',
  styleUrls: ['./enteties.component.css']
})
export class EntetiesComponent implements OnInit {

  enteties:Services[]=[];

  constructor( private stockService:StockMovementService) { }

  ngOnInit(): void {
    this.getAllEnteties(); 

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
