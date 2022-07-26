import { CustomersApiCallsService } from './../../../services/network-calls/customers-api-calls.service';
import { NotificationsService } from './../../../services/notifications.service';
import { ConstantValuesService } from './../../../services/constant-values.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
//import { passwordMatch } from 'src/app/utils/validator';
import { Router, ActivatedRoute } from '@angular/router';
import { passwordMatch } from 'src/app/utils/validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  isProcessing = false;
  constructor(
    private notificationsService: NotificationsService,
    private customersApiCalls: CustomersApiCallsService,
    private constantValues: ConstantValuesService,
    //private dialogRef: MatDialogRef<SignUpComponent>,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      retype_password: new FormControl('', [Validators.required, passwordMatch('password', 'retype_password')])
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

  /**
   *
   * @param data
   */
  onSubmit(data) {
    if (this.formGroup.valid) {
      //console.log("Data-->"+JSON.stringify(data,null,2));
      data.phone_number=data.phone_number.replace(/\s/g, "").trim();
      this.isProcessing = true;

      this.customersApiCalls.create(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null) {
          this.notificationsService.success(this.constantValues.APP_NAME, 'Your account has been successfully created');
          this.authService.increaseLoggedInCount();
          this.authService.removeUserAndToken();
          this.authService.saveUser(result.results);
          this.authService.saveToken(result.results.auth_token);
          //this.dialogRef.close(true);
          this.router.navigate(['/supermarket']);
        }else{
          console.log("Fail to create");
        }
      });
    }
  }
  get first_name() { return this.formGroup.get('first_name'); }
  get last_name() { return this.formGroup.get('last_name'); }
  get email() { return this.formGroup.get('email'); }
  get phone_number() { return this.formGroup.get('phone_number'); }
  get password() { return this.formGroup.get('password'); }
  get retype_password() { return this.formGroup.get('retype_password'); }

}
