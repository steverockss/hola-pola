import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { PolaItem } from "app/core/models/polaItem";
@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  polasItems: PolaItem[];
  subTotalPrice = 0
  constructor() { 
    this.polasItems = JSON.parse(sessionStorage.getItem('cart'))
    console.log(this.polasItems)
  }

  ngOnInit(): void {
  }
  removeFromCart(pola: PolaItem) {
    this.subTotalPrice = 0;
    this.polasItems.forEach((element, index) => {
      if(element == pola){
         this.polasItems.splice(index,1)
      }
    });
    sessionStorage.setItem('cart',JSON.stringify(this.polasItems))
    console.log(this.polasItems)
  }
  /*
  susbtractQuantity(pola: PolaItem) {
    if (pola.quantity > 0) {
      pola.quantity--;
      this.calculateProductTotalPrice(pola);
      this.subTotalPrice -= product.product.unitaryPrice;
      this.cartService.updateQuantity(product);
    }
  }
  addQuantity(product: CartItem) {
    product.quantity++;
    this.calculateProductTotalPrice(product);
    this.subTotalPrice += product.product.unitaryPrice;
    this.cartService.updateQuantity(product);
  }
  calculateProductTotalPrice(pola: PolaItem) {
    pola.price = pola.quantity * product.product.unitaryPrice;
  }
  */

}
