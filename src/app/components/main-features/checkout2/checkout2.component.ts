import { Component, OnInit } from '@angular/core';
//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.scss']
})
export class Checkout2Component implements OnInit {

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
