import { customOptionsHome,customOptions,customOptions1, slides1 } from 'src/app/utils/constants';

import { Component, Renderer2, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';
//import { OrderApiCallsService } from './../../../../../../services/network-calls/order-api-calls.service';

import { ActivatedRoute, Router } from '@angular/router';

//import { PromoDialogComponent } from 'src/app/components/common/dialogs/promo-dialog/promo-dialog.component';


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
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements AfterViewInit {
  @ViewChild('mainImg', { static: false }) mainImg?: ElementRef;
  @ViewChild('thum', { static: false }) thum: ElementRef | undefined;


  constructor(
    public dialog: MatDialog,
    private el: ElementRef,
    private renderer:Renderer2,

    private route: ActivatedRoute,

    ) { }

    customOptions=customOptions;
    customOptions1=customOptions1;
    slides1=slides1;
    customOptionsHome=customOptionsHome;







    ngAfterViewInit() {

      //this.renderer.setStyle(this.divHello?.nativeElement, 'color', 'red');
      //this.renderer.addClass(this.divHello?.nativeElement, 'active12');

    }

    getAttribute(){
      this.renderer.setProperty(this.mainImg?.nativeElement,'src',`${this.thum?.nativeElement.src}`);
      //console.log(this.thum?.nativeElement.src);
    }


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
