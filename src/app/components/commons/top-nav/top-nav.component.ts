import { LoginComponent } from 'src/app/components/commons/login/login.component';
import { SignUpComponent } from './../sign-up/sign-up.component';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { AuthService } from './../../../services/auth.service';
import { User } from 'src/app/modules/user';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CountryEnum, PromosEnum } from 'src/app/utils/enums';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { ProductsFilterParams } from 'src/app/interfaces/products-filter-params';
import { LoginMainComponent } from '../login-main/login-main.component';
import { LoginUpdateService } from 'src/app/services/login-update.service';
import { Subscription } from 'rxjs';
//import Jquery
// import * as $ from 'jquery';
//JavaScript Functions
// declare const custom:any;
// declare const main:any;
// declare const parallaxie: any;
declare const $;
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() shopName = 'StoreFront Mall';
  shopInfo;
  cartItems = [];
  productGroups = [];
  featuredShops = [];
  industries = [];
  pGroups = [];
  isLoggedIn = false;
  currentUser: User;
  subTotal = 0;
  currency: any;
  products = [];
  isProcessing = false;
  totalPage = 0;
  @Input() target: any;
  productSearchFormControl = new FormControl('');
  // tslint:disable-next-line: no-output-on-prefix
  @Output() categoryChange = new EventEmitter();
  @Output() htmlTarget = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onProductGroupSelected = new EventEmitter();

  countriesEnum = CountryEnum;
  country = '';
  selectedCategory = '';
  isSearching = false;
  searchControl: FormControl = new FormControl('');
  subdomain = '';
  gtpSubdomin = '';
  toggleYoungSideBar = false;
  toggleYoungCart = false;
  toggleYoungSearch = false;
  //  featuredShops = [];
  //  industries = [];
  ProductsTitle = "Popular Products";
  selectedPriceSorting: string;
  searchQuery: string;
  tag: string;
  isProcessingFeaturedShops: boolean;
  istest = false;
  constructor(
    private shopsApiCalls: ShopApiCallsService,
    private getHostname: GetHostnameService,
    private authService: AuthService,
    private dialog: MatDialog,
    private dbaseUpdate: DbaseUpdateService,
    private router: Router,
    private route: ActivatedRoute,
    private constantValues: ConstantValuesService,
    private productsApiCalls: ProductsApiCallsService,
    private loginUpdateSerivice: LoginUpdateService,
  ) { }
  //Call JavaScript functions onload
  //  onload(){
  //   custom();
  //   main();
  //   parallaxie();

  subscription: Subscription;

  async ngOnInit(): Promise<void> {
    this.subscription = this.loginUpdateSerivice.updateStatus().subscribe(login => {
      // console.log("ISLogin: "+ login);
      this.isLoggedIn = this.authService.isLogedIn;
      this.currentUser = this.authService.currentUser;
      //this.isLoggedIn=login;
    });
    this.getFeaturedShops({});
    this.getIndustries();
    // console.log("Products: ->");
    $('.user_btn').on("click", function () {
      $("#panel").slideToggle("slow");
    });

    $('.search_btn').on("click", function () {
      $("#search_body_collapse").slideToggle("slow");
    });
    // this.onload();
    $('#close-panel').on("click", function () {
      $("#panel").slideToggle("slow");
    });
    this.subdomain = this.getHostname.subDomain;
    // this.subdomain = this.constantValues.GTP_SUBDOMAIN;
    this.gtpSubdomin = this.constantValues.GTP_SUBDOMAIN;
    // console.log(this.suddomain);

    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;
    //console.log("Current User-->"+ JSON.stringify( this.currentUser,null,2));
    this.authService.setPromoCode(this.route.snapshot.queryParams['promoCode']);
    this.dbaseUpdate.updateStatus().subscribe(async isUpdated => {
      if (isUpdated) {
        await this.getCartItems();
      }
    });
    await this.getCartItems();

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      if (searchTerm !== null && searchTerm !== undefined && searchTerm !== '' && searchTerm.length >= 2) {
        this.isSearching = true;
        // TODO:  this.getProducts({ storefrontmall_name: this.getHostname.subDomain, search_text: searchTerm });
        this.getProducts({ storefrontmall_name: this.subdomain, search_text: searchTerm });
      }
    });
    // this.getShopInfo();
    this.getProductGroups();


  }

  getShopInfo() {
    this.shopsApiCalls.getShopByOnlineAddress(this.getHostname.subDomain, (error, result) => {
      if (result !== null && result.response_code === '100') {
        this.shopInfo = result.results;
      }
    });
  }
  onSignup() {
    this.dialog.open(SignUpComponent, { panelClass: 'custom-dialog-container' });
    //this.router.navigate(['/sign-up']);

  }
  onSignOut() {
    this.authService.logOut();
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;
    window.location.reload();
  }
  onSignIn() {
    //this.router.navigate(['/login']);

    this.dialog.open(LoginMainComponent, { panelClass: 'custom-dialog-container' }).afterClosed().subscribe((isSuccefull: boolean) => {
      if (isSuccefull) {
        this.isLoggedIn = this.authService.isLogedIn;
        this.currentUser = this.authService.currentUser;
      }
    });
  }
  async getCartItems() {
    await this.productsApiCalls.getCartItems((error, result) => {
      if (result !== null) {
        this.cartItems = result;
        if (this.cartItems.length > 0) {
          this.currency = this.cartItems[0].item.currency;
          this.country = this.cartItems[0].country;
        }
        this.getSubTotal();
      }
    });
  }
  /**
   * Remove item from cart
   * @param id item id
   */
  removeItemFromCart(id) {
    this.productsApiCalls.removeCartItem(id, (error, result) => {
      if (result !== null) {
        // this.getCartItems();
        this.dbaseUpdate.dbaseUpdated(true);
      }
    });
  }
  getSubTotal() {
    if (this.country === this.countriesEnum.GH) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
    }
    else if (this.country === this.countriesEnum.NG) {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_ngn), 0);
    } else {
      this.currency = '$';
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
    }
  }

  onProductCategorySelected(item) {
    this.onProductGroupSelected.emit(item);
    this.selectedCategory = item.name;
    this.router.navigate(['/mall'], { queryParams: { cid: item.id, category: item.name }, queryParamsHandling: 'merge' });
  }
  onViewPromo() {
    this.router.navigate(['/mall'], { queryParams: { tag: PromosEnum.FATHERS_DAY_PROMO }, queryParamsHandling: 'merge' });
  }
  getProductGroups() {
    // TODO:
    this.productsApiCalls.getProducts({ storefrontmall_name: "kokorko" }, (error, result) => {
      if (result !== null && result.response_code === '100' && result.product_groups.length > 0) {
        this.pGroups = result.product_groups;
      }
    });
  }
  /**
   * Redirect to view all search results
   */
  viewAllSearchResult() {
    // tslint:disable-next-line: max-line-length
    if (this.searchControl.value !== null && this.searchControl.value !== undefined && this.searchControl.value !== '') {
      this.isSearching = false;
      this.router.navigate(['/display-products'], { queryParams: { q: this.searchControl.value } });
    }
  }
  showSearchDropdown() {
    // tslint:disable-next-line: max-line-length
    if (this.searchControl.value !== null && this.searchControl.value !== undefined && this.searchControl.value !== '') {
      this.isSearching = true;
    }
  }
  /**
   * Get products by filter parameters
   * @param filterParams filter parameters
   */
  getProducts(filterParams: ProductsFilterParams) {
    this.isProcessing = true;
    this.productsApiCalls.getProducts(filterParams, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response_code === '100') {
        this.country = result.country;
        this.products = result.results;
        this.totalPage = result.count;
        this.constantValues.COUNTRY = this.country;
      }
    });
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

  scrollTo(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  filterCategory(category, el: HTMLElement) {
    this.htmlTarget.emit(category);
    this.selectedCategory = category;
    this.ProductsTitle = category + " Products";

    this.getProducts({ sorting: this.selectedPriceSorting, product_group_id: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });

    el.scrollIntoView({ behavior: 'smooth' });
  }

  filterByCategory(category, el: HTMLElement) {
    this.isSearching = true;
    this.ProductsTitle = category + " Products";
    this.selectedCategory = category;

    this.getProducts({ sorting: this.selectedPriceSorting, product_group_id: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });
    el.scrollIntoView({ behavior: 'smooth' });
  }

}
