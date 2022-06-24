import { SignUpComponent } from './../sign-up/sign-up.component';
import { LoginComponent } from './../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { LoginMainComponent } from '../login-main/login-main.component';

@Component({
  selector: 'app-guest-user',
  templateUrl: './guest-user.component.html',
  styleUrls: ['./guest-user.component.scss']
})
export class GuestUserComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<GuestUserComponent>
  ) { }

  ngOnInit(): void {
  }
  checkoutAsGuest() {
    this.dialog.open(LoginMainComponent, {data: {guest: true}}).afterClosed().subscribe((isSuccess: boolean) => {
      if (isSuccess) {
        this.dialogRef.close(true);
      }
    });
  }
  login() {
    this.dialog.open(LoginMainComponent, {data: {guest: false}}).afterClosed().subscribe((isSuccess: boolean) => {
      if (isSuccess) {
        this.dialogRef.close(true);
      }
    });
  }
  signUp() {
    this.dialog.open(SignUpComponent).afterClosed().subscribe((isSuccess: boolean) => {
      if (isSuccess) {
        this.dialogRef.close(true);
      }
    });
  }
}
