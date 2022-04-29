import { Component, OnInit } from '@angular/core';
//import Jquery
import * as $ from 'jquery';
//JavaScript Functions
// declare const custom:any;
// declare const main:any;
// declare const parallaxie: any;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor() { }

 //Call JavaScript functions onload
//  onload(){
//   custom();
//   main();
//   parallaxie();



  ngOnInit(): void {
    // console.log("Products: _->");
    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    // this.onload();


  }

}
