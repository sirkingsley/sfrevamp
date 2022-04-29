import { Component, OnInit } from '@angular/core';
//import Jquery
import * as $ from 'jquery';
//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() { }

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

}
