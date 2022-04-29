import { CartComponent } from './components/main-features/cart/cart.component';
import { Checkout3Component } from './components/main-features/checkout3/checkout3.component';
import { Checkout2Component } from './components/main-features/checkout2/checkout2.component';
import { ViewProductComponent } from 'src/app/components/commons/view-product/view-product.component';
import { BlouseComponent } from './components/main-features/classic-shop/supermarket/blouse/blouse.component';
import { FallComponent } from './components/main-features/classic-shop/supermarket/fall/fall.component';
import { DressesComponent } from './components/main-features/classic-shop/supermarket/dresses/dresses.component';
import { LoginComponent } from './components/commons/login/login.component';
import { SignUpComponent } from './components/commons/sign-up/sign-up.component';

import { ShopDetailsComponent } from './components/main-features/shop-details/shop-details.component';
import { SupermarketComponent } from './components/main-features/classic-shop/supermarket/supermarket.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'supermarket', pathMatch: 'full' },
  {
    path: 'supermarket', component : SupermarketComponent,
    children: [
      {path: '', component : DressesComponent},
      {path: 'dresses', component : DressesComponent},
      {path: 'fall', component : FallComponent},
      {path: 'blouse', component : BlouseComponent},
    ]
  },
  {path: 'view-product', component : ViewProductComponent},
  {path: 'shop-details', component : ShopDetailsComponent},
  {path: 'sign-up', component : SignUpComponent},
  {path: 'login', component : LoginComponent,pathMatch: 'full'},
  {path: 'shop-details', component : ShopDetailsComponent},
  {path: 'checkout2', component : Checkout2Component},
  {path: 'checkout3', component : Checkout3Component},
  {path: 'cart', component : CartComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
