import { Injectable } from '@angular/core';
import { IMarketing } from '../interfaces/i-marketing';
declare const fbq: (arg0: string, arg1: string, arg2: { content_name: string; content_category: string; content_ids: never[]; content_type: string; value: number; currency: string; }) => void;

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor() { }
  // onEventFacebook(event: IMarketing) {
  //   fbq('track', event.eventCategory, {
  //     content_name: event.eventLabel,
  //     content_category: event.eventCategory,
  //     content_ids: [],
  //     content_type: event.eventAction,
  //     value: event.eventValue,
  //     currency: 'ARS'
  //   });
  // }
  setEventData(eventCategory: any, eventAction: any, eventLabel: any): IMarketing {
    return {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue: 0
    };
  }

}
