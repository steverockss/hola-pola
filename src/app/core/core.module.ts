import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrganizationService } from "./services/organization.service";
import { ProductService } from "./services/product.service";
import { LoginService } from "./services/login.service";
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ OrganizationService, ProductService, LoginService],
})
export class CoreModule {}

