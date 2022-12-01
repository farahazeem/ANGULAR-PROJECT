import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path:'', component:HomeComponent},
  { path: 'search/:searchTerm', component:HomeComponent }, //the term search is the tag literal (mean it will appear as is in the link), whereas :searchTerm is the parameter (mean it ll be replaced by the value of searchTerm in the link)
  { path: 'tag/:tag', component:HomeComponent }, //same above comment for this
  { path: 'item/:id', component:ItemPageComponent },
  { path: 'cart-page', component:CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
