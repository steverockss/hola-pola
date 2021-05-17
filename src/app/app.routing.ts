import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { AboutComponent } from "./menu/about/about.component";
import { ShoppingCartComponent } from "./menu/shopping-cart/shopping-cart.component";
import { SellerComponent } from "./menu/seller/seller.component";
import { OrganizationComponent } from "./menu/organization/organization.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";
import { OrdersComponent } from "./orders/orders.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { LayoutComponent } from "app/shared/components/layout/layout.component";
import { ChuletaComponent } from "./recipes/chuleta/chuleta.component";
import { AlitasComponent } from "./recipes/alitas/alitas.component";
import { PapasComponent } from "./recipes/papas/papas.component";
import { PapasBorrachasComponent } from "./recipes/papas-borrachas/papas-borrachas.component";
import { LaTrochaComponent } from "./polas/la-trocha/la-trocha.component";
import { TestimoniosComponent } from "./testimonios/testimonios.component";
import { LaRojaComponent } from "./polas/la-roja/la-roja.component";
import { CheeseComponent } from "./duos/cheese/cheese.component";
import { ChocolateComponent } from "./duos/chocolate/chocolate.component";
import { WiccaComponent } from "./casas/wicca/wicca.component";
import {ApacheComponent} from "./casas/apache/apache.component";
import {ChelanteComponent} from "./casas/chelante/chelante.component";
import {SultanaComponent} from "./casas/sultana/sultana.component";
import {HakunaComponent} from "./casas/hakuna/hakuna.component";
import {KalimaComponent} from "./casas/kalima/kalima.component";
import {LaTrochaHouseComponent} from "./casas/la-trocha-house/la-trocha-house.component"
import {FacturasComponent} from "./facturas/facturas.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "orders", component: OrdersComponent },
      { path: "login", component: LoginComponent },
      { path: "aboutus", component: AboutComponent },
      { path: "sellers", component: SellerComponent },
      { path: "recetas", component: RecipeComponent },
      { path: "recetas/chuleta", component: ChuletaComponent },
      { path: "recetas/alitas", component: AlitasComponent },
      { path: "recetas/papas", component: PapasComponent },
      { path: "recetas/papas-borrachas", component: PapasBorrachasComponent },
      { path: "polas/la-trocha", component: LaTrochaComponent },
      { path: "polas/la-roja", component: LaRojaComponent },
      { path: "duos/queso", component: CheeseComponent },
      { path: "casas/wicca", component: WiccaComponent },
      { path: "casas/apache", component: ApacheComponent },
      { path: "casas/chelante", component: ChelanteComponent },
      { path: "casas/sultana", component: SultanaComponent },
      { path: "casas/hakuna", component: HakunaComponent },
      { path: "casas/kalima", component: KalimaComponent },
      { path: "casas/la-trocha", component: LaTrochaHouseComponent },
      { path: "duos/chocolate", component: ChocolateComponent },
      { path: "testimonios", component: TestimoniosComponent },
      { path: "facturas", component: FacturasComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },


      { path: "organizations", component: OrganizationComponent },

      { path: "sign-up", component: SignUpComponent },
      {
        path: "change-password",
        component: ChangePasswordComponent,
        canActivate: [],
      },
      {
        path: "products/:id",
        loadChildren: () =>
          import("./product/product.module").then((m) => m.ProductModule),
      },
    ],
  },
  {
    path: "enterprise",
    loadChildren: () =>
      import("./enterprise/enterprise.module").then((m) => m.EnterpriseModule),
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: "enabled",
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}