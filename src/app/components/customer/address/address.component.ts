import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  user: any;
  ngOnInit(): void {
    this.user=this.authService.currentUser;
  }
}
