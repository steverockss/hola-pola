import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { PolaItem } from "app/core/models/polaItem";
@Component({
  selector: "app-shopping-car",
  templateUrl: "./shopping-car.component.html",
  styleUrls: ["./shopping-car.component.css"],
})
export class ShoppingCarComponent implements OnInit {
  polasItems: PolaItem[];
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
    swal.fire({
      width: 600,
      padding: "3em",
      html:
        "" +
        '<a href="/login">Iniciar sesión</a> <br> <br> ' +
        '<a href="/shopping-car">Crear una cuenta</a> ',
      imageUrl: `https://i.postimg.cc/Dzj8Vhm8/logo.png`,
      imageWidth: 400,
      showConfirmButton: false,
      background: "#E84565 ",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    });
  }
}
