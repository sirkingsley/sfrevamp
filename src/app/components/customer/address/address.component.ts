import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isProcessing: boolean = false;

  constructor(
    private authService: AuthService,
    private customerApIService: CustomersApiCallsService,
  ) { }

  user: any;
  referalCodeDetails:any;
  ngOnInit(): void {
    this.user=this.authService.currentUser;
    this.getReferalCodeDetails('YYB536');
  }

  getReferalCodeDetails(code){
    this.isProcessing = true;
    this.customerApIService.getReferalCodeDetails(code,results=>{
      if(results !==null || results !== undefined){
        this.referalCodeDetails = results?.data;
        // console.log(JSON.stringify(results,null,2));
        // console.log(this.referalCodeDetails?.amount);
      }
    })
  }
}
