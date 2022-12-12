import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUpdateService {
  
  private datasource = new BehaviorSubject(false);
  currentData = this.datasource.asObservable();

  private addressUpdated = new BehaviorSubject(false);
  updateAddress = this.addressUpdated.asObservable();

  public subject: Subject<boolean> = new Subject();

  constructor() { }

  isUpdated(isUpdated: boolean) {
    this.subject.next(isUpdated);
}

updateStatus(): Observable<boolean> {
  this.datasource.next(false);
  return this.subject.asObservable();

}

AddressIsUpdated(isUpdated: any) {
  this.addressUpdated.next(isUpdated);
  this.subject.next(isUpdated);
}

updateAddressStatus(): Observable<boolean> {
  this.addressUpdated.next(false);
  return this.subject.asObservable();

}
}
