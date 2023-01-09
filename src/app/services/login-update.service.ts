import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUpdateService {
  
  private datasource = new BehaviorSubject(false);
  currentData = this.datasource.asObservable();
  addr:any=this.getAddress;
  public addressUpdated = new BehaviorSubject(this.addr);
  updateAddress = this.addressUpdated.asObservable();

  public subject: Subject<boolean> = new Subject();
  public address: Subject<boolean> = new Subject();

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
  this.address.next(isUpdated);
}

updateAddressStatus(): Observable<boolean> {
  this.addressUpdated.next(false);
  return this.subject.asObservable();

}

get getAddress(){
  return (JSON.parse(localStorage.getItem('delivery_address')) !== null || JSON.parse(localStorage.getItem('delivery_address')) !== undefined || JSON.parse(localStorage.getItem('delivery_address')) !== '' || JSON.parse(localStorage.getItem('delivery_address')) !==false)?JSON.parse(localStorage.getItem('delivery_address')):false; 
}
}
