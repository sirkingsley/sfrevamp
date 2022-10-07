import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { PackageStatusHistoryComponent } from '../../commons/package-status-history/package-status-history.component';
import { PaymentDialogComponent } from '../../commons/payment-dialog/payment-dialog.component';

declare const custom:any;
declare const main:any;
declare const parallaxie: any;
declare const $;

@Component({
  selector: 'app-order-details-mobile',
  templateUrl: './order-details-mobile.component.html',
  styleUrls: ['./order-details-mobile.component.scss']
})
export class OrderDetailsMobileComponent implements OnInit {
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
   //Call JavaScript functions onload
  //  onload(){
  //   custom();
  //   main();
    // parallaxie();
  //}

  ngOnInit(): void {

    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    // this.onload();
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
    this.router.navigate(['/profile-view/orders']);
  }
  viewPackageStatusHistory(item) {
    this.dialog.open(PackageStatusHistoryComponent, {data: {order_item: item}});
  }
  changePaymentMethod() {
    this.dialog.open(PaymentDialogComponent, {data: {order: this.orderDetail}});
  }

}
