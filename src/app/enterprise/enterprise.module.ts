import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EnterpriseRoutingModule } from "./enterprise-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { HomeComponent } from "./components/home/home.component";
import { NewProductComponent } from "./components/new-product/new-product.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutComponent } from './components/layout/layout.component';
import { SellRequestComponent } from './components/sell-request/sell-request.component';
import { FormsModule } from '@angular/forms';

import { OrdersComponent } from './components/orders/orders.component'
@NgModule({
  declarations: [
    NavbarComponent,
    ListProductsComponent,
    HomeComponent,
    NewProductComponent,
    LayoutComponent,
    SellRequestComponent,
    OrdersComponent
  ],
  imports: [CommonModule, EnterpriseRoutingModule, ReactiveFormsModule, NgbModule,FormsModule],
})
export class EnterpriseModule {}
