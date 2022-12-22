import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantValuesService } from './constant-values.service';
import { NetworkErrorHandlerService } from './network-error-handler.service';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  headers:any;
  headersForFormData:any;
  headersNoToken:any;
  options;
  optionsForFormData;
  optionsNoToken;
  token:any;
  constructor(
    private http: HttpClient,
    private constantValuesService: ConstantValuesService,
    private handleNetworkErrorsService: NetworkErrorHandlerService) {
    this.token=localStorage.getItem('token');
    this.headers = new HttpHeaders();
    this.headersNoToken = new HttpHeaders();
    this.headersForFormData = new HttpHeaders();
    this.headers = this.headers.set('Authorization', 'Token');
    //this.headers=this.headers.set('Authorization',`Token ${this.token}`);
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headersNoToken = this.headersNoToken.set('Content-Type', 'application/json');
    this.headersForFormData = this.headersForFormData.append('Authorization', 'Token');
    this.options = { headers: this.headers };
    this.optionsForFormData = { headers: this.headersForFormData };
    this.optionsNoToken = { headers: this.headersNoToken };
  }
  /**
   * HTTP POST request to fetch data
   * @param endPoint Endpoint
   * @param jsonResource Request Payload
   */
  getAll(endPoint: string, jsonResource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL + endPoint, JSON.stringify(jsonResource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
 /**
  * HTTP POST request to fetch data
  * @param endPoint Endpoint
  * @param jsonResource Request Payload
  */
  postSearch(endPoint: string, jsonResource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL + endPoint, JSON.stringify(jsonResource), this.options)
      .pipe(
        debounceTime(500),
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP GET request to fetch data
   * @param endPoint Endpoint
   */
  httpGetAll(endPoint: string): Observable<any> {
    return this.http.get(this.constantValuesService.BASE_URL + endPoint, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP GET request to fetch data
   * @param endPoint Endpoint
   */
  httpGetAllNoToken(endPoint: string): Observable<any> {
    return this.http.get(this.constantValuesService.ADMIN_BASE_URL + endPoint, this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP GET request to fetch data
   * @param url URL
   */
  httpGetNextPage(url: string): Observable<any> {
    return this.http.get(url, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP POST request to fetch data
   * @param url URL
   * @param resource request payload. OPTIONAL
   */
  httpPostNextPage(url: string, resource?: any): Observable<any> {
    return this.http.post(url, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP POST request to submit data
   * @param endPoint Endpoint
   * @param resource Request Payload
   */
  create(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL + endPoint, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  
  /**
   * HTTP POST request to submit data
   * @param endPoint Endpoint
   * @param resource Request Payload
   */
  createNoToken(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL + endPoint, JSON.stringify(resource), this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  createNoToken2(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL_KOKORKO + endPoint, JSON.stringify(resource), this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }

  createNoTokenNews(endPoint: string, resource?: any): Observable<any> {
    return this.http.post(this.constantValuesService.NEWS_LETTER_URL + endPoint, JSON.stringify(resource), this.optionsNoToken).
    pipe(
      map((response)=>response),
      catchError(err => err))
  }
  /**
   * HTTP POST request to fetch data
   * @param url URL
   * @param resource request payload. OPTIONAL
   */
  httpPostNextPageNoToken(url: string, resource?: any): Observable<any> {
    return this.http.post(url, JSON.stringify(resource), this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP GET request to fetch data
   * @param url URL
   */
  httpGetNextPageNoToken(url: string): Observable<any> {
    return this.http.get(url, this.optionsNoToken)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP POST to create record with FormData payload
   * @param endPoint Endpoint
   * @param resource FormData Request Payload
   */
  createForFormData(endPoint: string, resource?: FormData): Observable<any> {
    return this.http.post(this.constantValuesService.BASE_URL + endPoint, resource, this.optionsForFormData)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP PUT request to update data
   * @param endPoint Endpoint
   * @param resource Request Payload
   */
  update(endPoint: string, resource?: any): Observable<any> {
    return this.http.put(this.constantValuesService.BASE_URL + endPoint, JSON.stringify(resource), this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP PUT to update data with FormData payload
   * @param endPoint Endpoint
   * @param resource FormData Request Payload
   */
  updateForFormData(endPoint: string, resource?: FormData): Observable<any> {
    return this.http.put(this.constantValuesService.BASE_URL + endPoint, resource, this.optionsForFormData)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
  /**
   * HTTP DELETE request to delete data
   * @param endPoint Endpoint
   */
  delete(endPoint: string): Observable<any> {
    return this.http.delete(this.constantValuesService.BASE_URL + endPoint, this.options)
      .pipe(
        catchError(this.handleNetworkErrorsService.handleError),
        map((response) => response)
      );
  }
 /**
  * Fetch country names and phone codes locally
  */
  public getIntTelCodes(): Observable<any> {
    return this.http.get('./assets/json/country-codes.json');
  }
  /**
   * Fetch current location info
   */
  public getCurrentLocationInfo(): Observable<any> {
    return this.http.get(this.constantValuesService.GET_CURRENT_LOCATION);
  }
}



