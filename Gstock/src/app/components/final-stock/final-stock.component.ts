import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/commons/article';
import { StockMovementService } from 'src/app/services/stock-movement.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Route, Router } from '@angular/router';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-final-stock',
  templateUrl: './final-stock.component.html',
  styleUrls: ['./final-stock.component.css']
})
export class FinalStockComponent implements OnInit {

  constructor(private stockService:StockMovementService, private router:Router) { }
  articles:Article[]=[];
  year:Date=new Date;
  ngOnInit(): void {
    this.listFinalStock();
  }

  public listFinalStock():void{
    this.stockService.getFinalStock().subscribe(
      data=>{
          this.articles=data;
          console.log(this.articles)
      }, 
      error=>{
        console.log(error);
      }
    )
  }


 resetStock(): void {
    this.stockService.resetInitialAndFinalStock().subscribe({
      next: (data) => {
        this.articles = data;
        alert("Stock updated");
        console.log('Stock reset successfully:', this.articles);
        this.router.navigate(['/final-stock']);
      },
      error: (err) => {
        console.error('Error resetting stock:', err);
        
      }
    });
  }

  generatePDF(): void {
    const data = document.getElementById('pdfTable');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
        pdf.save('table.pdf');
      });
    }
  }
  exportToExcel(): void {
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
  
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.articles.map(article => ({
      'Nom': article.name,
      'Stock initial': article.initialStock,
      'Stock de sécurité': article.securityStock,
      'Stock final': article.finalStock,
      'Situation': article.situation
    })));
  
   
    XLSX.utils.book_append_sheet(wb, ws, 'Stock final');
  
   
    XLSX.writeFile(wb, 'StockFinal.xlsx');
  }

}

  

