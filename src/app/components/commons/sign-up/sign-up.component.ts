import { CustomersApiCallsService } from './../../../services/network-calls/customers-api-calls.service';
import { NotificationsService } from './../../../services/notifications.service';
import { ConstantValuesService } from './../../../services/constant-values.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { passwordMatch } from 'src/app/utils/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { passwordMatch } from 'src/app/utils/validator';
import { LoginMainComponent } from '../login-main/login-main.component';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ConfirmCodeComponent } from '../confirm-code/confirm-code.component';
import { LoginUpdateService } from 'src/app/services/login-update.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
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
  btnText = 'SIGN UP';
  heading = 'Register';
  formGroup: FormGroup;
  isProcessing = false;
  isGuest = false;
  currentUser: any;
  isLoggedIn: boolean;
  constructor(
    private notificationsService: NotificationsService,
    private customersApiCalls: CustomersApiCallsService,
    private constantValues: ConstantValuesService,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private loginUpdate: LoginUpdateService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      // password: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(
      //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      //   ),
      //   Validators.minLength(8),]),

      // retype_password: new FormControl('', [Validators.required, passwordMatch('password', 'retype_password')])
    },);
  }

  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //   const control = formGroup.controls[controlName];
  //   const matchingControl = formGroup.controls[matchingControlName];
  //   if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
  //   return;
  //   }
  //   if (control.value !== matchingControl.value) {
  //   matchingControl.setErrors({ mustMatch: true });
  //   } else {
  //   matchingControl.setErrors(null);
  //   }
  //   }
  //   }

  onCountryChanged(country) {
    console.log(country);
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
      //data.phone_number=data.phone_number.replace(/\s/g, "").trim();
      //data.phone_number=data.phone_number.internationalNumber.replace(/\s/g, "").trim();
      data.phone_number = data.phone_number.e164Number;
      this.isProcessing = true;

      this.customersApiCalls.create(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null) {
          this.notificationsService.success(this.constantValues.APP_NAME, 'Your account has been successfully created');
          this.authService.increaseLoggedInCount();
          this.authService.removeUserAndToken();
          this.authService.saveUser(result.results);
          this.authService.saveToken(result.results.auth_token);
          this.dialogRef.close(true);
          
          //this.router.navigate(['/supermarket']);
        }
      });
    } else {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Fill all fields');
    }
  }

  /**
   *
   * @param data
   */
  onSubmit2(data) {

    if (this.formGroup.valid) {
      //console.log("Data-->"+JSON.stringify(data,null,2));
      //data.phone_number=data.phone_number.replace(/\s/g, "").trim();
      //data.phone_number=data.phone_number.internationalNumber.replace(/\s/g, "").trim();
      data.phone_number = data.phone_number.e164Number;
      this.isProcessing = true;

      this.customersApiCalls.signup(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null) {
          this.notificationsService.success(this.constantValues.APP_NAME, 'Your account has been successfully created');
          this.authService.increaseLoggedInCount();
          this.authService.removeUserAndToken();
          this.authService.saveUser(result.results);
          this.authService.saveToken(result.results.auth_token);
          this.loginUpdate.isUpdated(true);
          //this.dialogRef.close(true);
          this.dialog.closeAll();
          this.dialog.open(ConfirmCodeComponent,{
            panelClass: 'custom-dialog-container',
            data:{
              email:this.email.value,
            }
          }).afterClosed().subscribe((isSuccefull: boolean) => {
            if (isSuccefull) {
             //console.log("Confirm Dialog closed");
            }
          });
          //this.router.navigate(['/supermarket']);
        }
      });
    } else {
      this.notificationsService.info(this.constantValues.APP_NAME, 'Fill all fields');
    }
  }

  openConfirm(){
    this.dialog.open(ConfirmCodeComponent,
      {
        panelClass: 'custom-dialog-container',
        data:{
          email:this.email.value,
        }
    
    }
      ).afterClosed().subscribe((isSuccefull: boolean) => {
      if (isSuccefull) {
       //console.log("Confirm Dialog closed");
      }
    });
  }

  get first_name() { return this.formGroup.get('first_name'); }
  get last_name() { return this.formGroup.get('last_name'); }
  get email() { return this.formGroup.get('email'); }
  get phone_number() { return this.formGroup.get('phone_number'); }
  // get password() { return this.formGroup.get('password'); }
  // get retype_password() { return this.formGroup.get('retype_password'); }

}
