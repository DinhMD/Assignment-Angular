import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { ErropageComponent } from "./erropage/erropage.component";
import { SignComponent } from "./sign/sign.component";
import { ProductmanagerComponent } from "./productmanager/productmanager.component";
import { ManagerEmployComponent } from "./manager-employ/manager-employ.component";
import { ManagerCustomerComponent } from "./manager-customer/manager-customer.component";
import { ManagerProductComponent } from "./manager-product/manager-product.component";
import { ManagerOderComponent } from "./manager-oder/manager-oder.component";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";
import { ContentsComponent } from "./contents/contents.component";
import { ProductTypeComponent } from './product-type/product-type.component';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "home",
    component: MainComponent,
    children: [
      { path: "detail/:id", component: ProductdetailsComponent },
      { path: "", component: ContentsComponent },
      {path: "search/:text", component: SearchComponent},
      { path: "listproduct/:type", component: ProductTypeComponent }
    ]
  },
  { path: "404", component: ErropageComponent },
  { path: "signup", component: SignComponent },
  {
    path: "manager",
    component: ProductmanagerComponent,
    children: [
      { path: "employ", component: ManagerEmployComponent },
      { path: "customer", component: ManagerCustomerComponent },
      { path: "product", component: ManagerProductComponent },
      { path: "order", component: ManagerOderComponent },
      { path: "product/:type", component: ManagerProductComponent }
    ]
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
