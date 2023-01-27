import { User } from './../../../modules/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUtilsService } from 'src/app/services/app-utils.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CountryEnum } from 'src/app/utils/enums';
import { PackageStatusHistoryComponent } from '../../commons/package-status-history/package-status-history.component';
import { PaymentDialogComponent } from '../../commons/payment-dialog/payment-dialog.component';
import { LoginMainComponent } from '../../commons/login-main/login-main.component';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { CustomersApiCallsService } from 'src/app/services/network-calls/customers-api-calls.service';
declare const custom: any;
@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss']
})
export class ProfileSidebarComponent implements OnInit {
  currentUser: User;
  user:any;
  constructor(

    private title: Title,
    private constantValues: ConstantValuesService,
  
    private shopsApiCalls: ShopApiCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private orderApiCalls: OrderApiCallsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private loginUpdate: LoginUpdateService,
    private customerApIService: CustomersApiCallsService,
   
  ) { 
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId !== null && this.orderId !== '' && this.orderId !== undefined) {
      this.getMallOrderDetail(this.orderId);
    }
  }

  isProcessingFeaturedShops: boolean;

  isProcessing = false;
  orderId = '';
  orderDetail;
  orderItems = [];
  shopInfo: any;
  exchangeRate: number;
  selectedCategory: any;
  ProductsTitle="Popular Products";
  selectedPriceSorting: any;
  searchQuery: any;
  tag: any;
  isSearching: boolean;
  productGroups = [];
  featuredShops = [];
  industries = [];
  @Output() htmlTarget = new EventEmitter();
  cartItems = [];
  recentlyViewedItems = [];
  //isProcessing = false;
  currency = '';
  subTotal = 0;
  totalSellingPrice = 0;
  formGroup: FormGroup;
  countriesEnum = CountryEnum;
  country = '';
  qty:number;

  orders = [];
  rootRoute = 'account/orders';
  referalCodeDetails:any;
  isLoggedIn = false;
  
  onload() {
    custom();
    //main();
    //parallaxie();
  }

  ngOnInit(): void {
    
    //login popup end
    this.getIndustries()
    this.getFeaturedShops({});
    this.getMyOrders();
    this.title.setTitle(this.constantValues.APP_NAME + ' | Account');
    this.user = this.authService.currentUser;
    this.onload();
    this.user=this.authService.currentUser;
   // this.getReferalCodeDetails('YYB536');
  }

  getReferalCodeDetails(code){
    this.isProcessing = true;
    this.customerApIService.getReferalCodeDetails(code,results=>{
      if(results !==null || results !== undefined){
        this.referalCodeDetails = results?.data;
        // console.log(JSON.stringify(results,null,2));
        // console.log(this.referalCodeDetails?.amount);
      }
    })
  }
  logOut() {
    this.logOut();
  }

  getMallOrderDetail(id) {
    this.isProcessing = true;
    this.orderApiCalls.getCustomerOrderByOrderId(id, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.orderDetail = result.results;
        this.orderItems = result.results.customer_mall_items;
        //console.log("This.orderDetail=>"+JSON.stringify(this.orderDetail,null,2))
      }
    });

  }
  goBack() {
    this.router.navigate(['/profile-view/orders']);
  }

  viewMyOrders() {
    this.router.navigate([this.rootRoute]);
  }

  getMyOrders() {
    this.isProcessing = true;
    this.orderApiCalls.getCustomerOrders((error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.orders = result.results;
        //console.log("this.orders-->"+ JSON.stringify(this.orders,null,2));
      }
    });
  }
  getDtetailURL(id) {
    return [this.rootRoute + '/detail', id];
  }
  viewPackageStatusHistory(item) {
    this.dialog.open(PackageStatusHistoryComponent, {data: {order_item: item}});
  }
  changePaymentMethod() {
    this.dialog.open(PaymentDialogComponent, {data: {order: this.orderDetail}});
  }
  getFeaturedShops({ }) {
    this.isProcessingFeaturedShops = true;
    this.shopsApiCalls.getFeaturedShops({}, (error, result) => {
      this.isProcessingFeaturedShops = false;
      if (result !== null) {
        this.featuredShops = result.results;
        //console.log("this.featuredShops-->"+ JSON.stringify(this.featuredShops));
      }
    });
  }

  getIndustries() {
    this.shopsApiCalls.getIndustries((error, result) => {
      this.industries = result;
      //console.log("this.industries "+ JSON.stringify(this.industries) );
    });
  }

  getShopInfo() {
    // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
    this.shopsApiCalls.getShopByOnlineAddress(this.subdomain, (error, result) => {
      if (result !== null && result.response_code === '100') {
        this.shopInfo = result.results;
        this.exchangeRate = (result.results.exchange_rate !== '' && result.results.exchange_rate !== null && result.results.exchange_rate !== undefined) ? +result.results.exchange_rate : 0;

      }
      //console.log("this.shopInfo " +this.shopInfo);
    });
  }
    subdomain(subdomain: any, arg1: (error: any, result: any) => void) {
      throw new Error('Method not implemented.');
    }

  filterCategory(category,el: HTMLElement) {
    this.selectedCategory = category;
    this.ProductsTitle=category +" Products";

    this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });

        el.scrollIntoView({behavior: 'smooth'});
    }
    getProducts(arg0: { sorting: any; industry: any; search_text: any; tag: any; }) {
      throw new Error('Method not implemented.');
    }

  filterByCategory(category,el: HTMLElement) {
      this.isSearching=true;
      this.ProductsTitle=category +" Products";
      this.selectedCategory = category;

      this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });
      el.scrollIntoView({behavior: 'smooth'});
    }



}
