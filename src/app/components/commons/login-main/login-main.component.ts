import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss']
})
export class LoginMainComponent implements OnInit {

  formGroup: FormGroup;
  isProcessing = false;
  isGuest = false;
  btnText = 'SIGN IN';
  heading = 'Sign In';
  constructor(
    private notificationsService: NotificationsService,
    private customersApiCalls: CustomersApiCallsService,
    private constantValues: ConstantValuesService,
    private dialogRef: MatDialogRef<LoginMainComponent>,
    private loginUpdate: LoginUpdateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private productService: ProductsApiCallsService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      customer_name: new FormControl('')
    });
    if (this.data !== null && this.data !== undefined) {
      if (this.data.guest === true && this.data.guest !== null && this.data.guest !== undefined) {
        this.isGuest = true;
        this.heading = 'Sign Up As Guest';
        this.btnText = 'Sign Up As Guest';
        this.customer_name.setValidators([]);
        this.customer_name.updateValueAndValidity();
      }
    }
  }
  onCountryChanged(country) {
  }
  onSubmit(data) {
    if (this.formGroup.valid) {
      data.phone_number=data.phone_number.replace(/\s/g, "").trim();
      console.log("Data-->"+JSON.stringify(data,null,2));
      this.isProcessing = true;
      this.customersApiCalls.signIn(data, (error, result) => {
        this.isProcessing = false;
        this.loginUpdate.isUpdated(true);
        if (result !== null) {
          if (!this.isGuest) {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Login successful');
            this.authService.increaseLoggedInCount();
            this.authService.removeUserAndToken();
            this.authService.saveUser(result);
            this.authService.saveToken(result.auth_token);
            this.loginUpdate.isUpdated(true);
            //console.log("Data-->"+JSON.stringify(data,null,2));
        

          } else {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Sign Up successful');
            this.authService.increaseLoggedInCount();
            this.authService.removeUserAndToken();
            this.authService.saveUser(result.results);
            this.authService.saveToken(result.results.auth_token);
            this.loginUpdate.isUpdated(true);
            


          }
          if (this.authService.isLogedIn) {
            this.productService.getCartItems((error, result) => {
              const items: any[] = result.map(data => "" + data.item.id + ":" + data.quantity + ":" + data.total_amount);
              if (items.length > 0) {
                this.productService.syncCartItems({items: items.join(',')}, (er, res) => {

                });
              }
            });
          }
          this.dialogRef.close(true);
        }
      }, this.isGuest);
    }
  }
  get phone_number() { return this.formGroup.get('phone_number'); }
  get password() { return this.formGroup.get('password'); }
  get customer_name() { return this.formGroup.get('customer_name'); }
  get email() { return this.formGroup.get('email'); }
}
