import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { customOptions, customOptions1, customOptionsHome, OwlLandingPageOtion, slides1 } from 'src/app/utils/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  OwlLandingPageOtion=OwlLandingPageOtion;
  banners=[
    {image:'../../assets/images/attractive-stylish-modern-young-african-woman-2021-08-26-17-26-19-utc.jpg'},
    {image:'../../assets/images/happy-young-black-couple-with-presents-jumping-up-2022-02-22-15-54-29-utc.jpg'}
  ];
  customOptions=customOptions;
  customOptions1=customOptions1;
  slides1=slides1;
  customOptionsHome=customOptionsHome;
  isProcessingFeaturedShops: boolean;
  featuredShops: any;
  subscription: Subscription;
  intervalId: number;

  constructor(
    private shopsApiCalls: ShopApiCallsService,
  ) { }

  ngOnInit(): void {
 // This visualizes the banner delay
 const source = interval(10000);
 const text = 'Your Text Here';
 this.subscription = source.subscribe((val) => this.startTimer(80));

 // Interval
 this.intervalId = setInterval(this.startTimer(80), 10000);
}

progressbarValue = 100;
curSec: number = 0;

startTimer(seconds: number) {
 const time = seconds;
 const timer$ = interval(100);

 const sub = timer$.subscribe((sec) => {
   this.progressbarValue = 100 - sec * 100 / seconds;
   this.curSec = sec;

   if (this.curSec === seconds) {
     sub.unsubscribe();
   }

 });
 return "";
}

ngOnDestroy() {
 //end timer
 this.subscription && this.subscription.unsubscribe();


 clearInterval(this.intervalId);
}
}
