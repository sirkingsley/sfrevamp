import { DisplayProductsComponent } from './components/main-features/display-products/display-products.component';
import { SectionBannerComponent } from './components/main-features/section-banner/section-banner.component';
import { LandingPageComponent } from './components/main-features/landing-page/landing-page.component';
import { AccountComponent } from './components/customer/account/account.component';
import { OrderDetailsComponent } from './components/customer/order-details/order-details.component';
import { CartComponent } from './components/main-features/cart/cart.component';
import { Checkout3Component } from './components/main-features/checkout3/checkout3.component';

import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';

import { LoginComponent } from './components/commons/login/login.component';
import { SignUpComponent } from './components/commons/sign-up/sign-up.component';

import { ShopDetailsComponent } from './components/main-features/shop-details/shop-details.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './components/customer/order-history/order-history.component';
import { AddressComponent } from './components/customer/address/address.component';
import { ProfileSidebarComponent } from './components/customer/profile-sidebar/profile-sidebar.component';
import { CheckoutComponent } from './components/main-features/checkout/checkout.component';
import { DeliveryAddressComponent } from './components/main-features/delivery-address/delivery-address.component';

const routes: Routes = [
  { path: '', redirectTo: 'display-products', pathMatch: 'full' },

  { path: 'profile-view/orders/details/:id', component: OrderDetailsComponent },
  { path: 'delivery-info', component: DeliveryAddressComponent },
  {
    path: 'profile-view', component: ProfileSidebarComponent,
    children: [
      { path: '', component: OrderHistoryComponent },
      { path: 'detail/:id', component: OrderDetailsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'address', component: AddressComponent },
      { path: 'orders', component: OrderHistoryComponent },

    ]
  },
  { path: 'product-details', component: ViewProductComponent },
  /**
   * Testing pages
   */
  { path: 'shop-details', component: ShopDetailsComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'section-banner', component: SectionBannerComponent },
  { path: 'display-products', component: DisplayProductsComponent },
  /**
  * Testing pages End
  */
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shop-details', component: ShopDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },

  { path: 'completed', component: Checkout3Component },
  { path: 'cart', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
