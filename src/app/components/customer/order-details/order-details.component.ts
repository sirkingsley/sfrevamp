import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { PackageStatusHistoryComponent } from '../../commons/package-status-history/package-status-history.component';
import { PaymentDialogComponent } from '../../commons/payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  isProcessing = false;
  orderId = '';
  orderDetail;
  orderItems = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderApiCalls: OrderApiCallsService,

  ) {
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId !== null && this.orderId !== '' && this.orderId !== undefined) {
      this.getMallOrderDetail(this.orderId);
    }
  }

  ngOnInit(): void {
  }
  getMallOrderDetail(id) {
    this.isProcessing = true;
    this.orderApiCalls.getCustomerOrderByOrderId(id, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.orderDetail = result.results;
        this.orderItems = result.results.customer_mall_items;
      }
    });

  }
  goBack() {
    this.router.navigate(['/account/orders']);
  }
  viewPackageStatusHistory(item) {
    this.dialog.open(PackageStatusHistoryComponent, {data: {order_item: item}});
  }
  changePaymentMethod() {
    this.dialog.open(PaymentDialogComponent, {data: {order: this.orderDetail}});
  }

}
