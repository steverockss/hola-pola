import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutComponent } from "./components/layout/layout.component";
@NgModule({
  declarations: [HeaderComponent, FooterComponent,LayoutComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
})
export class SharedModule {}
