import { Component, OnInit } from '@angular/core';
import { StockMovement } from 'src/app/commons/stock-movement';
import { StockMovementService } from 'src/app/services/stock-movement.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stock-movement',
  templateUrl: './stock-movement.component.html',
  styleUrls: ['./stock-movement.component.css']
})
export class StockMovementComponent implements OnInit {

  stockMovements: StockMovement[] = [];
  searchQuery: string = '';
  thePageNumber: number = 0;
  thePageSize: number = 20;
  theTotalElements: number = 0;
  movementType: string = 'all'; // Default to 'all'

  constructor(private stockService: StockMovementService,   private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      this.movementType = type ? type : 'all';
      this.listStockMovement(this.thePageNumber, this.thePageSize);
    });
  }

 

  listStockMovement(thePageNumber: number, thePageSize: number): void {
    if (this.movementType === 'all') {
      this.stockService.getStockMovement(thePageNumber, thePageSize).subscribe(
        data => {
          this.stockMovements = data.content;
          this.theTotalElements = data.totalElements;
        },
        error => {
          console.error('Error fetching stock movements:', error);
        }
      );
    } else {
      this.stockService.filterdStock(this.movementType).subscribe(
        data => {
          this.stockMovements = data.content;
          this.theTotalElements = data.totalElements;
        },
        error => {
          console.error('Error fetching filtered movements:', error);
        }
      );
    }
  }

  onTypeChange(): void {
    this.router.navigate(['/stock-movements', this.movementType]);
  }

  updatePageSize(pageSize: string): void {
    this.thePageSize = +pageSize;
    this.thePageNumber = 0;
    this.listStockMovement(this.thePageNumber, this.thePageSize);
  }

  searchStockMovements(): void {
    if (this.searchQuery.trim() === '') {
      this.listStockMovement(this.thePageNumber, this.thePageSize); 
      return;
    }

    this.stockService.searchStockMovements(this.searchQuery).subscribe(
      data => {
        this.stockMovements = data;
        this.theTotalElements = data.length; 
      },
      error => {
        console.error('Error searching stock movements:', error);
      }
    );
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
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('PDF Table element not found.');
    }
  }
}
