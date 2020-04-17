import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MenubarComponent } from "./menubar/menubar.component";
import { SlidebannerComponent } from "./slidebanner/slidebanner.component";
import { ProductlistComponent } from "./productlist/productlist.component";
import { ProductmanagerComponent } from "./productmanager/productmanager.component";
import { AddproductComponent } from "./addproduct/addproduct.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { SignComponent } from "./sign/sign.component";
import { MainComponent } from "./main/main.component";
import { ErropageComponent } from "./erropage/erropage.component";
import { ManagerProductComponent } from "./manager-product/manager-product.component";
import { ManagerEmployComponent } from "./manager-employ/manager-employ.component";
import { ManagerCustomerComponent } from "./manager-customer/manager-customer.component";
import { ManagerOderComponent } from "./manager-oder/manager-oder.component";
import { ServicesService } from "./services.service";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";
import { ContentsComponent } from "./contents/contents.component";
import { ManagerProductDetailComponent } from './manager-product-detail/manager-product-detail.component';
import { ProductTypeComponent } from './product-type/product-type.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenubarComponent,
    SlidebannerComponent,
    ProductlistComponent,
    ProductmanagerComponent,
    AddproductComponent,
    FooterComponent,
    LoginComponent,
    SignComponent,
    MainComponent,
    ErropageComponent,
    ManagerProductComponent,
    ManagerEmployComponent,
    ManagerCustomerComponent,
    ManagerOderComponent,
    ProductdetailsComponent,
    ContentsComponent,
    ManagerProductDetailComponent,
    ProductTypeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgbModule],
  providers: [ServicesService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
