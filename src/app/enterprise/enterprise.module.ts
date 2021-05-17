import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EnterpriseRoutingModule } from "./enterprise-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { HomeComponent } from "./components/home/home.component";
import { AddInfoComponent } from "./components/add-info/add-info.component";
import { NewProductComponent } from "./components/new-product/new-product.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutComponent } from './components/layout/layout.component';
import { SellRequestComponent } from './components/sell-request/sell-request.component';
import { FormsModule } from '@angular/forms';
import { EditOrganizationInfoComponent } from './components/edit-organization-info/edit-organization-info.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import { OrdersComponent } from './components/orders/orders.component'
@NgModule({
  declarations: [
    NavbarComponent,
    ListProductsComponent,
    HomeComponent,
    AddInfoComponent,
    NewProductComponent,
    LayoutComponent,
    SellRequestComponent,
    EditOrganizationInfoComponent,
    EditProductComponent,
    OrdersComponent
  ],
  imports: [CommonModule, EnterpriseRoutingModule, ReactiveFormsModule, NgbModule,FormsModule],
})
export class EnterpriseModule {}
