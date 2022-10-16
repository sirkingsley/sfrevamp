import { Router } from '@angular/router';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CurrencyEnums, PaymentMethods } from 'src/app/utils/enums';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmOrderPaymentDialogComponent } from '../confirm-order-payment-dialog/confirm-order-payment-dialog.component';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {
  isProcessing = false;
  paymentFormGroup: FormGroup;
  orderDetail;
  currencies = CurrencyEnums;
  paymentMethod = '';
  paymentNetwork = '';
  networkName = '';
  redirectUrl = '';
  currency = '';
  constructor(
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderApiCallsService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private constantValues: ConstantValuesService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== undefined) {
      this.orderDetail = this.data.order;
      this.currency = this.orderDetail.currency;
      //console.log("this.orderDetail=>"+this.orderDetail?.customer_mall_items[0]?.my_product?.currency)
    }
    this.paymentFormGroup = this.formBuilder.group({
      payment_method: ['', Validators.required],
      browser_token: [''],
      payment_network: [''],
      payment_voucher_code: [''],
      sender_wallet_number: [''],
      order_id: this.orderDetail.id
    });
  }
  onClose() {
    this.dialogRef.close(false);
  }
  /**
  * When payment method is selected
  * @param paymentMethod payment method
  * @param paymentNetwork payment network when method is MOMO
  * @param networkFullName payment network full name
  */
  selectPaymentMethod(paymentMethod, paymentNetwork, networkFullName) {
    // this.paymentMethod = '';
    // this.paymentNetwork = '';
    // this.networkName = '';
    this.paymentMethod = paymentMethod;
    this.paymentNetwork = paymentNetwork;
    this.networkName = networkFullName;
    this.payment_method.setValue(paymentMethod);
    if (paymentMethod === PaymentMethods.CARD) {

    }
  }
  // showPaymentPrompt() {
  //   if (this.paymentMethod === PaymentMethods.CARD) {
  //     this.redirectUrl = '';
  //     this.isProcessing = true;

  //   } else {

  //   }
  // }

    /**
   * Submit order for an authenticated user
   * @param data request payload
   */
     placeOrder(data) {

      this.isProcessing = true;

      data.payment_method = this.paymentMethod;
      data.payment_network = this.paymentNetwork;
      data.browser_token = this.authService.getNotificationToken;

      this.orderService.retryOderPayment(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.transaction_id !== '' && result.transaction_id !== undefined) {

          if (this.paymentMethod === PaymentMethods.CARD) {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Order successfully placed. Kindly follow the action in the popup to complete Card Payment');
            this.redirectUrl = result.redirect_url;
            window.open(result.redirect_url,'_blank')


          } else if (this.paymentMethod === PaymentMethods.MOMO) {
            this.dialog.open(ConfirmOrderPaymentDialogComponent,
              // tslint:disable-next-line: max-line-length
              { data: { payment_method: this.paymentMethod, payment_network: this.paymentNetwork, network_name: this.networkName, transaction_id: result.transaction_id }, disableClose: true })
              .afterClosed().subscribe((isCompleted: boolean) => {

              });
          }
        }
      });
    }

    get payment_method() { return this.paymentFormGroup.get('payment_method'); }

}
