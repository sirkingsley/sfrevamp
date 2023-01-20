import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { LoginMainComponent } from '../../commons/login-main/login-main.component';
import { PackageStatusHistoryComponent } from '../../commons/package-status-history/package-status-history.component';
import { PaymentDialogComponent } from '../../commons/payment-dialog/payment-dialog.component';

declare const custom:any;
declare const main:any;
declare const parallaxie: any;
declare const $;

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
  isLoggedIn = false;
  currentUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private orderApiCalls: OrderApiCallsService,
    private loginUpdate: LoginUpdateService,
    private authService: AuthService,
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
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;

    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    // this.onload();

     //Check if user is not login and alert user
     if (!this.isLoggedIn) {
      this.dialog.open(LoginMainComponent,{panelClass: 'custom-dialog-container'}).afterClosed().subscribe((isSuccefull: boolean) => {
        if (isSuccefull) {
          this.isLoggedIn = this.authService.isLogedIn;
          this.currentUser = this.authService.currentUser;
          this.loginUpdate.isUpdated(true);
          
          window.location.reload();
        
        }
      });
    }
      //login popup end
  }
  getMallOrderDetail(id) {
    this.isProcessing = true;
    this.orderApiCalls.getCustomerOrderByOrderId(id, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.orderDetail = result.results;
        this.orderItems = result.results.customer_mall_items;
        console.log("This.orderDetail=>"+JSON.stringify(this.orderDetail,null,2))
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
