
import { customOptions,customOptions1, slides1,customOptionsHome} from './../../../../utils/constants';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';
//import { OrderApiCallsService } from './../../../../../../services/network-calls/order-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';


import { ActivatedRoute, Router } from '@angular/router';

//import { SwiperOptions } from 'swiper';
import { AuthService } from 'src/app/services/auth.service';



//import Jquery
import * as $ from 'jquery';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
@Component({
  selector: 'app-supermarket',
  templateUrl: './supermarket.component.html',
  styleUrls: ['./supermarket.component.scss']
})
export class SupermarketComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsApiCallsService,
    private router: Router
  ) { }

  customOptions=customOptions;
  customOptions1=customOptions1;
  slides1=slides1;
  customOptionsHome=customOptionsHome;


  //Call JavaScript functions onload
  onload(){
  custom();
  main();
  parallaxie();
}


  ngOnInit(): void {
    console.log("Products: _->");
    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
    });

    $('.search_btn').on("click",function(){
      $("#search_body_collapse").slideToggle("slow");
    });
    this.onload();


  }

  openDialog() {
    this.dialog.open(ViewProductComponent, {
      data: {
        animal: 'panda',
      },
    });
  }






}

