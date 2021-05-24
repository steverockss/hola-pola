import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { PolaItem } from "app/core/models/polaItem";
import { Factura } from "../core/models/factura";
@Component({
  selector: "app-shopping-car",
  templateUrl: "./shopping-car.component.html",
  styleUrls: ["./shopping-car.component.css"],
})
export class ShoppingCarComponent implements OnInit {
  polasItems: PolaItem[];
  facturas: Factura[] = [];
  subTotalPrice = 0;
  totalPrice = 0;
  envioPrice = 7000;
  constructor() {
    let cart = sessionStorage.getItem("cart");
    if (cart !== "undefined") {
      this.polasItems = JSON.parse(sessionStorage.getItem("cart"));

      this.polasItems.forEach((element) => {
        this.subTotalPrice += element.price;
      });
    }
  }

  ngOnInit(): void {}
  removeFromCart(pola: PolaItem) {
    this.polasItems.forEach((element, index) => {
      if (element == pola) {
        this.polasItems.splice(index, 1);
        this.subTotalPrice -= element.price;
      }
    });
    sessionStorage.setItem("cart", JSON.stringify(this.polasItems));
    console.log(this.polasItems);
  }

  susbtractQuantity(pola: PolaItem) {
    if (pola.quantity > 0) {
      pola.quantity--;
      this.calculateProductTotalPrice(pola);
      this.subTotalPrice -= pola.pola.price;
    }
  }
  addQuantity(pola: PolaItem) {
    pola.quantity++;
    this.calculateProductTotalPrice(pola);
    this.subTotalPrice += pola.pola.price;
  }
  calculateProductTotalPrice(pola: PolaItem) {
    pola.price = pola.quantity * pola.pola.price;
  }

  buy() {
    let fact = sessionStorage.getItem("factura");
    if ( fact !== null ) {
      this.facturas = JSON.parse(sessionStorage.getItem("factura"));
    } else {
      this.facturas = [];
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    let fac = new Factura(
      Math.floor(100000 + Math.random() * 900000),
      "Pedro",
      1233902,
      31952638,
      "Carrera 7 Calle 45 # 20 A ",
      "Bogota",
      this.polasItems,
      mm + '/' + dd + '/' + yyyy
    );
    this.facturas.push(fac);
    sessionStorage.setItem("factura", JSON.stringify(this.facturas));
    swal.fire({
      width: 600,
      padding: "3em",
      html:
        "" +
        '<a href="/login">Iniciar sesión</a> <br> <br> ' +
        '<a href="/sign-up">Crear una cuenta</a> ',
      imageUrl: `https://i.postimg.cc/Dzj8Vhm8/logo.png`,
      imageWidth: 400,
      showConfirmButton: false,
      background: "#E84565 ",
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
    });
  }
}
