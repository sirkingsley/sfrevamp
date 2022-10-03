import { User } from './../../../modules/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
  currentUser: User;
  user:any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  logOut() {
    this.logOut();
  }

}
