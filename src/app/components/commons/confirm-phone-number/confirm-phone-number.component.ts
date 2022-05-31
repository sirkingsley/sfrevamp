import { NotificationsService } from 'src/app/services/notifications.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-phone-number',
  templateUrl: './confirm-phone-number.component.html',
  styleUrls: ['./confirm-phone-number.component.scss']
})
export class ConfirmPhoneNumberComponent implements OnInit {
  isProcessing = false;
  phoneNunber = '';;
  uniqueCodeCtrl: FormControl = new FormControl('', [Validators.required]);
  constructor(
    private dialogRef: MatDialogRef<ConfirmPhoneNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationsService: NotificationsService,
    private orderService: OrderApiCallsService

  ) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== undefined) {
      this.phoneNunber = this.data.phone_number;
    }
  }
  validatePhoneNumber(uniqueCode) {
    this.isProcessing = true;
    this.orderService.confirmMOMOPhoneNumber(this.phoneNunber, uniqueCode, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.dialogRef.close(true);
      }
    });
  }
  onClose() {
    this.dialogRef.close(false);
  }
  validatePhoneNumberSMS() {
    this.isProcessing = true;
    this.orderService.validateMOMOPhoneNumber(this.phoneNunber, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.notificationsService.success("", "Code resent successfully");
      }
    });
  }
}
