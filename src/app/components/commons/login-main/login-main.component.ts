import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { ConfirmCodeComponent } from '../confirm-code/confirm-code.component';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss']
})
export class LoginMainComponent implements OnInit {
  separateDialCode = false;

	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Ghana, CountryISO.Nigeria];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.Ghana, CountryISO.Nigeria];
	}

  formGroup: FormGroup;
  isProcessing = false;
  isGuest = false;
  btnText = 'SIGN IN';
  heading = 'Sign In';
  hide = true;
  partnerHide = true;
  isPartner = false;
  loginFormGroup: FormGroup;
  partnerLoginFormGroup: FormGroup;
  countries = [];
  countryCode = '';
  phoneNumber = '';
  codeSent=false;
  loginPayload:any=null;
  loginCode:any='';
  constructor(
    
    private notificationsService: NotificationsService,
    private customersApiCalls: CustomersApiCallsService,
    private constantValues: ConstantValuesService,
    private dialogRef: MatDialogRef<LoginMainComponent>,
    private dialog: MatDialog,
    private loginUpdate: LoginUpdateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private productService: ProductsApiCallsService
  ) {
    dialogRef.disableClose = true;
   }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      // phone_number: new FormControl('',[Validators.required]),
      // password: new FormControl('',Validators.required),
      // email: new FormControl('', [Validators.email]),
      email: new FormControl('',Validators.email),
      code: new FormControl(this.loginCode)
      // customer_name: new FormControl('')
    });
  }
   /**
   * Country code selected
   * @param countryInfo country info
   */
    onCountry(countryInfo) {
      if (countryInfo !== undefined && countryInfo !== null) {
        this.countryCode = '+' + (countryInfo.callingCodes[0] as string);
        //console.log("This.country_codes="+this.countryCode)
      }
    }

  onSignup() {
    this.dialog.open(SignUpComponent,{panelClass: 'custom-dialog-container'});
    //this.router.navigate(['/sign-up']);

  }

  /**
   * Submit data and valid user to login
   * @param data Sign In payload, email and password required
   */
  onSubmit(data) {
   
    //console.log("Data-->"+JSON.stringify(data,null,2));
    if (this.formGroup.valid) {
      // data.phone_number=data.phone_number.internationalNumber.replace(/\s/g, "").trim();
      data.phone_number=data.phone_number.e164Number;
      //console.log("Data-->"+JSON.stringify(data,null,2));
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
        
            //Guest
          } else {
            this.notificationsService.success(this.constantValues.APP_NAME, 'Sign Up successful');
            this.authService.increaseLoggedInCount();
            this.authService.removeUserAndToken();
            this.authService.saveUser(result.results);
            this.authService.saveToken(result.results.auth_token);
            this.loginUpdate.isUpdated(true);

          }
          if (this.authService.isLogedIn) { //Login Success, so sync cart with user cart items in database
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

  
  /**
   * Submit data and valid user to login
   * @param data Sign In payload, email and password required
   */
  onSubmit2(data) {
   data.code = this.code.value;
   data.email = this.loginPayload.email;
    //console.log("Data-->"+JSON.stringify(data,null,2));
  
    if (this.code.value !==null || this.code.value !== undefined || this.code.value !== '') {
     
      //console.log("Data-->"+JSON.stringify(data,null,2));
      this.isProcessing = true;
      this.customersApiCalls.signInKokorko(data, (error, result) => {
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
        
            //Guest
          }
          if (this.authService.isLogedIn) { //Login Success, so sync cart with user cart items in database
            this.productService.getCartItems((error, result) => {
              const items: any[] = result.map(data => "" + data.item.id + ":" + data.quantity + ":" + data.total_amount);
              if (items.length > 0) {
                //console.log("Item:"+ JSON.stringify(items.join(','),null,2));
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

  
  getLoginCode(data){
    const payload ={
      email: data.email,
    }
    this.loginPayload ={
      code: '',
      email: this.email.value
    }
    
    this.isProcessing = true;
    this.customersApiCalls.getLoginCodeKokorko(payload,(results,error)=>{
      this.isProcessing = false;
      //console.log("This.login get code results: "+ JSON.stringify(results,null,2));
      this.codeSent = true;
      if(results !==null){
       
        //console.log("Payload: "+ JSON.stringify(payload,null,2));
        //console.log("This.login get code results: "+ JSON.stringify(results,null,2));
        //this.loginCode = results.code;
      }
    })
  }

  resendCode(){
    this.codeSent =!this.codeSent;
  }
  // openCode(){
  //   this.dialog.open(ConfirmCodeComponent)
  // }
  // get phone_number() { return this.formGroup.get('phone_number'); }
  // get password() { return this.formGroup.get('password'); }
  // get customer_name() { return this.formGroup.get('customer_name'); }
  get code(){return this.formGroup.get('code');}
  get email() { return this.formGroup.get('email'); }
}
