
import { Component, Inject, OnInit } from '@angular/core';
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



/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'view-product',
  templateUrl: 'view-product.component.html',
})
export class ViewProductComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {item: any},
    private productsApiCalls: ProductsApiCallsService,
    private route: ActivatedRoute,
    private constantValues: ConstantValuesService,
    private dbaseUpdate: DbaseUpdateService,
    private notificationsService: NotificationsService,
    private dialog: MatDialog,
    private getHostname: GetHostnameService,
    private seoService: SEOService,
    private router: Router,
    private title: Title
    ) {}

    productId:number;
    productDetail;
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

    isProcessingRelatedProducts: boolean;
    country = '';
    countriesEnum = CountryEnum;
    currentUrl = '';
    quantityRemaining = 1;
  ngOnInit() {
    this.title.setTitle(this.constantValues.APP_NAME + ' Product Detail');
    this.country = this.constantValues.COUNTRY;
    this.protocol = this.constantValues.STOREFRONT_MALL_URL_PROTOCOL;
    this.url = this.constantValues.STOREFRONT_MALL_URL;

    // this.route.params.subscribe(param => {
    //   this.currentUrl = this.getHostname.url;
    //   this.slug = param['slug'];
    //   // this.getProductBySlug(this.slug);
    //   // this.getRelatedProducts(this.slug, '');
    // });
    this.getProductBySlug(this.data.item.slug);

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

// @Component({
//   selector: 'dialog-data-example-dialog',
//   templateUrl: 'dialog-data-example-dialog.html',
// })
// export class DialogDataExampleDialog {
//   constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
// }
