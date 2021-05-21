import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { AboutComponent } from "./menu/about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
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
import { ApacheComponent } from "./casas/apache/apache.component";
import { ChelanteComponent } from "./casas/chelante/chelante.component";
import { SultanaComponent } from "./casas/sultana/sultana.component";
import { HakunaComponent } from "./casas/hakuna/hakuna.component";
import { KalimaComponent } from "./casas/kalima/kalima.component";
import { LaTrochaHouseComponent } from "./casas/la-trocha-house/la-trocha-house.component";
import { AleComponent } from "./pola-type/ale/ale.component";
import { IpaComponent } from "./pola-type/ipa/ipa.component";
import { LagerComponent } from "./pola-type/lager/lager.component";
import { StoutComponent } from "./pola-type/stout/stout.component";
import { FacturasComponent } from "./facturas/facturas.component";
import { AltoComponent } from "./pola-amargor/alto/alto.component";
import { BajoComponent } from "./pola-amargor/bajo/bajo.component";
import { BajoMedioComponent } from "./pola-amargor/bajo-medio/bajo-medio.component";
import { MedioComponent } from "./pola-amargor/medio/medio.component";
import { PolasComponent } from "./polas/polas.component";
import { ShoppingCarComponent } from "./shopping-car/shopping-car.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { FacturaComponent } from "./factura/factura.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "aboutus", component: AboutComponent },
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
      { path: "tipos/ale", component: AleComponent },
      { path: "tipos/ipa", component: IpaComponent },
      { path: "tipos/lager", component: LagerComponent },
      { path: "tipos/stout", component: StoutComponent },
      { path: "facturas", component: FacturasComponent },
      { path: "tipos/bajo", component: BajoComponent },
      { path: "tipos/medio", component: MedioComponent },
      { path: "tipos/bajo-medio", component: BajoMedioComponent },
      { path: "tipos/alto", component: AltoComponent },
      { path: "polas", component: PolasComponent },
      { path: "shopping-car", component: ShoppingCarComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "sign-up", component: SignUpComponent },
      { path: "factura/:id", component: FacturaComponent },
    ],
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
