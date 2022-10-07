import { TopNavComponent } from './components/commons/top-nav/top-nav.component';

import { ShopApiCallsService } from 'src/app/services/network-calls/shop-api-calls.service';
import { ProductsApiCallsService } from 'src/app/services/network-calls/products-api-calls.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DbaseUpdateService } from 'src/app/services/dbase-update.service';
import { ConstantValuesService } from 'src/app/services/constant-values.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ReactiveFormsModule } from '@angular/forms';

//import { NgxIndexedDBModule } from 'ngx-indexed-db';
//import { NgxIndexedDBService } from 'ngx-indexed-db';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './classes/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupermarketComponent } from './components/main-features/classic-shop/supermarket/supermarket.component';
import { ShopDetailsComponent } from './components/main-features/shop-details/shop-details.component';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { SignUpComponent } from './components/commons/sign-up/sign-up.component';
import { LoginComponent } from './components/commons/login/login.component';
import { DressesComponent } from './components/main-features/classic-shop/supermarket/dresses/dresses.component';
import { FallComponent } from './components/main-features/classic-shop/supermarket/fall/fall.component';
import { BlouseComponent } from './components/main-features/classic-shop/supermarket/blouse/blouse.component';
import { ViewProductComponent } from './components/commons/view-product/view-product.component';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
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
import { FooterComponent } from './components/main-features/footer/footer.component';
import { WINDOW_PROVIDERS } from './utils/window.provider';
import { EmptyRecordComponent } from './components/commons/empty-record/empty-record.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './interfaces/local-db-config';
import { ToastrModule } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';

import { ConfirmOrderPaymentDialogComponent } from './components/commons/confirm-order-payment-dialog/confirm-order-payment-dialog.component';
import { OrderCompletedDialogComponent } from './components/commons/order-completed-dialog/order-completed-dialog.component';
import { ConfirmPhoneNumberComponent } from './components/commons/confirm-phone-number/confirm-phone-number.component';
import { GuestUserComponent } from './components/commons/guest-user/guest-user.component';
import { OrderHistoryComponent } from './components/customer/order-history/order-history.component';
import { ProfileSidebarComponent } from './components/customer/profile-sidebar/profile-sidebar.component';
import { OrderDetailsComponent } from './components/customer/order-details/order-details.component';
import {MatCardModule} from '@angular/material/card';
import { PaymentDialogComponent } from './components/commons/payment-dialog/payment-dialog.component';
import { PackageStatusHistoryComponent } from './components/commons/package-status-history/package-status-history.component';
import { AccountComponent } from './components/customer/account/account.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaginationComponent } from './components/commons/pagination/pagination.component';
import { LandingPageComponent } from './components/main-features/landing-page/landing-page.component';
import { SectionBannerComponent } from './components/main-features/section-banner/section-banner.component';
import { DisplayProductsComponent } from './components/main-features/display-products/display-products.component';
import { CartPopUpComponent } from './components/commons/cart-pop-up/cart-pop-up.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoginMainComponent } from './components/commons/login-main/login-main.component';

//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { LacMatTelInputModule } from 'lac-mat-tel-input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AddressComponent } from './components/customer/address/address.component';
import { OrderDetailsMobileComponent } from './components/customer/order-details-mobile/order-details-mobile.component';

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
    Checkout2Component,
    Checkout3Component,
    CartComponent,
    FooterComponent,
    TopNavComponent,
    EmptyRecordComponent,
    ConfirmOrderPaymentDialogComponent,
    OrderCompletedDialogComponent,
    ConfirmPhoneNumberComponent,
    GuestUserComponent,
    OrderHistoryComponent,
    ProfileSidebarComponent,
    OrderDetailsComponent,
    PaymentDialogComponent,
    PackageStatusHistoryComponent,
    AccountComponent,
    PaginationComponent,
    LandingPageComponent,
    SectionBannerComponent,
    DisplayProductsComponent,
    CartPopUpComponent,
    TruncatePipe,
    LoginMainComponent,
    AddressComponent,
    OrderDetailsMobileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatDialogModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ToastrModule.forRoot({
      //positionClass: 'center',
      preventDuplicates: true,
    }),
    MatStepperModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    //NgxIntlTelInputModule,
    LacMatTelInputModule,
    MatTabsModule,
  ],
  providers:
  [
    AuthService,
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
    NgxIndexedDBService,
    Title,
    { provide: ErrorHandler, useClass: SentryErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WINDOW_PROVIDERS,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue:{hasBackdrop: false}},
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
