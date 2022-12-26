import { PackageStatusHistoryComponent } from './../../commons/package-status-history/package-status-history.component';
import { PaymentDialogComponent } from './../../commons/payment-dialog/payment-dialog.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AppUtilsService } from 'src/app/services/app-utils.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CountryEnum } from 'src/app/utils/enums';
import { owlCustomOptions } from 'src/app/utils/owl-config';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';

import { OrderApiCallsService } from 'src/app/services/network-calls/order-api-calls.service';
import { LoginMainComponent } from '../../commons/login-main/login-main.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modules/user';
import { LoginUpdateService } from 'src/app/services/login-update.service';



//JavaScript Functions
// declare const custom:any;
// declare const main:any;
// ///declare const parallaxie: any;
// declare const $;

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  constructor(
    private title: Title,
    private constantValues: ConstantValuesService,
    
    private shopsApiCalls: ShopApiCallsService,
    private router: Router,
    private route: ActivatedRoute,
    private orderApiCalls: OrderApiCallsService,
    private dialog: MatDialog,
    private loginUpdate: LoginUpdateService,
    private authService: AuthService
  ) {
    this.orderId = this.route.snapshot.params['id'];
    if (this.orderId !== null && this.orderId !== '' && this.orderId !== undefined) {
      this.getMallOrderDetail(this.orderId);
    }
   }


    //Call JavaScript functions onload
  // onload(){
  //   custom();
  //   main();
  //   //parallaxie();
  // }

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

  isLoggedIn = false;
  
  currentUser: User;


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;
   
    this.getIndustries()
    this.getFeaturedShops({});
    this.getMyOrders();
    this.title.setTitle(this.constantValues.APP_NAME + ' | Cart');

    // $('#flip').on("click",function(){
    //   $("#panel").slideToggle("slow");
    // });

    // $('.search_btn').on("click",function(){
    //   $("#search_body_collapse").slideToggle("slow");
    // });
    // this.onload();

     //Check if user is not login and alert user
     if (!this.isLoggedIn) {
      this.dialog.open(LoginMainComponent,{panelClass: 'custom-dialog-container'}).afterClosed().subscribe((isSuccefull: boolean) => {
        if (isSuccefull) {
          this.isLoggedIn = this.authService.isLogedIn;
          this.currentUser = this.authService.currentUser;
          this.loginUpdate.isUpdated(true);
          console.log("This isLogined=:"+ this.isLoggedIn);
          window.location.reload();
        
        }
      });
     }
      //login popup end
  }


  getMallOrderDetail(id) {
    this.isProcessing = true;
    this.orderApiCalls.getCustomerOrderByOrderId(id, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.orderDetail = result.results;
        this.orderItems = result.results.customer_mall_items;
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
