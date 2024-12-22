import { Component, OnInit } from '@angular/core';
import { StockMovementComponent } from '../stock-movement/stock-movement.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockMovementService } from 'src/app/services/stock-movement.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {


  constructor(
    private fb:FormBuilder,private stockMovement:StockMovementService
  ) { }
    createServiceFormGroup!:FormGroup;

  ngOnInit(): void {
          this.createServiceFormGroup=this.fb.group(
           {
            name:[''],
            
           }
          )
         
          
  }
  onSubmit() {
    
        if(this.createServiceFormGroup.valid){
          const formVlues=this.createServiceFormGroup.value;
          this.stockMovement.addService(formVlues).subscribe(
            data=>{
              alert("Service enregistre")
              console.log(data);
            },
            error=>{
              console.log("erreur",error)
            }
          )
        }

    }

}
