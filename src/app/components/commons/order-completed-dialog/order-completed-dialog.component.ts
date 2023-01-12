import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';

@Component({
  selector: 'app-order-completed-dialog',
  templateUrl: './order-completed-dialog.component.html',
  styleUrls: ['./order-completed-dialog.component.scss']
})
export class OrderCompletedDialogComponent implements OnInit {
transId = '';
transactionSuccessful = false;
  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productApiService: ProductsApiCallsService,
    private updateDbase: DbaseUpdateService
  ) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== undefined && this.data.order_code !== undefined) {
      this.transId = this.data.order_code;
      this.transactionSuccessful = this.data.transactionSuccessful;
      this.productApiService.clearCartItem((error, result) => {
        if (result !== null) {
          this.updateDbase.dbaseUpdated(true);
        }
      });
    }
  }

  viewMyOrders() {
    this.router.navigate(['/profile-view/orders']);
  }
}
