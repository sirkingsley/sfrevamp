import { get } from 'jquery';

import { Component, Inject, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { GetHostnameService } from 'src/app/services/get-hostname.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SEOService } from 'src/app/services/seo.service';
import { CountryEnum } from 'src/app/utils/enums';
import { CartPopUpComponent } from '../cart-pop-up/cart-pop-up.component';
import { config,config2,config3,config4 } from 'src/app/utils/swiper-configs';
// import Swiper core and required modules
import SwiperCore, { A11y, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper';
declare const custom:any;
declare const main:any;
/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'view-product',
  templateUrl: 'view-product.component.html',
})
export class ViewProductComponent implements OnInit {
  cartItems: any;
  currency: any;
  subTotal: any;
  totalSellingPrice: any;
  appUtils: any;
  formGroup: any;
  isSearching: boolean;
  ProductsTitle: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private productsApiCalls: ProductsApiCallsService,
    private constantValues: ConstantValuesService,
    private dbaseUpdate: DbaseUpdateService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private seoService: SEOService,
    private title: Title,
    private route: ActivatedRoute,
    private productsService: ProductsApiCallsService,
    ) {}

    productId:number;
    productDetail;
    productDetailShimmer=[1,2,3]
    compressedImage = '';
    image = '';
    isProcessing: boolean;
    slug;
    protocol = '';
    url = '';
    quantity = 1;
    relatedProducts = [];
    extraImages = [];
    quantities = [];
    item:any;
    product_slug:any;
    product_id:any;
    isProcessingRelatedProducts: boolean;
    country = '';
    countriesEnum = CountryEnum;
    currentUrl = '';
    quantityRemaining = 1;
    config=config;
    config3=config3;
    config2=config2;
    config4=config4;

  ngOnInit() {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,EffectFade]);
    this.title.setTitle(this.constantValues.APP_NAME + ' Product Detail');
    this.country = this.constantValues.COUNTRY;
    this.protocol = this.constantValues.STOREFRONT_MALL_URL_PROTOCOL;
    this.url = this.constantValues.STOREFRONT_MALL_URL;
    this.getCartItems();


    this.route.queryParams.subscribe(param => {
      if(param['slug']){
        const product_slug = param['slug'];
        //console.log(param['slug']);
        this.product_slug=product_slug;
        this.getProductBySlug(param['slug']);
      }else{
        //console.log("no slug");
      }
    
      
    });


    // this.route.params.subscribe(param => {
    //   this.currentUrl = this.getHostname.url;
    //   this.slug = param['slug'];
    //   // this.getProductBySlug(this.slug);
    //   // this.getRelatedProducts(this.slug, '');
    // });
    // this.getProductBySlug(this.data.item.slug);

    
    this.onload();
  }

   //Call JavaScript functions onload
   onload(){
    custom();
   
   
  }
   /**
   * Get product by slug
   * @param slug product slug
   */
    getProductBySlug(slug) {
      this.isProcessing = true;
      this.productsApiCalls.getProductBySlug(slug, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response_code === '100') {
          this.productDetail = result.results;
          //console.log("Product-Details" + JSON.stringify(this.productDetail,null,2));
          this.extraImages = this.productDetail.extra_images;
          this.compressedImage = this.productDetail.compressed_image;
          this.image = this.productDetail.image;
          this.extraImages.unshift({compressed_image: this.productDetail.compressed_image, id: '', image: this.productDetail.image});
          this.seoService.updateMetaData({
            title: this.productDetail.name,
            description: this.productDetail.description,
            url: this.currentUrl,
            // tslint:disable-next-line: max-line-length
            image_url: (this.compressedImage !== undefined && this.compressedImage !== null && this.compressedImage !== '') ? this.compressedImage : this.image
          });
          this.quantityRemaining = +this.productDetail.new_quantity;
        }
      });
    }
    /**
     * Get related products by slug and storemall name
     * @param slug product slug
     * @param storefrontmallName storefrontmall name
     */
    getRelatedProducts(slug, storefrontmallName) {
      this.isProcessingRelatedProducts = true;
      this.productsApiCalls.getRelatedProducts(slug, storefrontmallName, (error, result) => {
        this.isProcessingRelatedProducts = false;
        if (result !== null) {
          this.relatedProducts = result.results;
          this.country = result.country;
        }

      });
    }

    async addProductToCart(product) {
      const stockQty = +product.new_quantity;
      if (stockQty <= 0) {
        //this.toastr.error('Out of Stock!');
        this.notificationsService.error(this.constantValues.APP_NAME, product.name + ' has run out of stock');

        return;
      }
      const selling_price = +product.selling_price;
      const selling_price_usd = +product.selling_price_usd;
      // tslint:disable-next-line: variable-name
      const total_amount = selling_price * 1;
      const total_amount_usd = selling_price_usd * 1;
      // tslint:disable-next-line: max-line-length
      const data = { item: product, quantity: 1, total_amount, total_amount_usd, date_added: new Date(), country: this.country };
      await this.productsApiCalls.addProductToCart(data, (error, result) => {
        if (result !== null) {
          this.dbaseUpdate.dbaseUpdated(true);
          //this.toastr.success(product.name + ' has been successfully added to cart');
          this.notificationsService.success(this.constantValues.APP_NAME, product.name + ' has been successfully added to cart');
          this.dialog.open(CartPopUpComponent,{panelClass: ['animate__animated','animate__slideInRight']} );
        }
      });
    }

    // async getCartItems() {
    //   await this.productsApiCalls.getCartItems((error, result) => {
    //     if (result !== null) {
    //       this.cartItems = result;
    //       this.cartItems = result.sort(this.compare);
    //      //console.log("Cart-->"+ JSON.stringify(this.cartItems,null,2));
    //       if (this.cartItems.length > 0) {
    //         this.currency = this.cartItems[0].item.currency;
    //         this.country = this.cartItems[0].country;
    //           console.log('Greauer');
    //           const exists = this.cartItems.find(
    //           (element: any) => element.item.id ===this.data.item.id
    //           );
    //           if (exists !== null && exists !== undefined && exists !== '') {
    //             console.log('Exists');
    //             const data = {
    //               item: this.data.item,
    //               quantity: exists.quantity,
    //               country: this.country,
    //               total_amount: exists.total_amount,
    //               total_amount_usd: exists.total_amount_usd,
    //               date_added: exists.product.date_added
    //             };
    //           //console.log(this.cartItems[0].item.id);
    //           const newQuantity = +exists.quantity + 1;
    //           const newSubtotal = +exists.total_amount + +this.data.item.selling_price;
    //           data.total_amount = newSubtotal;
    //           data.quantity = newQuantity;
    //           this.productsApiCalls.removeAndAddProductToCart(
    //             data,
    //             async (error: any, result: any) => {
    //               if (result !== null) {
    //                 this.dbaseUpdate.dbaseUpdated(true);


    //                 await this.getSubTotal();
    //                 this.item=exists;
    //               }
    //             }
    //           );

    //           }else{
    //             console.log('Not Exists');
    //             const data = {
    //               item: this.data.item,
    //               quantity: 1,
    //               country: this.country,
    //               total_amount: this.data.item.selling_price,
    //               total_amount_usd: this.data.item.total_amount_usd,
    //               date_added: Date(),
    //             };

    //            this.item=data;
    //            console.log('This.item-->'+JSON.stringify(this.item,null,2));
    //            console.log('This.q-->'+ this.item.quantity);

    //           }

    //       }
    //       this.getSubTotal();
    //     }
    //   });
    // }

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
    async removeItemFromCart(id) {
      await this.productsApiCalls.removeCartItem(id, (error, result) => {
        if (result !== null) {
          this.notificationsService.success(this.constantValues.APP_NAME, 'Item successfuly removed from cart');
          this.dbaseUpdate.dbaseUpdated(true);
          this.getCartItems();
        }
      });
    }
    getSubTotal() {
      if (this.country === this.countriesEnum.GH || this.country === this.countriesEnum.NG || this.country === undefined || this.country === '') {
        this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount), 0);
        this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price), 0);
      } else {
        this.currency = '$';
        this.subTotal = this.cartItems.reduce((acc, value) => acc + parseFloat(value.total_amount_usd), 0);
        this.totalSellingPrice = this.cartItems.reduce((acc, value) => acc + parseFloat(value.item.selling_price_usd), 0);
      }
    }
    onQuantityChanged(data, id) {
      const subTotal = +data.item.selling_price * +data.quantity;
      const subUsdTotal = +data.item.selling_price_usd * +data.quantity;
      const cartItem = {
        item: data.item,
        quantity: data.quantity,
        country: this.country,
        total_amount: subTotal,
        total_amount_usd: subUsdTotal,
        date_added: data.date_added
      };
      this.productsApiCalls.removeAndAddProductToCart(cartItem, async (err, res) => {
        if (res !== null) {
          this.dbaseUpdate.dbaseUpdated(true);
          await this.getCartItems();
        }
      });
    }
    getCompleteOnlineAddress(onlineAddress) {
      return this.appUtils.getStoreFrontMallOnlineAddress(onlineAddress);
    }
    get stagesFormArray() { return this.formGroup.get('data') as FormArray;
   }


   async addQty(product: any) {
    const stockQty = +product.item.new_quantity;
    if (stockQty <= 0) {
      this.notificationsService.error(this.constantValues.APP_NAME, product.item.name + ' Cannot further reduced');
      return;
    }
    // tslint:disable-next-line: variable-name
    const selling_price = +product.item.selling_price;
    const selling_price_usd = +product.item.selling_price_usd;
    // tslint:disable-next-line: variable-name
    const total_amount = +product.total_amount;
    const total_amount_usd = +product.total_amount_usd;
    const quantity= +product.quantity;
    // tslint:disable-next-line: max-line-length
    const data = {
      item: product.item,
      quantity: quantity,
      country: this.country,
      total_amount: total_amount,
      total_amount_usd: total_amount_usd,
      date_added: product.date_added
    };
      const exists = this.cartItems.find(
        (element: any) => element.item.id ===data.item.id
        );
      if (exists !== null && exists !== undefined && exists !== '') {
        //console.log(this.cartItems[0].item.id);
        const newQuantity = +exists.quantity + 1;
        const newSubtotal = +exists.total_amount + +selling_price;
        data.total_amount = newSubtotal;
        data.quantity = newQuantity;
        this.productsApiCalls.removeAndAddProductToCart(
          data,
          async (error: any, result: any) => {
            if (result !== null) {
              this.dbaseUpdate.dbaseUpdated(true);
              await this.getCartItems();
              await this.getSubTotal();
            }
          }
        );
      }

  }

  async reduceQty(product: any) {
    const stockQty = +product.quantity;
    if (stockQty <= 1) {
      this.notificationsService.error( "",
        product.item.name + ' Cannot further be reduced'
      );
      return;
    }
    // tslint:disable-next-line: variable-name
    const selling_price = +product.item.selling_price;
    const selling_price_usd = +product.item.selling_price_usd;
    // tslint:disable-next-line: variable-name
    const total_amount = selling_price * 1;
    const total_amount_usd =selling_price_usd * 1;
    const quantity= +product.quantity;
    // tslint:disable-next-line: max-line-length
    const data = {
      item: product.item,
      quantity: quantity,
      country: this.country,
      total_amount: total_amount,
      total_amount_usd: total_amount_usd,
      date_added: product.date_added
    };
      const exists = this.cartItems.find(
        (element: any) => element.item.id ===data.item.id
        );
      if (exists !== null && exists !== undefined && exists !== '') {
        const newQuantity = +exists.quantity - 1;
        const newSubtotal = +exists.total_amount - data.total_amount;
        data.total_amount = newSubtotal;
        data.quantity = newQuantity;
        this.productsApiCalls.removeAndAddProductToCart(
          data,
          async (error: any, result: any) => {
            if (result !== null) {
              this.dbaseUpdate.dbaseUpdated(true);
              await this.getCartItems();
              await this.getSubTotal();
            }
          }
        );
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

  get Qty(){
    return this.formGroup.get('qty');
  }

    // async addRelatedProductToCart(product) {
    //     // tslint:disable-next-line: variable-name
    //     const selling_price = +product.selling_price;
    //     // tslint:disable-next-line: variable-name
    //     const selling_price_usd = +product.selling_price_usd;
    //     // tslint:disable-next-line: variable-name
    //     const total_amount = selling_price * 1;
    //     // tslint:disable-next-line: variable-name
    //     const total_amount_usd = selling_price_usd * 1;
    //     const data = { item: product, quantity: 1, total_amount, total_amount_usd, date_added: new Date(), country: this.country };
    //     this.productsApiCalls.addProductToCart(data, (error, result) => {
    //       if (result !== null) {
    //         this.dbaseUpdate.dbaseUpdated(true);
    //         this.notificationsService.success(this.constantValues.APP_NAME, this.productDetail.name + ' has been successfully added to cart');
    //         this.router.navigate(['/checkout']);
    //       }
    //     });
    // }


}


