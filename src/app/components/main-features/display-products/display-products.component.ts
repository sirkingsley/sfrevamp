import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductsFilterParams } from 'src/app/interfaces/products-filter-params';
import { User } from 'src/app/modules/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CountryEnum, PriceSortingEnums, PromosEnum } from 'src/app/utils/enums';
import { servicesCarouselConfig } from 'src/app/utils/owl-config';
import { CartPopUpComponent } from '../../commons/cart-pop-up/cart-pop-up.component';
import { ViewProductComponent } from '../../commons/view-product/view-product.component';

//JavaScript Functions
declare const custom:any;
declare const main:any;
declare const parallaxie: any;
declare const $;

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  constructor(
    private shopsApiCalls: ShopApiCallsService,
    private productsService: ProductsApiCallsService,
    public dialog: MatDialog,

    private constantValues : ConstantValuesService,


    private router: Router,
    private dataProvider: DataProviderService,

    private notificationService: NotificationsService,
    private getHostname: GetHostnameService,

    private dbaseUpdate: DbaseUpdateService,


    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  @Input() shopName = 'StoreFront Mall';
  shopInfo: any;
  cartItems = [];
  @Input() productGroups = [];
  pGroups = [];
  isLoggedIn = false;
  currentUser: User;
  subTotal = 0;
  currency: any;
  products = [];
  isProcessing = false;
  totalPage = 0;
  productSearchFormControl = new FormControl('');
  // tslint:disable-next-line: no-output-on-prefix
  @Output() categoryChange = new EventEmitter();
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

  slug: any;

  ProductsTitle="Popular Products";

 filterParams = {};



 protocol = '';
 url = '';
 totalAmount = '';

 nextPage = '';
 prevPage = '';
 product_groups = [];


 tag = '';

 sliders = [];
 servicesSliderConfig = servicesCarouselConfig;
 selectedCategoryId = '';

 priceSorting = PriceSortingEnums;
 selectedPriceSorting = '';
 searchQuery = '';
 productListTitle: string;


 gtpSubdomain = '';
 woodinSubdomain = '';

 shopHasActivePromo = false;
 windowLoaded=false;
 promoCodes = [];
 exchangeRate = 0;


  selectedValue: string;
  selectedCar: string;

  prices = [
    {value: 'All-Prices', viewValue: 'All Prices'},
    {value: 'From-Lowest-to-Highest', viewValue: 'From Lowest to Highest'},
    {value: 'From-Highest-to-Lowest', viewValue: 'From Highest to Lowest'},
  ];
  featuredShops = [];
  industries = [];
  isProcessingShopInfo = false;
  hasTopTrendingProducts = false;
  isProcessingFeaturedShops: boolean;


    //Call JavaScript functions onload
    onload(){
      custom();
      main();
      parallaxie();
    }
  async ngOnInit(): Promise<void> {
    this.subdomain = this.getHostname.subDomain;
    // this.subdomain = this.constantValues.GTP_SUBDOMAIN;
    this.gtpSubdomin = this.constantValues.GTP_SUBDOMAIN;
    // console.log(this.suddomain);
    this.isLoggedIn = this.authService.isLogedIn;
    this.currentUser = this.authService.currentUser;
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
    this.getShopInfo();
    this.getProductGroups();
    this.protocol = this.constantValues.STOREFRONT_MALL_URL_PROTOCOL;
    this.url = this.constantValues.STOREFRONT_MALL_URL;
    this.subdomain = this.getHostname.subDomain;
    this.gtpSubdomain = this.constantValues.GTP_SUBDOMAIN;
    this.woodinSubdomain = this.constantValues.WOODIN_SUBDOMAIN;
    this.route.params.subscribe(param => {

      if(param['pageSec']){
        this.selectedCategory=param['category'];
        this.ProductsTitle=this.selectedCategory +" Products";
        this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });
      }else{
      this.getProducts({});
      }
    });
    this.getIndustries()
    this.getFeaturedShops({});

    $('#flip').on("click",function(){
      $("#panel").slideToggle("slow");
    });

    $('.search_btn').on("click",function(){
      $("#search_body_collapse").slideToggle("slow");

    });
    this.onload();
  }

  ngAfterViewInit(): void {

    this.route.params.subscribe(param => {
      if(param['pageSec']){
      let section = document.querySelector('#silas');
      //const section = this.container.nativeElement.querySelector(`#${param.pageSec}`)
      //console.log(section)

      section?.scrollIntoView();
      }
    })

  }
openDialog(item) {
  this.dialog.open(ViewProductComponent, {

    data: {
      item: item,
    },
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
      //console.log("this.products-->"+JSON.stringify(this.products,null,2));
      //console.log(this.country);
      //console.log(this.product_groups);
    }
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
filterCategory(category: string,el: HTMLElement) {
  this.selectedCategory = category;
  this.ProductsTitle=category +" Products";

  this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });

      el.scrollIntoView({behavior: 'smooth'});
  }

filterByCategory(category: string,el: HTMLElement) {
    this.isSearching=true;
    this.ProductsTitle=category +" Products";
    this.selectedCategory = category;

    this.getProducts({ sorting: this.selectedPriceSorting, industry: this.selectedCategory, search_text: this.searchQuery, tag: this.tag });
    el.scrollIntoView({behavior: 'smooth'});
  }

  scrollTo(target:HTMLElement){
    target.scrollIntoView({behavior: 'smooth'});
  }


  async addProductToCart(product) {
    const stockQty = +product.new_quantity;
    if (stockQty <= 0) {
      //this.toastr.error('Out of Stock!');
      this.notificationService.error(this.constantValues.APP_NAME, product.name + ' has run out of stock');

      return;
    }
    const selling_price = +product.selling_price;
    const selling_price_usd = +product.selling_price_usd;
    // tslint:disable-next-line: variable-name
    const total_amount = selling_price;
    const total_amount_usd = selling_price_usd;
    // tslint:disable-next-line: max-line-length
    const data = {
      item: product,
      quantity: 1,
      total_amount,
      total_amount_usd,
      date_added: new Date(),
      country: this.country
      };
    //console.log("Started adding-->");
    await this.productsService.addProductToCart(data, (error, result) => {
      //console.log("adding ing service-->");
      if (result !== null) {
        //console.log("added");
        this.dbaseUpdate.dbaseUpdated(true);
        //this.toastr.success(product.name + ' has been successfully added to cart');
        this.notificationService.success(this.constantValues.APP_NAME, product.name + ' has been successfully added to cart');

      }
    });
  }

  async getCartItems() {
    await this.productsService.getCartItems((error, result) => {
      if (result !== null) {
        this.cartItems = result;
        this.cartItems = result.sort(this.compare);
        //console.log("Cart length-->"+this.cartItems.length);
        //console.log("Cart-->"+ JSON.stringify(this.cartItems,null,2));
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
  removeItemFromCart(id: any) {
    this.productsService.removeCartItem(id, (error, result) => {
      if (result !== null) {
        // this.getCartItems();
        this.dbaseUpdate.dbaseUpdated(true);
      }
    });
  }
  getSubTotal() {
    if (this.country === this.countriesEnum.GH || this.country === this.countriesEnum.NG || this.country === undefined || this.country === '') {
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
    } else {
      this.currency = '$';
      this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
    }
  }
  onProductCategorySelected(item: { name: string; id: any; }) {
    this.onProductGroupSelected.emit(item);
    this.selectedCategory = item.name;
    this.router.navigate(['/mall'], { queryParams: { cid: item.id, category: item.name }, queryParamsHandling: 'merge' });
  }
  onViewPromo() {
    this.router.navigate(['/mall'], { queryParams: { tag: PromosEnum.FATHERS_DAY_PROMO }, queryParamsHandling: 'merge' });
  }
  getProductGroups() {
    // TODO:
    this.productsService.getProducts({storefrontmall_name: this.subdomain}, (error, result) => {
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
      this.router.navigate(['/mall'], {queryParams: {q: this.searchControl.value}});
    }
  }
  showSearchDropdown() {
    // tslint:disable-next-line: max-line-length
    if (this.searchControl.value !== null && this.searchControl.value !== undefined && this.searchControl.value !== '') {
      this.isSearching = true;
    }
  }

   //sort cart items

   compare( a:any, b:any ) {
    if ( a.item.name < b.item.name ){
      return -1;
    }
    if ( a.item.name > b.item.name ){
      return 1;
    }
    return 0;
  }

  openCartDialog(): void {
    this.dialog.open(CartPopUpComponent,{panelClass: ['animate__animated','animate__slideInRight']}

   );
  }
  /**
   * On page changed
   * @param result result after page changed
   */
 onPageChanged(result: { results: any[]; previous: string; next: string; count: number; }) {
  this.products = result.results;
  this.prevPage = result.previous;
  this.nextPage = result.next;
  this.totalPage = result.count;
}


}
