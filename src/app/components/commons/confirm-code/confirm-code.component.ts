import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { LoginMainComponent } from '../login-main/login-main.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  btnText = 'Confirm Code';
  heading = 'Resend Code';
  formGroup: FormGroup;
  isProcessing = false;
  isGuest = false;
  currentUser: any;
  isLoggedIn: boolean;
  cached_email='';
  constructor(
    private notificationsService: NotificationsService,
    private customersApiCalls: CustomersApiCallsService,
    private constantValues: ConstantValuesService,
    private dialogRef: MatDialogRef<ConfirmCodeComponent>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.cached_email=this.data.email;
    //console.log("This.dataFrompComponent"+ this.data.email);
    this.formGroup = new FormGroup({
      email: new FormControl(this.cached_email, [Validators.email]),
      code: new FormControl('', [Validators.required]),
    });
  }




  onSignIn() {
    this.dialog.open(LoginMainComponent,
      { panelClass: 'custom-dialog-container' }
    ).afterClosed().subscribe((isSuccefull: boolean) => {
      if (isSuccefull) {
        this.isLoggedIn = this.authService.isLogedIn;
        this.currentUser = this.authService.currentUser;
      }
    });
  }

  /**
   *
   * @param data
   */
  onSubmit(data) {
    if (this.formGroup.valid) {
      //console.log("Data-->"+JSON.stringify(data,null,2));
      
      this.isProcessing = true;
      this.customersApiCalls.verifyEmail(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null) {
          this.notificationsService.success(this.constantValues.APP_NAME, 'Account Verified');
          this.dialogRef.close(true);
          //this.router.navigate(['/supermarket'])
        }
      });
    } else {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Fill all fields');
    }
  }



 
  get code() { return this.formGroup.get('last_name'); }
  get email() { return this.formGroup.get('email'); } 

}

