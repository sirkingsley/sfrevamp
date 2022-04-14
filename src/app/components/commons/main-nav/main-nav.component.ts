
import { customOptions,customOptions1, slides1,customOptionsHome} from 'src/app/utils/constants';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';

//import Jquery
import * as $ from 'jquery';
//import { CartMainComponent } from '../cart-main/cart-main.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor() { }
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
    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
    });
    this.onload();
  }

}
