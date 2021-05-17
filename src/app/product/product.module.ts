import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule }   from '@angular/forms';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductListComponent} from './components/product-list/product-list.component';
@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent],
  exports: [ProductDetailComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class ProductModule { }
