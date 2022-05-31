import { TransactionStatusEnums } from './../../../utils/enums';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-order-payment-dialog',
  templateUrl: './confirm-order-payment-dialog.component.html',
  styleUrls: ['./confirm-order-payment-dialog.component.scss']
})
export class ConfirmOrderPaymentDialogComponent implements OnInit, OnDestroy {
  paymentMethod = '';
  paymentNetwork = '';
  networkName = '';
  pollingCount = 0;
  isProcessing = false;
  isProcessingTransaction = false;
  momoTransactionStatusObservable: Observable<any>;
  refreshInterval;
  isFailed: boolean;
  isTransactionStatusDelayed: boolean;
  needsRetry = false;
  transactionId;
  orderId;
  pendingCountr = 0;
  constructor(
    private orderService: OrderApiCallsService,
    private dialogRef: MatDialogRef<ConfirmOrderPaymentDialogComponent>,
    private dataProvider: DataProviderService,
    private constantValues: ConstantValuesService,
    private notificationService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data !== null && this.data.transaction_id !== '' && this.data.transaction_id !== undefined) {
      this.transactionId = this.data.transaction_id;
      this.paymentMethod = this.data.payment_method;
      this.paymentNetwork = this.data.payment_network;
      this.networkName = this.data.network_name;
      this.pollOrderPaymentTransactionStatus(this.data.transaction_id);
    }
  }
  ngOnDestroy() {
    clearInterval(this.refreshInterval);
    if (this.momoTransactionStatusObservable !== null && this.momoTransactionStatusObservable !== undefined) {
      this.momoTransactionStatusObservable.subscribe().unsubscribe();
    }
  }
  /**
   * Poll for order payment transaction status
   * @param datransaction_idta request payload
   */
  pollOrderPaymentTransactionStatus(transactionId) {
   this.checkMoMoStatus(transactionId);
  }

  checkMoMoStatus(transactionId) {
    this.isProcessing = true;
    this.refreshInterval = setInterval(() => {
      // tslint:disable-next-line: max-line-length
      this.momoTransactionStatusObservable = this.dataProvider.getAll(this.constantValues.CHECK_MOMO_STATUS_ENDPOINT, { transaction_id: transactionId });
      this.momoTransactionStatusObservable.subscribe(result => {
        this.pollingCount += 1;
        if (result !== null && result.transaction_status === TransactionStatusEnums.SUCCESS) {
          this.dialogRef.close(true);
        } else if (result !== null && result.transaction_status === TransactionStatusEnums.FAILED) {
          this.isProcessing = false;
          this.isFailed = true;
        } else {
          if (this.pollingCount >= 50) {
            this.pollingCount = 0;
            this.isProcessing = false;
            this.isTransactionStatusDelayed = true;
            clearInterval(this.refreshInterval);
            if (this.momoTransactionStatusObservable !== null && this.momoTransactionStatusObservable !== undefined) {
              this.momoTransactionStatusObservable.subscribe().unsubscribe();
            }
          }
        }
      }, error => {
        this.notificationService.error(this.constantValues.APP_NAME, error.detail);
      });
    }, 5000);
  }
  close() {
    this.dialogRef.close(false);
  }
  tryOrderPayment() {
    this.isProcessing = true;
    this.orderService.retryOderPayment({order_id: this.orderId}, (error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.checkMoMoStatus(this.transactionId);
      }
    });
  }
}
