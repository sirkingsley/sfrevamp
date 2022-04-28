import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== undefined && authHeader !== null && authHeader !== '' && authHeader === 'Token') {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', 'Token ' + localStorage.getItem('token'))
      });
      return next.handle(cloneReq);
    }
    return next.handle(req);
  }
}
