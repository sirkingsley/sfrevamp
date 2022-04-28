import { Injectable } from '@angular/core';
declare const Lobibox: { notify: (arg0: string, arg1: { position: string; sound?: boolean; delayIndicator?: boolean; title?: any; msg: any; onClickUrl?: any; size?: string; rounded?: boolean; delay?: boolean; }) => void; progress: (arg0: string, arg1: { position: string; sound: boolean; title: any; label: any; }) => void; alert: (arg0: string, arg1: { msg: any; }) => void; };

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }
  /**
   * Show an info notification
   * @param title message title
   * @param message message to display
   */
  info(title: string, message: string) {
    Lobibox.notify('info', {
      position: 'top right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message
    });
  }
  /**
  *Show an info notification
  *@param title message title
  *@param message message to display
  @param url url
   */
  infoWithURL(title: any, message: any, url: any) {
    Lobibox.notify('info', {
      position: 'bottom right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message,
      onClickUrl: url
    });
  }
  /**
  *Show an info notification
  *@param title message title
  *@param message message to display
   */
  infoBottomRight(title: any, message: any) {
    Lobibox.notify('info', {
      position: 'bottom right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message
    });
  }
  /**
  *Show an error notification
  *@param title message title
  *@param message message to display
   */
  error(title: string, message: any) {
    Lobibox.notify('error', {
      position: 'top right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message
    });
  }

  /**
  *Show a success notification
  *@param title message title
  *@param message message to display
   */
  success(title: any, message: any) {
    Lobibox.notify('success', {
      position: 'top right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message
    });
  }
  /**
 *Show a default notification
 *@param title message title
 *@param message message to display
  */
  default(title: any, message: any) {
    Lobibox.notify('default', {
      position: 'top right',
      sound: false,
      delayIndicator: false,
      title: title,
      msg: message
    });
  }
  /**
  *Show a warning notification
  *@param title message title
  *@param message message to display
   */
  warning(title: any, message: any) {
    Lobibox.notify('warning', {
      position: 'top right',
      delayIndicator: false,
      sound: false,
      title: title,
      msg: message
    });
  }
  /**
 *Show a progress notification
 *@param title message title
 *@param message label to display
  */
  progress(title: any, message: any) {
    Lobibox.progress('progress', {
      position: 'top right',
      sound: false,
      title: title,
      label: message
    });
  }
  /**
 *Shows an info alert that blocks the whole page
 *@param message message to display
  */
  infoAlert(message: any) {
    Lobibox.alert('info', { msg: message });
  }
  /**
 *Shows a success alert that blocks the whole page
 *@param message message to display
  */
  successAlert(message: any) {
    Lobibox.alert('success', { msg: message });
  }
  /**
 *Shows an error alert that blocks the whole page
 *@param message message to display
  */
  errorAlert(message: any) {
    Lobibox.alert('error', { msg: message });
  }
  /**
  *Shows a warning alert that blocks the whole page
  *@param message message to display
   */
  warningAlert(message: any) {
    Lobibox.alert('warning', { msg: message });
  }
  /**
   * Warning message position to center top
   * @param message message
   */
  warningCenterTop(message: any) {
    Lobibox.notify('warning', {
      size: 'mini',
      delayIndicator: false,
      rounded: true,
      position: 'center top',
      msg: message
    });
  }
  /**
   * Warning message position to center top
   * @param message message
   */
  warningInstance(message: any) {
    return Lobibox.notify('warning', {
      size: 'mini',
      delay: false,
      rounded: true,
      position: 'top right',
      msg: message
    });
  }
  /**
   * info message position to center top
   * @param message message
   */
  infoMessage(message: any) {
    Lobibox.notify('info', {
      size: 'mini',
      rounded: true,
      position: 'top right',
      delayIndicator: false,
      msg: message
    });
  }
}
