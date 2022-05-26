import { ConstantValuesService } from 'src/app/services/constant-values.service';

import { customOptions,customOptions1, slides1,customOptionsHome} from './../../../../utils/constants';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';
//import { OrderApiCallsService } from './../../../../../../services/network-calls/order-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { NotificationsService } from 'src/app/services/notifications.service';




import { ActivatedRoute, Router } from '@angular/router';

//import { SwiperOptions } from 'swiper';
import { AuthService } from 'src/app/services/auth.service';
import { ICallback } from 'src/app/classes/callback-method';
import { FormControl } from '@angular/forms';
import { servicesCarouselConfig } from 'src/app/utils/owl-config';
import { PriceSortingEnums } from 'src/app/utils/enums';
import { ProductsFilterParams } from 'src/app/interfaces/products-filter-params';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { JsonpClientBackend } from '@angular/common/http';



//import Jquery
//import * as $ from 'jquery';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
declare const $;
@Component({
  selector: 'app-supermarket',
  templateUrl: './supermarket.component.html',
  styleUrls: ['./supermarket.component.scss']
})
export class SupermarketComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsApiCallsService,
    private router: Router,
    private dataProvider: DataProviderService,
    private constantValues : ConstantValuesService,
    private notificationService: NotificationsService,
    private getHostname: GetHostnameService,
    private shopsApiCalls: ShopApiCallsService,
  ) { }

  products = [];
  filterParams = {};
  country = '';
  productSearchFormControl = new FormControl();
  featuredShops = [];
  isProcessing = false;
  isProcessingShopInfo = false;
  hasTopTrendingProducts = false;
  isProcessingFeaturedShops: boolean;

  protocol = '';
  url = '';
  totalAmount = '';
  totalPage = 0;
  nextPage = '';
  prevPage = '';
  product_groups = [];
  industries = [];
  shopInfo;
  tag = '';

  sliders = [];
  servicesSliderConfig = servicesCarouselConfig;
  selectedCategoryId = '';
  selectedCategory = '';
  priceSorting = PriceSortingEnums;
  selectedPriceSorting = '';
  searchQuery = '';
  productListTitle: string;
  isSearching: boolean;
  subdomain = '';
  gtpSubdomain = '';
  woodinSubdomain = '';

  shopHasActivePromo = false;
  promoCodes = [];
  exchangeRate = 0;


  customOptions=customOptions;
  customOptions1=customOptions1;
  slides1=slides1;
  customOptionsHome=customOptionsHome;


  //Call JavaScript functions onload
  onload(){
  custom();
  main();
  parallaxie();
}


  ngOnInit(): void {
    this.protocol = this.constantValues.STOREFRONT_MALL_URL_PROTOCOL;
    this.url = this.constantValues.STOREFRONT_MALL_URL;
    this.subdomain = this.getHostname.subDomain;
    this.gtpSubdomain = this.constantValues.GTP_SUBDOMAIN;
    this.woodinSubdomain = this.constantValues.WOODIN_SUBDOMAIN;
    this.getProducts({ tag: this.tag, storefrontmall_name: this.subdomain });
    this.getShopInfo();
    this.getIndustries()
    this.getFeaturedShops({});

    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
      $(".item_content").addClass("test");
      $('#panel').removeClass('active');

    });




    $('.search_btn').on("click",function(){
      $("#search_body_collapse").slideToggle("slow");

    });
    this.onload();


  }

  openDialog() {
    this.dialog.open(ViewProductComponent, {
      data: {
        animal: 'panda',
      },
    });
  }


/**
   * Get products by filter parameters
   * @param filterParams filter parameters
   */
 getProducts(filterParams: ProductsFilterParams) {
  this.isProcessing = true;
  // this.products = [];
  this.filterParams = filterParams;
  this.productsService.getProducts(filterParams, (error, result) => {
    this.isProcessing = false;
    if (result !== null && result.response_code === '100') {
      this.country = result.country;
      this.products = result.results;
      this.prevPage = result.previous;
      this.nextPage = result.next;
      this.totalPage = result.count;
      this.product_groups = result.product_groups;
      this.constantValues.COUNTRY = this.country;
      console.log(this.products);
      console.log(this.country);
      console.log(this.product_groups);
    }
  });
}

getFeaturedShops({ }) {
  this.isProcessingFeaturedShops = true;
  this.shopsApiCalls.getFeaturedShops({}, (error, result) => {
    this.isProcessingFeaturedShops = false;
    if (result !== null) {
      this.featuredShops = result.results;
      console.log("this.featuredShops-->"+ JSON.stringify(this.featuredShops));
    }
  });
}

getIndustries() {
  this.shopsApiCalls.getIndustries((error, result) => {
    this.industries = result;
    console.log("this.industries "+ JSON.stringify(this.industries) );
  });
}

getShopInfo() {
  // const suddomain = (this.getHostname.subDomain === 'localhost') ? environment.pluto : this.getHostname.subDomain;
  this.shopsApiCalls.getShopByOnlineAddress(this.subdomain, (error, result) => {
    if (result !== null && result.response_code === '100') {
      this.shopInfo = result.results;
      this.exchangeRate = (result.results.exchange_rate !== '' && result.results.exchange_rate !== null && result.results.exchange_rate !== undefined) ? +result.results.exchange_rate : 0;

    }
    console.log("this.shopInfo " +this.shopInfo);
  });
}

filterCategory(el: HTMLElement) {

      el.scrollIntoView({behavior: 'smooth'});
  }

}

