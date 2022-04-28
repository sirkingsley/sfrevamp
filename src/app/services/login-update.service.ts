import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUpdateService {

  private subject: Subject<boolean> = new Subject();

  constructor() { }

  isUpdated(isUpdated: boolean) {
    this.subject.next(isUpdated);
}
updateStatus(): Observable<boolean> {
  return this.subject.asObservable();
}
}
