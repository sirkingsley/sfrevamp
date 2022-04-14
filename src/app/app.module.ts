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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
