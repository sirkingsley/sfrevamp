import { Injectable } from '@angular/core';
import { ConstantValuesService } from '../constant-values.service';
import { DataProviderService } from '../data-provider.service';
import { NotificationsService } from '../notifications.service';
import { ICallback } from 'src/app/classes/callback-method';

@Injectable({
  providedIn: 'root'
})
export class SharedDataApiCallsService {

  constructor(
    private constantValues: ConstantValuesService,
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService
  ) { }

  /**
   * Get Current Location Info
   * @param callback ICallback function that returns an error or result
   */
  getCurrentLocationInfo(callback: ICallback) {
    this.dataProvider.getCurrentLocationInfo().subscribe(result => {
      callback(null, result);
    }, error => {
      callback(error, null);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
}
