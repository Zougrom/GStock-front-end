import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Services } from 'src/app/commons/services';
import { StockMovementService } from 'src/app/services/stock-movement.service';

@Component({
  selector: 'app-subdivision',
  templateUrl: './subdivision.component.html',
  styleUrls: ['./subdivision.component.css']
})
export class SubdivisionComponent implements OnInit {

  createSubdivision!: FormGroup;
  services: Services[] = [];

  constructor(private fb: FormBuilder, private stockService: StockMovementService) { }

  ngOnInit(): void {
    // Initialize the form with proper form controls
    this.createSubdivision = this.fb.group({
      name: ['', Validators.required],  // Ensure form control names match
      service: ['', Validators.required]
    });

    // Fetch services from the backend and populate the dropdown
    this.stockService.getServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.createSubdivision.valid) {
      // Get the form values
      const formValues = this.createSubdivision.value;
      // Send form data to the backend via the service
      this.stockService.addSubdivision(formValues).subscribe(
        data => {
          alert("Subdivision enregistrée avec succès");
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
