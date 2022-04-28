import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupermarketComponent } from './components/main-features/classic-shop/supermarket/supermarket.component';
import { ShopDetailsComponent } from './components/main-features/shop-details/shop-details.component';


import { SignUpComponent } from './components/commons/sign-up/sign-up.component';
import { LoginComponent } from './components/commons/login/login.component';
import { DressesComponent } from './components/main-features/classic-shop/supermarket/dresses/dresses.component';
import { FallComponent } from './components/main-features/classic-shop/supermarket/fall/fall.component';
import { BlouseComponent } from './components/main-features/classic-shop/supermarket/blouse/blouse.component';
import { ViewProductComponent } from './components/commons/view-product/view-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MainNavComponent } from './components/commons/main-nav/main-nav.component';
import { Checkout2Component } from './components/main-features/checkout2/checkout2.component';
import { Checkout3Component } from './components/main-features/checkout3/checkout3.component';
import { CartComponent } from './components/main-features/cart/cart.component';
import { AuthService } from './services/auth.service';
import { AppUtilsService } from './services/app-utils.service';
import { DataProviderService } from './services/data-provider.service';
import { GetHostnameService } from './services/get-hostname.service';
import { LocalStorageDataProviderService } from './services/local-storage-data-provider.service';
import { LoginUpdateService } from './services/login-update.service';
import { MarketingService } from './services/marketing.service';
import { NetworkErrorHandlerService } from './services/network-error-handler.service';
import { SentryErrorHandlerService } from './services/sentry-error-handler.service';
import { SEOService } from './services/seo.service';
import { CustomersApiCallsService } from './services/network-calls/customers-api-calls.service';
import { OrderApiCallsService } from './services/network-calls/order-api-calls.service';
import { SharedDataApiCallsService } from './services/network-calls/shared-data-api-calls.service';

@NgModule({
  declarations: [
    AppComponent,
    SupermarketComponent,
    ShopDetailsComponent,
    SignUpComponent,
    LoginComponent,
    DressesComponent,
    FallComponent,
    BlouseComponent,
    ViewProductComponent,
    MainNavComponent,
    Checkout2Component,
    Checkout3Component,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatDialogModule,
  ],
  providers:
  [AuthService,
    AppUtilsService,
    ConstantValuesService,
    DataProviderService,
    DbaseUpdateService,
    GetHostnameService,
    LocalStorageDataProviderService,
    LoginUpdateService,
    MarketingService,
    NetworkErrorHandlerService,
    NotificationsService,
    SentryErrorHandlerService,
    SEOService,
    CustomersApiCallsService,
    OrderApiCallsService,
    ProductsApiCallsService,
    SharedDataApiCallsService,
    ShopApiCallsService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
