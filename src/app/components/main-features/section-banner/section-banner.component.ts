import { OwlLandingPageOtion, sectionOptions } from './../../../utils/constants';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-section-banner',
  templateUrl: './section-banner.component.html',
  styleUrls: ['./section-banner.component.scss']
})
export class SectionBannerComponent implements OnInit {

  constructor() { }
  subscription: Subscription;
  intervalId: number;


  banners=[
    {image:'../../assets/images/attractive-stylish-modern-young-african-woman-2021-08-26-17-26-19-utc.jpg'},
    {image:'../../assets/images/happy-young-black-couple-with-presents-jumping-up-2022-02-22-15-54-29-utc.jpg'},
    {image:'../../assets/images/black-millennial-couple-with-gift-box-on-pink-back-2022-02-22-15-52-54-utc.jpg'},
  ];
sectionOptions=sectionOptions;
OwlLandingPageOtion=OwlLandingPageOtion;
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
