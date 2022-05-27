import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbaseUpdateService {
  private subject: Subject<boolean> = new Subject();

  constructor(
    private productService: ProductsApiCallsService,
    private authService: AuthService
  ) { }

  dbaseUpdated(isUpdated: boolean) {
    this.subject.next(isUpdated);
    if (this.authService.isLogedIn) {
      this.productService.getCartItems((error, result) => {
        const items: any[] = result.map((data:any) => "" + data.item.id + ":" + data.quantity + ":" + data.total_amount);
        if (items.length > 0) {
          this.productService.syncCartItems({items: items.join(',')}, (er, res) => {

          });
        }
      });
    }

}

updateStatus(): Observable<boolean> {
  return this.subject.asObservable();
}
}
