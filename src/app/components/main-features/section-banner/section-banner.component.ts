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


  banners = [
    { image: '../../assets/images/land-image1.png' },
    { image: '../../assets/images/land-image2.png' },
    { image: '../../assets/images/land-image3.png' },
  ];
  sectionOptions = sectionOptions;
  OwlLandingPageOtion = OwlLandingPageOtion;
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
