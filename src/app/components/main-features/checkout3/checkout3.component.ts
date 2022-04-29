import { Component, OnInit } from '@angular/core';
//import Jquery
import * as $ from 'jquery';
//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
@Component({
  selector: 'app-checkout3',
  templateUrl: './checkout3.component.html',
  styleUrls: ['./checkout3.component.scss']
})
export class Checkout3Component implements OnInit {

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
