import { Component, OnInit, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { LoginService } from "app/core/services/login.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  currentRole: string = "";
  constructor(
    public location: Location,
    private element: ElementRef,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginService.role$.subscribe((val) => {
      if (val != "") {
        sessionStorage.setItem("currentRole", val);
        this.currentRole = sessionStorage.getItem("currentRole");
      }
    });
  }

  ngOnInit(): void {
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
    this.loginService.setRole("");
    this.currentRole = "";
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(["/home"]);
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Sesión cerrada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
