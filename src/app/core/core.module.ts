import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "./services/cart.service";
import { SellerService } from "./services/seller.service";
import { OrganizationService } from "./services/organization.service";
import { ProductService } from "./services/product.service";
import { LoginService } from "./services/login.service";
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CartService, SellerService, OrganizationService, ProductService, LoginService],
})
export class CoreModule {}
