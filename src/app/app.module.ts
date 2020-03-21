import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SlidebannerComponent } from './slidebanner/slidebanner.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductmanagerComponent } from './productmanager/productmanager.component';
import { AddproductComponent } from './addproduct/addproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenubarComponent,
    SlidebannerComponent,
    ProductlistComponent,
    ProductmanagerComponent,
    AddproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
