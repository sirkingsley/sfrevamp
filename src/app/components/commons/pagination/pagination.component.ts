import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageSize = 10;
  previousTotalPage = 0;
  @Input() prevPage = '';
  @Input() nextPage = '';
  @Input() totalPage = 0;
  pageIndex = 0;
  @Input() requestMethod = 'POST';
  @Input() requestPayload = {};
  @Input() dataSet = [];
  @Output() pageChanged = new EventEmitter();
  @Input() isProcessing = false;
  isProcessingMoreData = false;
  @Output() isProcessingChange = new EventEmitter();
  pageChangedObservable: Observable<any>;
  requestUrl: string;
  constructor(
    private dataProvider: DataProviderService,
    private notificationService: NotificationsService,
    private constantValues: ConstantValuesService
  ) { }

  ngOnInit(): void {
  }
   /**
    * Navigate to next or previous page
    * @param e event data
    */
  changePage(direction) {
    this.pageIndexCalculation(direction);
    this.isProcessingMoreData = true;
    this.isProcessingChange.emit(true);
    if (this.requestMethod === 'POST') {
      this.pageChangedObservable = this.dataProvider.httpPostNextPageNoToken(this.requestUrl, this.requestPayload);
    } else if (this.requestMethod === 'GET') {
      this.pageChangedObservable = this.dataProvider.httpGetNextPageNoToken(this.requestUrl);
    }
    this.pageChangedObservable.subscribe(result => {
      this.isProcessingMoreData = false;
      this.isProcessingChange.emit(false);
      if (result) {
        this.prevPage = result.previous;
        this.nextPage = result.next;
        this.totalPage = result.count;
        this.dataSet = result.results;
        this.pageChanged.emit(result);
      }
    }, error => {
      this.isProcessingMoreData = false;
      this.isProcessingChange.emit(false);
      this.notificationService.error(this.constantValues.APP_NAME, error.detail);
    });
  }
  /**
   * Page Index Calculation
   * @param e change page event
   */
  pageIndexCalculation(direction) {
    if (direction === 'next') {
      if (this.nextPage !== null && this.nextPage !== '' && this.nextPage !== undefined) {
        this.requestUrl = this.nextPage;
      } else { return; }
    } else {
      if (this.prevPage !== null && this.prevPage !== '' && this.prevPage !== undefined) {
        this.requestUrl = this.prevPage;
      } else { return; }
    }
  }
}
