import { Component, OnInit, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { map } from "rxjs/operators";
import { CartService } from "../../../core/services/cart.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  total$: Observable<number>;
  currentRole: string = "";

  constructor(
    public location: Location,
    private element: ElementRef,
    private cartService: CartService,
    private router: Router
  ) {
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );


    this.sidebarVisible = false;
  }

  ngOnInit() {
    if (sessionStorage.getItem("currentRole") != null) {
      this.currentRole = sessionStorage.getItem("currentRole");
    }
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  logOut() {

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Sesión cerrada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
