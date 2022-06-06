import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-package-status-history',
  templateUrl: './package-status-history.component.html',
  styleUrls: ['./package-status-history.component.scss']
})
export class PackageStatusHistoryComponent implements OnInit {
packageStatuses = [];
isProcessing = false;
orderItem;
  constructor(
    private orderApiCalls: OrderApiCallsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PackageStatusHistoryComponent>
  ) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== undefined) {
      this.getOrderItemActivities(this.data.order_item.id);
    }
  }

  getOrderItemActivities(orderItemId) {
    this.orderApiCalls.getCustomerOrderItemActivity(orderItemId, (error, result) => {

    });
  }

}
