import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";

import { SharedModule } from "./shared/shared.module";
import { ProductModule } from "./product/product.module";
import { EnterpriseModule } from "app/enterprise/enterprise.module";

import { LoginComponent } from "./auth/login/login.component";
import { AboutComponent } from "./menu/about/about.component";
import { ShoppingCartComponent } from "./menu/shopping-cart/shopping-cart.component";
import { SellerComponent } from "./menu/seller/seller.component";
import { OrganizationComponent } from "./menu/organization/organization.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { ChuletaComponent } from "./recipes/chuleta/chuleta.component";
import { AlitasComponent } from "./recipes/alitas/alitas.component";
import { PapasComponent } from "./recipes/papas/papas.component";
import { PapasBorrachasComponent } from "./recipes/papas-borrachas/papas-borrachas.component";
import { LaRojaComponent } from "./polas/la-roja/la-roja.component";
import { LaTrochaComponent } from "./polas/la-trocha/la-trocha.component";
import { TestimoniosComponent } from "./testimonios/testimonios.component";
import { CheeseComponent } from "./duos/cheese/cheese.component";
import { ChocolateComponent } from "./duos/chocolate/chocolate.component";
import { ChelanteComponent } from "./casas/chelante/chelante.component";
import { WiccaComponent } from "./casas/wicca/wicca.component";
import { SultanaComponent } from "./casas/sultana/sultana.component";
import { HakunaComponent } from "./casas/hakuna/hakuna.component";
import { ApacheComponent } from "./casas/apache/apache.component";
import { KalimaComponent } from "./casas/kalima/kalima.component";
import { LaTrochaHouseComponent } from "./casas/la-trocha-house/la-trocha-house.component";
import { FacturasComponent } from './facturas/facturas.component';
import { IpaComponent } from './pola-type/ipa/ipa.component';
import { AleComponent } from './pola-type/ale/ale.component';
import { StoutComponent } from './pola-type/stout/stout.component';
import { LagerComponent } from './pola-type/lager/lager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    ShoppingCartComponent,
    SellerComponent,
    OrganizationComponent,
    OrganizationComponent,
    SignUpComponent,
    PageNotFoundComponent,
    HomeComponent,
    OrdersComponent,
    ChangePasswordComponent,
    RecipeComponent,
    ChuletaComponent,
    AlitasComponent,
    PapasComponent,
    PapasBorrachasComponent,
    LaRojaComponent,
    LaTrochaComponent,
    TestimoniosComponent,
    CheeseComponent,
    ChocolateComponent,
    ChelanteComponent,
    WiccaComponent,
    SultanaComponent,
    HakunaComponent,
    ApacheComponent,
    KalimaComponent,
    LaTrochaHouseComponent,
    FacturasComponent,
    IpaComponent,
    AleComponent,
    StoutComponent,
    LagerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    ProductModule,
    EnterpriseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
