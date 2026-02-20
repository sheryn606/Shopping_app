import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Bill } from '../../models/bill.model';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  
  constructor(
    public dialogRef: MatDialogRef<BillComponent>,
    @Inject(MAT_DIALOG_DATA) public bill: Bill
  ) {}

  close() {
    this.dialogRef.close();
  }

  printBill() {
    window.print();
  }

  downloadBill() {
    // Create a printable version
    const printContent = document.getElementById('bill-content');
    if (!printContent) return;

    const windowUrl = 'about:blank';
    const windowName = 'Print';
    const printWindow = window.open(windowUrl, windowName, 'width=800,height=600');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Bill - Order #${this.bill.orderId}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 20px;
                background: white;
              }
              .bill-header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
              }
              .bill-info {
                margin-bottom: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
              }
              th {
                background-color: #f4f4f4;
              }
              .totals {
                text-align: right;
                margin-top: 20px;
              }
              .total-row {
                font-size: 1.2em;
                font-weight: bold;
                color: #6366f1;
              }
              .footer {
                margin-top: 40px;
                text-align: center;
                border-top: 2px solid #333;
                padding-top: 20px;
                color: #666;
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  }
}
