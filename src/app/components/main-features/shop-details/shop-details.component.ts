import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

//import Jquery
import * as $ from 'jquery';
import { customOptions } from 'src/app/utils/constants';
import { ViewProductComponent } from '../../commons/view-product/view-product.component';

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  customOptions=customOptions;

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
