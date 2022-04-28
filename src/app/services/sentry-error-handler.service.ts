import { Injectable } from '@angular/core';
//import * as Sentry from '@sentry/browser';
import { environment } from 'src/environments/environment';

// Sentry.init({
//   dsn: 'https://44beebde26a744a297f3101129842824@o195413.ingest.sentry.io/5210998'
// });
@Injectable({
  providedIn: 'root'
})
export class SentryErrorHandlerService {

  constructor() { }
  handleError(error: any): void {
    if (environment.production === true) {
      //Sentry.captureException(error.originalError || error);
    }
    throw error;
  }
}
