import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewProductComponent } from "./components/new-product/new-product.component";
import { ListProductsComponent } from "./components/list-products/list-products.component";
import { EditOrganizationInfoComponent } from "./components/edit-organization-info/edit-organization-info.component";
import { HomeComponent } from "./components/home/home.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AddInfoComponent } from "./components/add-info/add-info.component";

import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { SellRequestComponent } from "./components/sell-request/sell-request.component";
import {ChangePasswordComponent} from "app/auth/change-password/change-password.component";
import {OrdersComponent} from "./components/orders/orders.component";
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "new-product",
        component: NewProductComponent,

      },
      {
        path: "list-products",
        component: ListProductsComponent,
      },
      {
        path: "edit-product/:id",
        component: EditProductComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "add-info",
        component: AddInfoComponent,
      },
      {
        path: "sell-request",
        component: SellRequestComponent,
      },
      {
        path: "edit-my-info",
        component: EditOrganizationInfoComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpriseRoutingModule {}
